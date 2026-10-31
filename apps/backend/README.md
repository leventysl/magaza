# Mağaza — sunucu (Medusa)

Ürün, sepet, sipariş, kampanya ve müşteri hesabı API'si + yönetim paneli.
Kurulum ve çalıştırma için kök [README](../../README.md)'ye bakın.

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Sunucu + yönetim paneli (http://localhost:9000/app) |
| `npx medusa db:migrate` | Tabloları kurar; ilk çalıştırmada Türkiye bölgesi ve örnek ürünleri yükler |
| `npx medusa user -e <e-posta> -p <şifre>` | Yönetim paneli kullanıcısı oluşturur |
| `npm run check` | Lint + tip + birim testleri |
| `npm run test:integration:http` | Geçici veritabanıyla HTTP testleri (PostgreSQL gerekir) |

Kod düzeni: `src/api` (uç noktalar) · `src/workflows` (iş kuralları) · `src/modules` (özel veri
modelleri) · `src/migration-scripts` (ilk veri) · `src/admin` (panel eklentileri).
Medusa paketlerinin güncel kullanımı `node_modules/@medusajs/<paket>/AGENTS.md` dosyalarında.
