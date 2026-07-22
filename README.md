# Shaders Baby

A sandbox for creating GLSL fragment shaders while learning shader concepts, built with [Astro](https://astro.build) and [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas). Orignally following along with [The Book of Shaders](https://thebookofshaders.com/).

## How it works

Shaders are `.frag` files in `src/shaders/` (`00.frag`, `01.frag`, ...). `src/pages/index.astro` (home page grid) and `src/pages/shaders/[slug].astro` (individual shader page) both use `import.meta.glob('*.frag', { query: '?raw', ... })` to read every `.frag` file in that folder at build time and generate a route per file.

To add a shader: add a `NN.frag` file to `src/shaders/`. It gets a `/shaders/NN` route and a home page tile automatically, no other changes needed.

Rendering is handled by the `glslCanvas` library, not custom WebGL code. Each shader's source is passed to `<canvas class="glslCanvas" data-fragment={source}>`; `glslCanvas` compiles it and runs the render loop.

### Uniforms available in every shader

`glslCanvas` sets these automatically every frame, so you can declare them in a shader to use them:

- `uniform vec2 u_resolution;` — canvas size in pixels
- `uniform vec2 u_mouse;` — mouse position
- `uniform float u_time;` — seconds since load

### Image textures

`glslCanvas` supports loading images as textures via a `data-textures` attribute (comma-separated URLs) on the canvas. `index.astro` and `[slug].astro` each define a `textures` manifest mapping a shader's slug to its texture path(s):

```js
const textures: Record<string, string[]> = {
  '05': ['/rock-unsplash.jpg'],
};
```

Add an entry there for any shader that needs a texture. Put the image in `public/` and reference it with a root-relative path (e.g. `/my-image.jpg`).

The first texture listed becomes `uniform sampler2D u_tex0;` in the shader (a second would be `u_tex1`, etc.), plus a companion `uniform vec2 u_tex0Resolution;` with the image's real pixel dimensions which can be used for aspect-ratio correction so photos don't stretch to fit a square canvas (see `05.frag`).

## Things to know

- **A shader only animates if `u_time`/`u_mouse` is actually used, not just declared.** `glslCanvas` decides whether to keep redrawing a canvas by counting occurrences of `u_time`/`u_mouse`/`u_date` in the shader source text; the declaration itself counts as one, so it only treats a shader as animated if the uniform appears a second time. A shader that declares but never reads `u_time` gets drawn once and then goes blank the next time anything else on the page repaints (the WebGL canvas doesn't preserve its drawing buffer by default) — this happens on the home page grid since other shaders are animating. Fix: add a no-op like `color += u_time * 0.0;` before `gl_FragColor` to force it to be treated as animated.
- There's no per-shader vertex shader — `glslCanvas` provides a default full-screen quad, so only the fragment shader is written.

## Commands

All commands run from the project root:

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build the static site to `./dist/`         |
| `npm run preview` | Preview the production build locally       |

## References

- [The Book of Shaders](https://thebookofshaders.com/)
- [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)
- [Astro docs](https://docs.astro.build)
