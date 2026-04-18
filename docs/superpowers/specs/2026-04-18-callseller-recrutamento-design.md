# Callseller — Landing "Trabalhe Conosco" · Design Spec

**Data:** 2026-04-18
**Status:** Aprovada pelo usuário — pronta pra planning
**Skill:** superpowers:brainstorming → superpowers:writing-plans
**Deploy target:** `callseller.com.br/trabalheconosco` (via Vercel, rota configurada depois via reverse-proxy ou substituição do host principal)

---

## 1. Contexto

CallSeller é uma operação B2B de vendas de alta performance (home-office, 100+ vendedores, +R$7M/mês recuperados) que precisa **contratar rápido** novos vendedores. O site `callseller.com.br` atual foi mal feito e será refeito depois — por enquanto, essa landing vai no ar como página standalone em `/trabalheconosco`.

**Público:** candidato brasileiro, perfil blue-collar aspiracional, sem exigência de currículo ou diploma. Busca: liberdade geográfica + ganhos acima da média + pertencer a algo que funciona.

**Objetivo de negócio:** maximizar clicks no CTA WhatsApp (único caminho de conversão).

**Objetivo narrativo:** fazer o candidato sentir *"essa empresa é foda, é real, eu quero trabalhar aqui"* já nos primeiros 3 segundos, e levar ele à conversão com prova, voz humana e clareza operacional.

**Benchmark visual:** `apple.com/macbook-pro` — efeito "WOW" via motion design, mas sem trair a identidade dark/electric-green da marca.

## 2. Constraints inegociáveis

### 2.1 Design system (já existe — ver `Infos site Callseller/README.md`)
- **Dark mode default.** Preto puro `#000`, acento verde `#1FB526` (único).
- **Glow verde multi-camada** é a assinatura. NUNCA drop shadow colorido flat.
- **Tipografia:** Barlow Condensed 700/800 UPPERCASE (display) + Inter 400-700 (body) + JetBrains Mono (números).
- **Ícones:** Lucide 1.75px stroke. Zero emoji, zero unicode, zero Font Awesome.
- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)`. Durations: 120/220/400/700ms.

### 2.2 Anti-slop (proibições duras)
- ❌ Parallax, flips 3D, rotações bounce, confete, typewriter
- ❌ Gradientes pastel, washes de aquarela, blobs abstratos, renders 3D AI-slop
- ❌ Cards só com borda esquerda colorida (slop trope)
- ❌ Cantos 0px ou totalmente arredondados > 32px (exceto pills)
- ❌ Segunda cor de acento que não seja tom de verde
- ❌ Spring bouncy

### 2.3 Voz pt-BR
- Imperativo + 1ª pessoa. CTA canônico: **"QUERO ME CANDIDATAR"**.
- Sem hedging (nada de "talvez", "possivelmente"). Sempre declarativo.
- Ritmo: afirmação curta e afiada + clarificador longo.
- "Você" / "nós" — nunca "a gente".

### 2.4 Conversão
- **WhatsApp-only.** Sem formulário.
- Link: `https://wa.me/555198282431?text=<mensagem url-encoded>`
- Mensagem pré-escrita: *"Olá! Vi o site da CallSeller e tenho interesse em entrar pro time de vendas. Podem me passar os próximos passos?"*

### 2.5 Vídeos
- Fonte: `Infos site Callseller/Videos originais/apresentacao1.mp4` (176MB) + `apresentacao2.mp4` (102MB) + `Infos site Callseller/assets/videos/depoimento1.mp4` (7MB) + `depoimento2.mp4` (14MB).
- Transcodar (ffmpeg): H.264 ~3Mbps 1080p desktop + ~1.5Mbps 720p mobile. Gerar poster (PNG, frame médio).
- **Apresentações**: autoplay muted + loop ao entrar na viewport. Click = unmute + fullscreen.
- **Depoimentos**: click-to-play com poster cinematográfico. Vídeo tocando dim o outro a 40%.

## 3. Stack técnica

