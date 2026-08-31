# Odisseia — Portfólio de Marcelo Expedito

Portfólio pessoal em **Angular 22** com tema editorial "papel & tinta": visual claro (ivory/ink), accent em vermelho tijolo e animações em **GSAP** (preloader tipográfico, revelações no scroll, tilt 3D, cortina de transição entre páginas).

## Páginas

- `/` — Home: hero, marquee de skills, trabalhos selecionados, serviços e CTA
- `/work` — Trabalhos: portfólio com filtros por categoria
- `/about` — Sobre: trajetória, timeline, skill bars e ferramentas
- `/contact` — Contato: canais (GitHub, LinkedIn, email) + formulário (mailto)

## Stack

- Angular 22 (standalone) + TypeScript
- SCSS (tokens em `src/styles/_tokens.scss`)
- GSAP + ScrollTrigger
- Fonts: Fraunces, Manrope, IBM Plex Mono

## Desenvolvimento

```bash
npm install
npm start        # servidor local em http://localhost:4200
npm run build    # build de produção em dist/odisseia/browser
```

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` constrói o site com `--base-href=/portfolio/` e publica em
`https://marcelo-slv.github.io/portfolio/` a cada push na `main`.

Na primeira vez, é preciso ativar no repositório:
**Settings → Pages → Source: GitHub Actions**.

O build também gera um `404.html` idêntico ao `index.html` para que deep links (ex.: `/portfolio/about`) funcionem no Pages.