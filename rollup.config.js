import glob from 'glob';
import css from 'rollup-plugin-css-only';

export default {
    input: glob.sync('src/utilities/index.js'),
	output: {
        file: 'dist/bundle.js',
        name: 'bundle.js',
		format: 'iife',
    },
    plugins: [
        css({ output: 'bundle.css' }),
    ]
};
