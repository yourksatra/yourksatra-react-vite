import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readdirSync, statSync, writeFileSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

// Custom plugin: konversi PNG/JPG ke WebP setelah build selesai
function imageminWebpPlugin() {
  return {
    name: 'vite-imagemin-webp',
    apply: 'build',
    async closeBundle() {
      const outDir = join(process.cwd(), 'dist', 'assets')
      if (!existsSync(outDir)) return

      // Dynamic import agar tidak error di dev
      const { default: imagemin } = await import('imagemin')
      const { default: imageminWebp } = await import('imagemin-webp')

      const files = readdirSync(outDir).filter(f =>
        ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
      )

      if (files.length === 0) return

      console.log(`\n[imagemin-webp] Converting ${files.length} image(s) to WebP...`)

      await Promise.all(
        files.map(async (file) => {
          const filePath = join(outDir, file)
          const result = await imagemin([filePath], {
            destination: outDir,
            plugins: [imageminWebp({ quality: 80 })],
          })
          if (result.length > 0) {
            const before = statSync(filePath).size
            const after = statSync(result[0].destinationPath).size
            const saved = (((before - after) / before) * 100).toFixed(1)
            console.log(`  ✓ ${file} → ${file.replace(/\.(png|jpg|jpeg)$/i, '.webp')} (${saved}% saved)`)
          }
        })
      )

      console.log('[imagemin-webp] Done.\n')
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      imageminWebpPlugin(),
    ],
    base: env.VITE_BASE_PATH || '/',
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            'chunk-react':       ['react', 'react-dom'],
            'chunk-framer':      ['framer-motion'],
            'chunk-react-icons': ['react-icons'],
            'chunk-lucide':      ['lucide-react'],
            'chunk-heroicons':   ['@heroicons/react'],
          },
        },
      },
    },
  }
})
