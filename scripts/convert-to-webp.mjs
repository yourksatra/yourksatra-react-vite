/**
 * Script: konversi PNG/JPG di src/assets ke WebP
 * Jalankan: node scripts/convert-to-webp.mjs
 */
import { readdirSync, statSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'

const DIRS = [
  'src/assets/Img',
  'src/assets/Icon',
]

for (const dir of DIRS) {
  const absDir = join(process.cwd(), dir)
  if (!existsSync(absDir)) continue

  const files = readdirSync(absDir).filter(f =>
    ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
  )

  if (files.length === 0) continue

  console.log(`\nConverting ${files.length} file(s) in ${dir}...`)

  const results = await imagemin(
    files.map(f => join(absDir, f)),
    { destination: absDir, plugins: [imageminWebp({ quality: 80 })] }
  )

  for (const r of results) {
    const srcFile = r.sourcePath
    const dstFile = r.destinationPath
    const before = statSync(srcFile).size
    const after = statSync(dstFile).size
    const saved = (((before - after) / before) * 100).toFixed(1)
    console.log(`  ✓ ${basename(srcFile)} → ${basename(dstFile)} (${saved}% smaller)`)
  }
}

console.log('\nDone! Update import paths in your components to use .webp files.')
