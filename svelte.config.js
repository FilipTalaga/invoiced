import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    ssr: false
  }
};