```
Vite + React 18 (JS puro, sem TypeScript — ship speed)
├─ tailwindcss v3 (utility) + CSS vars de colors_and_type.css importadas
├─ gsap + @gsap/ScrollTrigger (scroll choreography)
├─ lenis (smooth scroll global)
├─ framer-motion (reveals, accordion)
├─ three + @react-three/fiber + @react-three/drei (só hero + partículas CTA final)
├─ lucide-react (ícones)
└─ build-time: ffmpeg CLI pra transcodar vídeos

Deploy: Vercel (zero config)
```

**Por que Vite + React puro (não Next.js):** página estática single-page, SSR não ajuda, build mais rápido, deploy na Vercel como SPA. Single HTML bundle.

## 4. Estrutura de seções (ordem de scroll)

| # | ID | Seção | Papel narrativo |
|---|---|---|---|
| 1 | `#nav` | **Nav sticky** | Sempre-presente, CTA a 1 clique |
| 2 | `#hero` | **HERO WebGL** — "TRABALHE CONOSCO" | Slap identitário — "essa empresa é foda" |
| 3 | `#operacao` | **Operação por dentro** — Apresentação1 + Quem somos + Stats | Prova de legitimidade, vê a empresa real |
| 4 | `#beneficios` | **O que você encontra** — 4 cards | Sell — liberdade, ganhos, valorização, oportunidades |
| 5 | `#depoimentos` | **Quem vende com a gente** — 2 vídeos | Social proof humano |
| 6 | `#selecao` | **Nossa seleção** — 3 steps | Remove medo do processo |
| 7 | `#treinamento` | **"NENHUMA AULA VENCE A PRÁTICA"** — headline + Apresentação2 | Remove medo de não saber vender |
| 8 | `#numeros` | **CallSeller em números** — 4 metrics | Prova de escala (+7 anos, +R$7M, +50, +100) |
| 9 | `#faq` | **FAQ** — accordion | Objection handling |
| 10 | `#candidatar` | **"PRONTO PARA COMEÇAR?"** — CTA final | Fecha — WOW + botão massivo |
| 11 | `#footer` | **Footer** | Minimal — logo + copyright |

### 4.1 Reorganizações vs. copy original
- "Quem é a CallSeller" + "Stats" mergidas em `#operacao` (uma só seção dramática com apresentação1 como filme de fundo).
- Depoimentos subidos — aparecem **antes** do processo de seleção (social proof puxa o leitor pra frente).
- "NENHUMA AULA VENCE A PRÁTICA" vira headline de seção inteira (antes tava perdida no meio do copy).
- FAQ intro reduzida a 1 linha.

## 5. Motion design — cena a cena

### 5.1 Nav sticky (`#nav`)

- Initial state: `position: sticky`, `top: 0`, `background: transparent`
- Ao scroll > 80px: adiciona `backdrop-filter: blur(20px)` + `background: rgba(10,12,10, 0.65)` com transition 220ms
- Logo mark à esquerda (logo-mark-white.png), links centrais (âncoras das seções: Operação / Benefícios / Processo / FAQ), botão "QUERO ME CANDIDATAR" à direita (com glow sm)
- Mobile: links viram hamburger → drawer lateral

### 5.2 HERO (`#hero`) — Tier 1 WebGL

**Composição:**
- Background: preto `#000`, Three.js canvas cobrindo viewport inteiro
- Canvas contém: 1 plane com shader de radial glow + 1 grupo de letras 3D extrudadas formando "RECRUTAMENTO" (ou: plane com textura da `recrutamento-radial.png` como fallback/base + shader de revelação). **Decisão de implementação:** começar com abordagem 2D-shader-based (mais performática, cross-browser, menos risco) — plane com texture + fragment shader que controla reveal de partes da textura pela máscara. Se der tempo e ficar bom, upgrade pra letras 3D extrudadas.

**Coreografia (total: ~2000ms):**

| Tempo | Evento |
|---|---|
| 0-300ms | Page load, Lenis inicializa, canvas monta. Tela preta. |
| 300-800ms | Radial glow verde cresce do centro (scale 0 → 1, opacity 0 → 0.8). Easing brand. |
| 500-1100ms | Letras de "RECRUTAMENTO" revelam sequencialmente (stagger 80ms entre letras, cada uma aparece em 200ms com bloom sutil). |
| 1100-1500ms | "TRABALHE CONOSCO." headline aparece em 2 chunks ("TRABALHE\n" + "CONOSCO.") com mask-reveal top→bottom. |
| 1500-1800ms | Lead paragraph fade-up (20px → 0, opacity 0 → 1). |
| 1800-2200ms | CTAs deslizam de baixo + glow ramp up. Pulse inicia após chegada. |

