# Mimari

## Genel bakış
```
[Mobil uygulama (Expo)] ──HTTPS, Store API──▶ [Medusa sunucusu] ──▶ [PostgreSQL]
                                                   ▲
[Yönetim paneli (tarayıcı)] ──Admin API────────────┘
```
- **Mobil uygulama** yalnızca Store API'yi kullanır; elinde yalnızca açık olan *yayımlanabilir anahtar*
  (`pk_…`) bulunur. Müşteri oturum belirteci cihazda Keychain/Keystore'da (`expo-secure-store`) saklanır.
- **Sunucu** fiyat, indirim, stok ve sipariş kurallarının tek kaynağıdır; istemciden gelen fiyata güvenilmez.
- **Ödeme** (4. aşama): kart verisi ne uygulamaya ne sunucuya girer; ödeme kuruluşunun barındırılan
  ödeme sayfası / SDK'sı ve 3D Secure kullanılır.

## Kararlar
| Tarih | Karar | Neden |
|---|---|---|
| 2026-10-30 | Expo SDK 58 + Medusa 2.22 | Tek kodla iOS/Android; satış, kampanya ve hesap mantığı hazır ve denenmiş |
| 2026-10-30 | "Üyelik" = ücretsiz müşteri hesabı | Ücretli üyelik yok → mağaza içi satın alma gerekmez |
| 2026-10-30 | İki uygulama ayrı `package-lock` ile, ortak çalışma alanı (workspace) yok | Expo ve Medusa'nın React/TypeScript sürümleri farklı; tek ağaçta çakışır |
| 2026-10-30 | Bölge Türkiye, para birimi TRY | Hedef pazar; ödeme ve kargo bu bölgeye bağlanır |
| 2026-10-31 | Seçenek değerleri ürünün varyantlarından türetilir | Medusa seçenek değerlerini ürünler arasında ortak tutar; doğrudan göstermek yanlış seçenek sunar |
| 2026-10-31 | Tasarım yönü "Şef Minimal": siyah-beyaz, 4 px köşe, Inter | Levent üç yön arasından seçti; ürün fotoğrafları öne çıkar |
| 2026-10-31 | Ürün sayfası kısa adla (`/urun/<handle>`) açılır | Okunur ve paylaşılabilir bağlantı; parametre zod ile doğrulanır |
| 2026-10-30 | Yüksek açıklar `overrides` ile kapatılır, kapatılamayan istisna `audit-allowlist.json`'da süreli | Yeni açık CI'ı kırar; kabul edilen risk görünür kalır |

## Yol haritası
| # | Aşama | Kabul kriteri | Durum |
|---|---|---|---|
| 0 | Kurulum | Sunucu + panel yerelde tek komutla açılır · örnek ürünler yüklü · CI yeşil | ✅ |
| 1 | Katalog | Ürün listesi, kategori, arama, ürün detayı (seçenek, görsel, stok) | ✅ |
| 2 | Sepet ve kampanya | Sepete ekle/çıkar · indirim kodu · otomatik kampanya · kampanya vitrini | ⏳ |
| 3 | Müşteri hesabı | Kayıt/giriş · profil · adresler · favoriler · siparişlerim · hesap silme | ⏳ |
| 4 | Ödeme | Adres → kargo → ödeme · 3D Secure · önce test ortamı | ⏳ |
| 5 | Teslim | Güvenlik denetimi · KVKK metinleri · EAS önizleme sürümü · v1.0.0 | ⏳ |
