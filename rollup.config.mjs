import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('package.json', import.meta.url)))

const plugins = [
  resolve({
    dedupe: ['vue'],
    extensions: ['.js', '.ts', '.json', '.vue'],
  }),
  typescript({
    exclude: ['**/__tests__/**'],
    tsconfig: './tsconfig.json',
  }),
  commonjs({
    include: ['../../node_modules/**'],
  }),
]

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: pkg.module,
      exports: 'named',
      sourcemap: true,
    },
    external: ['@coreui/chartjs', 'chart.js', 'vue'],
    plugins: [...plugins, vue()],
  },
  // SSR build.
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: pkg.main,
      exports: 'named',
      sourcemap: true,
    },
    external: ['@coreui/chartjs', 'chart.js', 'vue'],
    plugins: [...plugins, vue({ template: { optimizeSSR: true } })],
  },
]
