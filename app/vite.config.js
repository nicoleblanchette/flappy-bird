import { defineConfig } from "vite"

export default defineConfig({
	build: { outDir: ".." },
	base: "/flappy-bird/",
})

// Add resolve.alias to map "kaboom" to the Kaboom.js library
