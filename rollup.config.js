import buble from 'rollup-plugin-buble'
import typescript from 'rollup-plugin-typescript'

const pkg = require( './package.json' );

export default {
    input: 'src/index.ts',
    external:['riot'],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        buble()
    ],
    output: [
		{
			format: 'cjs',
			file: pkg.main
        },
        {
            format: 'umd',
            moduleName: 'riot-typed',
            name: 'riot-typed',
			file: 'dist/riot-typed.js'
		},
		{
			format: 'es',
			file: pkg.module
		}
	]
}