**Interação contínua:**
- Mouse move: fonte de luz do glow acompanha o cursor com damping (follow lento, 8% velocidade — sem parallax de elementos, só luz)
- Touch (mobile): fonte de luz segue o último toque ou orbita lentamente
- CTA primário: glow pulse 2.4s cycle, ±10% opacity, forever

**Hero proof bar (embaixo):**
- "**+7 anos** de operação · **+100** vendedores no Brasil · **+R$7M** recuperados/mês"
- Números fazem count-up de 0 ao entrar na viewport (só na primeira vez)

**Fallback (no-WebGL / reduced-motion):**
- Usa `recrutamento-radial.png` como imagem estática + CSS glow pulsando
- Sem count-up, só fade-in

### 5.3 `#operacao` — Operação por dentro

**Layout desktop:** 2 colunas (50/50). Vídeo esquerda, texto direita.

- **Esquerda:** video em "filmreel frame" — moldura preta 16px + borda verde 1px + glow sm. Autoplay muted loop playsInline, poster inicial, Intersection Observer dispara play quando ≥50% visível. Click = unmute + fullscreen nativo.
- **Direita:** eyebrow "CONHEÇA A OPERAÇÃO" (verde, caps) → H2 display "A OPERAÇÃO QUE MOVIMENTA +R$1 BILHÃO POR ANO." → lead → 3 bullets com Lucide icons:
  - `shield-check` — **Solidez:** Operando desde 2017.
  - `award` — **Autoridade:** Referência em conversão.
  - `cpu` — **Tecnologia própria:** Plataforma PagaH integrada.

**Motion:**
- Seção entra com fade-up da coluna de texto (40px offset, stagger 120ms entre eyebrow → H2 → lead → cada bullet)
- Vídeo entra com scale 0.95 → 1 + opacity 0 → 1 (400ms)

**Stats strip (full-width, embaixo):**
- 4 números em row: "**+R$1 BILHÃO/ANO**" ecossistema · "**2017**" fundação · "**50+**" parceiros · "**100+**" vendedores
- Count-up on view. Display XL. Separadores verdes finos entre eles.

**Mobile:** stack vertical. Vídeo em cima, texto embaixo, stats em grid 2x2.

### 5.4 `#beneficios` — O que você encontra

**Layout:** grid 4 colunas desktop / 2x2 mobile.

**Headline da seção:** "**O QUE VOCÊ ENCONTRA AO TRABALHAR CONOSCO.**" (H2 display)

**Cards (4):**
1. `globe` — **Liberdade geográfica** — "Home Office 100% (trabalhe de onde quiser)."
2. `trending-up` — **Projeção de ganhos** — "Possibilidade de ganhos acima da média, compatíveis com sua dedicação."
3. `trophy` — **Valorização do resultado** — "Reconhecimento real pra quem entrega."
4. `arrow-up-right` — **Oportunidades internas** — "Espaço pra assumir novas responsabilidades conforme o desempenho."

**Estilo de card:**
- bg `--bg-surface`, border `1px --border-hairline`, radius 16px, padding 32px
- Ícone no topo (40px, cor verde)
- Título h3, lead body
- Inset highlight top: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)`

**Motion:**
- Scroll-in: cada card com translateY(24px) → 0, opacity 0 → 1, stagger 100ms
- Hover: border fica `--border-strong`, outer glow verde (`--glow-green-sm`), icon color white → green (120ms)

### 5.5 `#depoimentos` — Quem vende com a gente

**Headline:** "**NA VOZ DE QUEM VENDE COM A GENTE.**"

**Layout:** 2 cards video lado a lado (desktop) / stacked (mobile).

