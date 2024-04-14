import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/infop-comp-calc",
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
			},
		}),
	],
});
