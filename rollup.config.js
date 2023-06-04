import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
	input: Object.fromEntries(
		glob.sync('src/utilities/*.js').map(file => [
			path.relative(
				'src',
				file.slice(0, file.length - path.extname(file).length)
			),
			fileURLToPath(new URL(file, import.meta.url))
		])
	),
	output: {
		format: 'es',
		dir: 'dist'
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ]
};
