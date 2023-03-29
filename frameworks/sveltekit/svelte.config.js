import adapter from '@sveltejs/adapter-vercel';
import path from 'path';
import url from 'url';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		files: {
			routes: path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'src')
		},
		adapter: adapter()
	}
};

export default config;
