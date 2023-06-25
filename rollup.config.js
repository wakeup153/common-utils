import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'

const commonConfig = {
  input: './src/index.js',
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm'
    },
    {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: '$utils'
    }
  ]
}
const commonPlugins = [
  babel({
    exclude: 'node_modules/**'
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs()
]
const plugins = isProd ? commonPlugins.concat([
  terser()
]) : commonPlugins.concat([])

export default {
  ...commonConfig,
  plugins,
}