**Card vídeo:**
- Ratio 9:16 (depoimentos são verticais) ou 16:9 (verificar quando transcodar) → ajustar proporção com base no real
- Poster image cinematográfico (frame médio do vídeo, com overlay gradiente escuro)
- Scan-line verde sutil animada sobre o poster (CSS linear-gradient animado)
- Play button center: círculo verde 80px com ícone `play`, glow md
- Meta embaixo: tag "DEPOIMENTO · VENDEDOR 01" + nome se soubermos (se não, só "Vendedor CallSeller")

**Interação:**
- Hover: scan-line acelera levemente (opcional), play button scale 1 → 1.05
- Click: scan-line some, vídeo unmuta e vai fullscreen nativo (ou modal)
- Enquanto um vídeo toca: o outro dim a 40% + sem interação

**Motion:**
- Cards entram com fade-up stagger 150ms

### 5.6 `#selecao` — Nossa seleção

**Headline:** "**NOSSA SELEÇÃO DE TALENTOS: FOCO NAS PESSOAS.**"

**Lead:** 1 parágrafo curto (3-4 linhas max) explicando que o processo é humano e transparente.

**Layout:** 3 step cards em row.

**Steps:**
1. `clipboard-check` — **Avaliação de perfil** — "Todas as candidaturas são analisadas diretamente por nossos líderes de vendas."
2. `message-circle-check` — **Feedback ativo** — "Mantemos fluxo de retorno após a coleta de informações."
3. `eye` — **Transparência total** — "Selecionados participam de entrevistas detalhadas pra entender 100% da empresa e do modelo."

**Estilo card (variante do benefits):**
- Número grande esmaecido no canto (`01`, `02`, `03` em mono, `--fg-muted`, font-size 64px, opacity 0.3)
- Ícone Lucide abaixo do número
- Título h3 + lead

**Motion:**
- Scroll-in: card reveal com "traço verde" animado na borda (inicia de canto superior-esquerdo, desenha o perímetro em 600ms, depois some). NÃO é left-border-slop — é outline stroke animation usando SVG ou conic-gradient mask. Apenas no entry, não no hover.
- Hover: glow verde envolve o card (mesmo padrão do benefits)

### 5.7 `#treinamento` — Nenhuma aula vence a prática

**Headline massivo (display XL):**

> **ESQUEÇA TEORIAS INTERMINÁVEIS.**
> **NÓS ACREDITAMOS NO "FAZER".**

Word-by-word reveal GSAP SplitText (ou implementação custom de split) — 80ms stagger.

