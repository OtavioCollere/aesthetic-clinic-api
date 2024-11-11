import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
  esbuild: {
    loader: 'ts', // Garante que os arquivos TypeScript sejam carregados corretamente
  },
})
