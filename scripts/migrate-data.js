/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const prismaSchemaPath = path.join(__dirname, '../prisma/schema.prisma')
const prismaSchemaBackupPath = path.join(__dirname, '../prisma/schema.original.prisma')
const prismaSchemaSqlitePath = path.join(__dirname, '../prisma/schema.sqlite.prisma')

function run(cmd) {
    try {
        console.log(`> ${cmd}`)
        execSync(cmd, { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    } catch (e) {
        console.error(`Komut başarısız: ${cmd}`)
        // Hata durumunda devam etmeye çalışma, ama cleanup yap
        cleanup()
        process.exit(1)
    }
}

function cleanup() {
    if (fs.existsSync(prismaSchemaBackupPath)) {
        console.log('Orijinal schema geri yükleniyor...')
        fs.copyFileSync(prismaSchemaBackupPath, prismaSchemaPath)
    }
}

// 1. Dosya yedeğini al
if (!fs.existsSync(prismaSchemaBackupPath)) {
    console.log('Orijinal schema yedekleniyor...')
    fs.copyFileSync(prismaSchemaPath, prismaSchemaBackupPath)
}

// 2. Sqlite için schema oluştur
let content = fs.readFileSync(prismaSchemaBackupPath, 'utf8')
// Postgres -> Sqlite değişimi
content = content.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"')
content = content.replace(/url\s*=\s*env\("POSTGRES_PRISMA_URL"\)/, 'url = "file:./dev.db"')
content = content.replace(/directUrl\s*=\s*env\("POSTGRES_URL_NON_POOLING"\)/, '// directUrl = env("POSTGRES_URL_NON_POOLING")')

fs.writeFileSync(prismaSchemaSqlitePath, content)

try {
    console.log('================================================')
    console.log('=== ADIM 1: Yerel Verileri Dışa Aktar (SQLite) ===')
    console.log('================================================')

    // Schema'yı değiştir (SQLite yap)
    fs.copyFileSync(prismaSchemaSqlitePath, prismaSchemaPath)

    // Generate (SQLite client)
    run('npx prisma generate')

    // Export scriptini çalıştır
    run('node scripts/export-data.js')

    console.log('\n================================================')
    console.log('=== ADIM 2: Verileri Buluta Gönder (Postgres) ===')
    console.log('================================================')

    // Schema'yı geri yükle (Postgres yap)
    fs.copyFileSync(prismaSchemaBackupPath, prismaSchemaPath)

    // Generate (Postgres client)
    run('npx prisma generate')

    // Veritabanını senkronize et (schema push)
    console.log('Veritabanı şeması güncelleniyor (schema push)...')
    run('npx prisma db push --accept-data-loss')

    // Import scriptini çalıştır
    run('node scripts/import-data.js')

    console.log('\n================================================')
    console.log('=== İŞLEM BAŞARIYLA TAMAMLANDI! ===')
    console.log('================================================')

} catch (error) {
    console.error('Bir hata oluştu:', error)
} finally {
    cleanup()
}
