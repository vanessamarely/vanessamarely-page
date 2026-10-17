# vanessamarely.dev

Sitio personal de Vanessa Marely, hecho con [Astro](https://astro.build).

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Contenido

- **Artículos**: se leen en tiempo de build desde la API de DEV y el RSS de Medium (`src/lib/posts.ts`).
  El sitio publicado es HTML estático, y GitHub Actions lo reconstruye a diario (`.github/workflows/deploy.yml`) para traer los posts nuevos.
- **Charlas**: `src/data/talks.ts`. Una línea por charla con `t(...)` y sus recursos (slides, video, repo, demo, evento, post).
- **Proyectos**: `src/data/projects.ts` (catálogo curado; las estrellas se leen de GitHub en el build).
- **Redes**: `src/lib/social.ts`.
- **Ilustración del perfil**: `src/components/Portrait.astro` (SVG animado; al hacer clic se muestra la foto `public/images/vanessa.jpg`).
