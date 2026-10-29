#!/usr/bin/env node
// Bağımlılık denetimi: `npm audit` sonucunda yüksek/kritik bir açık varsa başarısız olur.
// Kabul edilen istisnalar uygulama klasöründeki audit-allowlist.json dosyasında gerekçe ve
// son geçerlilik tarihiyle tutulur; tarihi geçen istisna yeniden hata sayılır.
//
// Kullanım (uygulama klasöründe): node ../../scripts/denetim.mjs
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const BLOCKING = new Set(["high", "critical"]);

function runAudit() {
  try {
    return execFileSync("npm", ["audit", "--json"], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (error) {
    // npm audit açık bulduğunda sıfır olmayan kodla çıkar; çıktı yine de JSON'dur.
    if (error.stdout) return error.stdout;
    throw error;
  }
}

function loadAllowlist() {
  if (!existsSync("audit-allowlist.json")) return new Map();
  const entries = JSON.parse(readFileSync("audit-allowlist.json", "utf8"));
  return new Map(entries.map((entry) => [entry.id, entry]));
}

const report = JSON.parse(runAudit());
if (report.error) {
  console.error(
    `npm audit çalışmadı: ${report.error.summary ?? "bilinmeyen hata"}`,
  );
  process.exit(2);
}

const allowlist = loadAllowlist();
const today = new Date().toISOString().slice(0, 10);
const advisories = new Map();
for (const [pkg, vuln] of Object.entries(report.vulnerabilities ?? {})) {
  for (const via of vuln.via) {
    if (typeof via === "string" || !BLOCKING.has(via.severity)) continue;
    const id = via.url.split("/").pop();
    advisories.set(id, { id, pkg, severity: via.severity, title: via.title });
  }
}

let failed = false;
for (const advisory of advisories.values()) {
  const allowed = allowlist.get(advisory.id);
  if (allowed && allowed.until >= today) {
    console.log(
      `⚠️  ${advisory.id} (${advisory.pkg}) kabul edildi, ${allowed.until} tarihine kadar: ${allowed.reason}`,
    );
  } else {
    failed = true;
    const why = allowed
      ? `istisnanın süresi ${allowed.until} tarihinde doldu`
      : advisory.title;
    console.error(
      `❌ ${advisory.severity} ${advisory.id} (${advisory.pkg}): ${why}`,
    );
  }
}
for (const id of allowlist.keys()) {
  if (!advisories.has(id))
    console.log(`ℹ️  ${id} artık raporda yok; audit-allowlist.json'dan silin.`);
}

console.log(
  failed
    ? "Denetim başarısız."
    : `Denetim temiz (${advisories.size} kabul edilmiş istisna).`,
);
process.exit(failed ? 1 : 0);
