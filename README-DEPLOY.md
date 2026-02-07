# Basitleştirilmiş Vercel Yayınlama ve Veri Taşıma Rehberi

Sitenizi yayına almak ve bilgisayarınızdaki yazıları aktarmak için aşağıdaki adımları sırasıyla uygulayın.

## 1. Hazırlık ve GitHub
Öncelikle yaptığımız tüm değişiklikleri GitHub'a gönderin:

```bash
git add .
git commit -m "Yayinlama hazirligi ve veri tasima scripti"
git push
```

## 2. Vercel'de Proje Kurulumu
1.  [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin.
2.  **"Add New..."** -> **Project** seçeneğine tıklayın.
3.  GitHub projenizi (**buro** veya adı neyse) seçip **Import** deyin.

## 3. Veritabanı Oluşturma (Çok Önemli)
Proje oluşturma ekranında veya proje oluştuktan sonra **Storage** sekmesinden:
1.  **Storage** sekmesine tıklayın.
2.  **Create Database** butonuna basın.
3.  **Postgres** seçin.
4.  Konum olarak **Frankfurt** (fra1) veya size yakın bir yer seçin.
5.  **Connect** diyerek veritabanını projeye bağlayın.
    *   *Bu işlem environment variable'ları otomatik ekleyecektir.*

## 4. Şifre Ayarı
1.  Vercel'de projenizin **Settings** -> **Environment Variables** kısmına gelin.
2.  Yeni bir değişken ekleyin:
    *   **Key:** `ADMIN_PASSWORD`
    *   **Value:** *(Belirlediğiniz güçlü bir şifre)*
3.  **Save** deyin.
4.  **Deployments** sekmesine gidip, son deploy'un yanındaki üç noktaya basıp **Redeploy** deyin (Ki yeni şifre geçerli olsun).

## 5. Verileri Taşıma (Sihirli Kısım 🪄)
Siteniz Vercel'de çalışmaya başladıktan sonra, bilgisayarınızdaki yazıları oraya göndermek için terminalde şu komutu çalıştırın:

```bash
npm run veri-tasi
```

Bu komut sırasıyla şunları yapacak:
1.  Bilgisayarınızdaki verileri okuyup yedekleyecek.
2.  Vercel veritabanına bağlanacak.
3.  Tüm yazılarınızı, kategorilerinizi ve ayarlarınızı Vercel'e yükleyecek.

**İşlem bittiğinde:** Sitenize girip `/admin/giris` adresinden belirlediğiniz şifreyle giriş yapabilirsiniz. Tüm eski yazılarınız orada olacak!
