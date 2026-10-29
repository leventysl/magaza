# Mağaza — çalışma kuralları

Mobil e-ticaret uygulaması: `apps/mobile` (Expo) + `apps/backend` (Medusa). Mimari ve yol haritası: `docs/mimari.md`.

- Mobil kodda Expo standardı geçerli (`apps/mobile/AGENTS.md`); paket her zaman `npx expo install` ile eklenir.
- Sunucuda iş kuralı `src/workflows/`, uç nokta `src/api/`; Medusa API'lerini `node_modules/@medusajs/<paket>/AGENTS.md`'den doğrula.
- Fiyat, indirim ve stok sunucuda hesaplanır; mobil uygulamaya sır girmez (`EXPO_PUBLIC_` herkese açıktır).
- `.env` dosyaları okunmaz ve commit edilmez; yeni değişken `.env.example`'a adıyla ve açıklamasıyla eklenir.
- Her değişiklikten sonra ilgili uygulamada `npm run check`; bağımlılık değiştiyse `node ../../scripts/denetim.mjs`.
- Commit: Conventional Commits (`feat:`, `fix:`…), açıklama Türkçe. `main`'e zorla push yok.
