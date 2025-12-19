import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import url from 'url';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		files: {
			routes: path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'src', 'routes')
		},
		adapter: adapter()
	}
};

export default config;