**Layout:** 2 colunas. Texto/bullets esquerda, vídeo apresentação2 direita (mesmo filmreel-frame do #operacao).

**Bullets esquerda:**
- `zap` — **Agilidade** — "Foco em contato eficiente e execução diária."
- `settings` — **Domínio da operação** — "Aprenderá com perfeição a plataforma PagaH e os produtos."
- `headphones` — **Suporte real** — "Avaliação constante e feedback em tempo real."

**Punchline final:** "**NENHUMA AULA VENCE A PRÁTICA.**" — display, subtle glow pulse, em linha solo.

**Motion:**
- Headline word-by-word
- Bullets stagger com icon pulse (cada ícone faz scale 1 → 1.1 → 1 em 400ms quando entra)
- Vídeo autoplay muted loop ao entrar na viewport

### 5.8 `#numeros` — CallSeller em números

**Full-bleed black section. Background: vignette verde intensifica ao entrar na viewport.**

**Headline:** "**A CALLSELLER EM NÚMEROS.**"

**Grid 4 colunas (desktop) / 2x2 (mobile):**

| Número | Label |
|---|---|
| **+7 ANOS** | DE EXPERIÊNCIA NO MERCADO DIGITAL |
| **+R$ 7 MILHÕES** | VENDAS RECUPERADAS MENSALMENTE |
| **+50 PARCEIROS** | IMPACTADOS PELA NOSSA TECNOLOGIA |
| **+100 VENDEDORES** | ATUANDO EM TODO O BRASIL |

**Estilo:**
- Número em Barlow Condensed 800, font-size `clamp(64px, 10vw, 160px)`, cor white
- Label em Inter 600, caps, tracking-caps-lg, cor `--fg-muted`
- Separador vertical verde 1px entre colunas

**Motion:**
- Headline fade-up
- Números: count-up de 0 (800ms cada, stagger 300ms), easing brand. Count-up usa `IntersectionObserver` — dispara uma vez.
- Vignette verde background: opacity 0 → 0.3 conforme seção entra na viewport (ScrollTrigger)

### 5.9 `#faq` — FAQ

**Headline:** "**PERGUNTAS FREQUENTES.**"

**4 items (reduzi a intro, mantive as perguntas do copy original):**

1. Preciso ter experiência em vendas pra me candidatar?
2. Como funciona o trabalho Home Office?
3. Como sou acompanhado no dia a dia?
4. Qual o próximo passo após enviar meus dados?

**UI:**
- Accordion. Card border hairline, radius 16px, padding 24px 32px
- Pergunta à esquerda (h3), "+" icon à direita (Lucide `plus`)
- Click: height smooth anim (GSAP), "+" rotaciona 45° → "×", background sutilmente mais claro, glow verde hairline
- Respostas em body, max-width 680px, line-height loose

**Motion:**
- Scroll-in stagger das items
- Hover (fechado): border vira `--border-default`

### 5.10 `#candidatar` — Pronto pra começar?

**Seção hero-like. Full viewport height (mobile: 80vh).**

**Background Three.js:** low-count particle system — ~40 partículas verdes pequenas subindo lentamente do bottom ao top, com drift horizontal sutil e fade in-out. Cada partícula é um sprite ou point com material aditivo (blending). Custo baixo, visual cinematográfico.

**Content centered:**
- Eyebrow verde "VAGAS ABERTAS"
- Headline display XL "**PRONTO PARA COMEÇAR?**"
- Lead: "Mande um oi pelo WhatsApp. A gente te conta os próximos passos."
- CTA **MASSIVO** — botão primário, font-size 22px, padding 24px 48px, glow-green-lg pulsando. Texto: "**QUERO ME CANDIDATAR**" + icon `arrow-up-right`.
- Small text embaixo: "Atendimento direto com nossa equipe de recrutamento · Seg-Sex, 9h-18h"

**Motion:**
- Scroll-in: particles fade in, headline word-by-word, CTA last com scale 0.9 → 1 + glow intensify
- CTA hover: glow vai pra xl, scale 1.02
- CTA click: snackbar "Abrindo WhatsApp..." + abre link em nova aba

### 5.11 `#footer`

**Minimal. Single row.**

- Left: logo horizontal white, small
- Right: "© 2026 CallSeller · Todos os direitos reservados"
- Border top hairline

## 6. Arquivos / estrutura do projeto

```
Site Callseller/
├─ CLAUDE.md                       (atual — project memory)
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ index.html
├─ public/
│  ├─ assets/                      (logos, hero plates, office photo — copy de Infos/)
│  ├─ videos/                      (transcoded mp4s + posters)
│  └─ favicon.svg
├─ src/
│  ├─ main.jsx                     (entry — mount <App />)
│  ├─ App.jsx                      (layout: Nav + Hero + Operacao + ... + Footer)
│  ├─ styles/
│  │  ├─ globals.css               (imports de colors_and_type.css + tailwind directives)
│  │  └─ colors_and_type.css       (copy 1:1 de Infos/)
│  ├─ lib/
│  │  ├─ smoothScroll.js           (Lenis setup)
│  │  ├─ splitText.js              (split helper pro word-by-word)
│  │  └─ countUp.js                (number count animation helper)
│  ├─ hooks/
│  │  ├─ useInView.js              (IntersectionObserver wrapper)
│  │  └─ usePrefersReducedMotion.js
│  └─ components/
│     ├─ Nav.jsx
│     ├─ Hero/
│     │  ├─ Hero.jsx
│     │  ├─ HeroCanvas.jsx         (R3F canvas)
│     │  └─ shaders/
│     │     ├─ heroGlow.vert
│     │     └─ heroGlow.frag
│     ├─ Operacao.jsx
│     ├─ Beneficios.jsx
│     ├─ Depoimentos.jsx
│     ├─ Selecao.jsx
│     ├─ Treinamento.jsx
│     ├─ Numeros.jsx
│     ├─ FAQ.jsx
│     ├─ CtaFinal/
│     │  ├─ CtaFinal.jsx
│     │  └─ Particles.jsx          (R3F particle system)
│     ├─ Footer.jsx
│     ├─ VideoPlayer.jsx           (reusable: autoplay/click-to-play + unmute + fullscreen)
│     └─ Icon.jsx                  (lucide-react wrapper c/ size default)
└─ scripts/
   └─ transcode-videos.sh          (ffmpeg wrapper — roda uma vez antes do build)
```

## 7. Vídeos — pipeline de transcode

**Script `scripts/transcode-videos.sh`:**

- Input: `Infos site Callseller/Videos originais/*.mp4` (apresentações) + `Infos site Callseller/assets/videos/depoimento*.mp4`
- Output em `public/videos/`:
  - `apresentacao1-desktop.mp4` — H.264 1080p ~3Mbps CRF 23 AAC 128k
  - `apresentacao1-mobile.mp4` — H.264 720p ~1.5Mbps CRF 26 AAC 96k
  - (mesmo pra apresentacao2, depoimento1, depoimento2)
  - `apresentacao1-poster.jpg` — frame do meio, 1920x1080, quality 85
  - (poster pra cada vídeo)
- Executado via `npm run transcode-videos` — roda 1x, commit dos outputs.

**VideoPlayer component:**
- `<video>` nativo com `<source media="(max-width: 768px)" src="mobile.mp4">` e `<source src="desktop.mp4">`
- `preload="metadata"`, `playsInline`, `controls={false}` inicialmente
- Autoplay mode: `muted`, `loop`, Intersection Observer dispara `.play()` quando ≥50% visível
- Click-to-play mode: poster mostrado até click, play button overlay, click = mostrar controls + unmute + (desktop) fullscreen

## 8. Acessibilidade

- Skip-link "Pular pro conteúdo" no topo
- Hierarquia de headings correta (h1 hero, h2 seções, h3 cards)
- Alt text em logos ("CallSeller")
- Vídeos com `<track kind="captions">` se tivermos legendas (senão aria-label descritivo)
- `prefers-reduced-motion: reduce` → desabilita scroll scrubbing, hero animation, particles, scan-lines, count-up (mostra números diretamente). Mantém fades básicos.
- Focus-visible com glow verde (já no design system)
- Contraste mínimo AA (design system já passa)
- Links descritivos (WhatsApp CTA tem aria-label "Candidatar-se via WhatsApp")

## 9. Performance targets

| Métrica | Target |
|---|---|
| Lighthouse mobile performance | ≥ 85 |
| Lighthouse mobile accessibility | ≥ 95 |
| Lighthouse mobile best-practices | ≥ 95 |
| Lighthouse mobile SEO | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TBT | < 300ms |
| Bundle JS inicial (gzipped) | < 200KB |
| Hero canvas inicialização | < 500ms |

**Estratégias:**
- Code split: Three.js canvas do hero só carrega após hero estar na viewport (lazy import) — mas hero é above-fold, então carrega via React.lazy com Suspense. Versão mais simples: sempre carregar mas minimizar (drei tree-shakeable).
- Partículas do CTA final: lazy load quando entrar na viewport.
- Vídeos: `preload="metadata"` apenas, lazy load de fato só ao entrar na viewport.
- Imagens: WebP com fallback PNG, `loading="lazy"` abaixo da dobra.
- Fontes: `font-display: swap`, subset latin-ext (pt-BR).

## 10. SEO / Meta

- `<title>`: "Trabalhe Conosco — CallSeller"
- `<meta name="description">`: "Vagas de vendas home-office na CallSeller. Operação referência nacional, +R$7M recuperados/mês. Candidate-se pelo WhatsApp."
- OG tags (og:title, og:description, og:image, og:url)
- OG image: gerar uma imagem 1200x630 com o logo + headline "TRABALHE CONOSCO" em fundo preto com glow verde
- Twitter card `summary_large_image`
- `<html lang="pt-BR">`
- Schema.org JSON-LD: `JobPosting` pra cada vaga (ou `Organization` + `hiringOrganization`) — reforça indexação pra candidatos chegando via Google

## 11. Analytics (mínimo viável)

- **Vercel Analytics** (built-in, gratuito no plano free) — page views + core web vitals.
- **Evento custom:** click no CTA WhatsApp (em qualquer botão) — envia evento `cta_whatsapp_click` com `location: hero|nav|cta_final`.
- Sem Meta Pixel / Google Ads por enquanto (adicionar depois se o usuário quiser rodar campanhas).
- Sem cookies de terceiros. Sem banner LGPD obrigatório (sem captura de dados pessoais na página).

## 12. Deploy — Vercel

- Repo Git (init nesse projeto) → push pro GitHub (repo privado, usuário cria)
- Conectar Vercel ao repo
- Build command: `npm run build` (Vite default)
- Output: `dist/`
- Env vars: nenhuma (landing estática)
- Domínio: `callseller.com.br/trabalheconosco` — rota configurada depois. Opção inicial: Vercel dá um subdomínio tipo `callseller-recrutamento.vercel.app`, usamos isso até ligar o domínio real.
- Redirects no Vercel: catch-all → index.html (SPA routing)

## 13. Roadmap de execução (resumo — detalhe vai no `plan.md`)

1. Scaffold Vite + React + Tailwind + GSAP + Lenis + R3F + lucide-react
2. Copiar assets de `Infos site Callseller/` pro `public/assets/`
3. Copiar `colors_and_type.css` pro `src/styles/`
4. Rodar `transcode-videos.sh` pra gerar videos otimizados em `public/videos/`
5. Build Nav + shell do app
6. Build Hero (WebGL canvas + text + CTAs + proof bar)
7. Build Operacao (video + copy + stats strip)
8. Build Beneficios
9. Build Depoimentos (VideoPlayer component)
10. Build Selecao
11. Build Treinamento
12. Build Numeros (count-up)
13. Build FAQ (accordion)
14. Build CtaFinal (particles + botão massivo)
15. Build Footer
16. Passe geral: smooth scroll (Lenis), ScrollTrigger configurations, reduced-motion fallbacks
17. Acessibilidade (focus order, skip-link, aria-labels, captions)
18. Performance (Lighthouse audit + ajustes)
19. OG image + meta tags
20. Deploy Vercel
21. QA final — abrir em mobile real, testar todos os vídeos, testar CTA WhatsApp de todos os pontos
22. Entregar URL pro usuário

## 14. Riscos & mitigações

| Risco | Prob | Mitigação |
|---|---|---|
| WebGL hero não funciona em browser antigo | baixa | Fallback automático: CSS + imagem `recrutamento-radial.png` |
| Vídeos muito grandes (mesmo após transcode) | média | Gerar 2 qualidades + lazy load + poster. Se ainda pesado, mover pra CDN externa |
| Mobile performance abaixo do target | média | Reduzir partículas CTA final a 20, desabilitar hero shader em low-end (detectar via `navigator.deviceMemory`), sempre preferir mobile version dos vídeos |
| Fonte Barlow Condensed não carrega a tempo (FOUT) | baixa | `font-display: swap` + preload do woff2 |
| Autoplay bloqueado pelo browser (mobile) | média | Sempre muted + playsInline. iOS requer user gesture pra unmute — tratado via click-to-unmute. |
| Domínio `callseller.com.br/trabalheconosco` não apontar na hora do deploy | média | Usar subdomínio Vercel temporário. Documentar passo de DNS pro usuário. |

## 15. O que está FORA de escopo desta entrega

- Refazer o resto do `callseller.com.br` (será feito depois)
- Dashboard de candidatos / ATS
- Captura de leads via formulário (decidido: WhatsApp-only)
- Integração com Meta Pixel / Google Ads
- Testes automatizados (e2e / unit) — entrega focada em ship, QA é manual
- Múltiplos idiomas (pt-BR only)
- Blog / conteúdo editorial
- Área logada

---

**Aprovado pelo usuário:** 2026-04-18, momento da frase "Bora!" após apresentação completa de narrativa + motion plan.

**Próximo artefato:** `docs/superpowers/plans/2026-04-18-callseller-recrutamento-plan.md` (via skill `superpowers:writing-plans`).
