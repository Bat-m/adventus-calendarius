import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from "autoprefixer";
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  preprocess: sveltePreprocess({
    scss: {
      // We can use a path relative to the root because
      // svelte-preprocess automatically adds it to `includePaths`
      // if none is defined.
      prependData: `@import 'src/styles/variables.scss';`
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  })
};
