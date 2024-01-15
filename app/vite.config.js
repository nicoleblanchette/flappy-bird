import { defineConfig } from 'vite'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     kaboom: 'kaboom'
  //   }
  // },

  // Add optimizeDeps.include to include "kaboom" in the optimized dependencies
  // resolve: {
  //   alias: {
  //     'kaboom': path.resolve(__dirname, '/kaboom/dist/kaboom.esm.min.js')
  //   }
  // // },
  // optimizeDeps: {
  //   include: ['kaboom']
  // },

  build: { outDir: '..' },

  base: '/flappy-bird/', 
});


// Add resolve.alias to map "kaboom" to the Kaboom.js library
