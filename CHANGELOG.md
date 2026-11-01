# Değişiklik günlüğü

Biçim [Keep a Changelog](https://keepachangelog.com/tr-TR/1.1.0/), sürümler [SemVer](https://semver.org/lang/tr/).

## [0.3.0] — 2026-10-31
### Değişti
- Görsel tasarım "Şef Minimal" yönüne geçti (Levent üç yön arasından seçti): siyah-beyaz renk
  tokenları, keskin köşeler (4 px), Inter yazı ailesi (400/500/600/700). Tüm metin/zemin çiftleri
  WCAG AA ölçüldü. Yazı tipleri yüklenene kadar açılış ekranı açık kalır; yüklenemezse sistem
  yazı tipiyle devam edilir.

## [0.2.0] — 2026-10-31
### Eklendi
- Katalog ekranları: ana sayfa (arama, kategoriler, iki sütunlu ürün ızgarası), kategori sayfası,
  yazmayı bırakınca çalışan arama, ürün detayı (görseller, ölçü/renk/hacim seçimi, seçime göre
  fiyat ve stok: "Stokta", "Son N ürün", "Tükendi").
- Kaydırdıkça sayfa yükleme, aşağı çekip yenileme (FlashList); yükleniyor, boş, hata ve
  bağlantı yok durumları; açık/koyu tema; ekran okuyucu etiketleri ve 44 pt dokunma alanı.
- Sunucu yanıtları ve rota parametreleri zod ile doğrulanır; hata mesajları iç ayrıntı göstermez.
- Örnek tencere kataloğu: 4 kategori, 9 ürün, 21 varyant (TRY, gerçekçi stok durumları).
- Testler: mobil 42 (gerçek API yanıtıyla şema ve varyant mantığı, ekran testleri), sunucu 12.

### Düzeltildi
- Expo 58.0.22 / expo-router 58.0.29 yamaları; zod açığı (GHSA-mrhx-c7xc-m3w5) Expo tarafında
  kapandığı için mobil denetim istisnası kaldırıldı.

### Kaldırıldı
- Medusa'nın İngilizce kıyafet demo ürünleri ve 50 ürünlük demo betiği.

## [0.1.0] — 2026-10-30
### Eklendi
- Expo SDK 58 mobil uygulama iskeleti: TypeScript strict, Expo Router, TanStack Query, zod ile ortam
  doğrulaması, Medusa istemcisi, oturum belirteci için güvenli depolama, Jest testleri.
- Medusa 2.22 sunucusu ve yönetim paneli: Türkiye bölgesi, TRY, İstanbul deposu, standart/hızlı kargo,
  örnek ürünler; canlıda zayıf imzalama anahtarını reddeden koruma; birim ve HTTP testleri.
- CI: mobil ve sunucu kontrolleri, gitleaks, süreli istisnalı bağımlılık denetimi, Dependabot.
- Yerel PostgreSQL için `docker-compose.yml`.
