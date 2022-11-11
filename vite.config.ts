import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 3000
  },
  worker: {
    format: 'es'
  }
};

export default config;
