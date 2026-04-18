# Callseller — Site "Trabalhe Conosco"

Landing page de recrutamento para a **CallSeller**. Vai ficar em `http://callseller.com.br/trabalheconosco`. Público: candidatos que querem trabalhar na Callseller como vendedores remotos. Objetivo: **gerar credibilidade** com qualidade visual nível Apple (muita animação, efeito "WOW"), sem trair a identidade já existente da marca.

> ⚠️ O site atual `callseller.com.br` foi mal feito e será **refeito depois**. Por enquanto essa landing é a prioridade única.

## Idioma

- **Conversa comigo: português (pt-BR).** Sempre. Ver `memory/feedback_language.md`.
- **Conteúdo do site: pt-BR.** Sem misturar inglês em headlines. Voz: direta, declarativa, confiante. "Você" / "nós" — nunca "a gente".
- **Comentários de código / nomes de variáveis: inglês** (padrão).

## Estado atual (abril/2026)

Brainstorm em andamento (fase 1 de 6 — ver workflow abaixo). A marca **já está toda definida** — não estamos fazendo branding, estamos fazendo **ativação e execução web premium**.

- ✅ Copy pronto (pt-BR) — `Infos site Callseller/Copy Recrutamento Callsesller.md`
- ✅ Design system completo — `Infos site Callseller/colors_and_type.css` + `README.md`
- ✅ 4 logos (horizontal/mark, preto/branco) — `Infos site Callseller/assets/`
- ✅ 4 hero plates "RECRUTAMENTO" (radial / flat / 3D-dark / 3D-vignette)
- ✅ 4 vídeos (apresentação 1 + 2, depoimento 1 + 2) — `Infos site Callseller/assets/videos/`
- ✅ Protótipo React anterior feito pelo Claude Design (ficou "mt simples" — vamos elevar) — `Infos site Callseller/ui_kits/recrutamento/`
- ✅ Estratégia de deploy — **opção A**: standalone estático, sem constraints de hosting. `callseller.com.br` atual fica como está e será refeito depois. Urgência = contratar gente rápido.
- ✅ Stack: **Vite + React + GSAP + ScrollTrigger + Lenis + Framer Motion + Three.js/R3F** (só no hero)
- ✅ Ambição de motion: **Tier 2 global + Tier 1 no hero** (5-7 dias de build). WOW alto, mobile-safe. Hero WebGL coreografado (RECRUTAMENTO revelando em pedaços, glow pulse, plate interativo) + resto em GSAP/Framer Motion com stagger rigoroso, microinterações em cards/CTAs, contador animado nos números, transitions premium
- ✅ Conversão: **WhatsApp-only** (sem formulário — `ApplyForm.jsx` do protótipo antigo será descartado). Botão único "QUERO ME CANDIDATAR" agressivo.
- ✅ Número de WhatsApp: `+55 51 9828-2431` confirmado pelo usuário (8 dígitos funciona no `wa.me/` — o redirect absorve ambos os formatos).
- ✅ Mensagem pré-escrita do WhatsApp: *"Olá! Vi o site da CallSeller e tenho interesse em entrar pro time de vendas. Podem me passar os próximos passos?"*
- ✅ Link final do CTA: `https://wa.me/555198282431?text=Ol%C3%A1!%20Vi%20o%20site%20da%20CallSeller%20e%20tenho%20interesse%20em%20entrar%20pro%20time%20de%20vendas.%20Podem%20me%20passar%20os%20pr%C3%B3ximos%20passos%3F`
- ✅ Hospedagem: **Vercel** (deploy rápido, CDN global, zero config).
- ✅ Vídeos: usar originais (`Infos site Callseller/Videos originais/` — apresentação 1 = 176MB, apresentação 2 = 102MB; depoimentos já estão em `assets/videos/`) como fonte. Transcodar pra H.264 ~2.5-3.5Mbps 1080p + versão mobile leve, gerar poster, lazy-load. **Apresentações**: autoplay muted + loop ao entrar na viewport (não competem — cada uma em "palco" próprio). **Depoimentos**: click-to-play com poster cinematográfico (autoplay mudo num depoimento fica esquisito). Click em qualquer vídeo = unmute + fullscreen.
- ✅ Copy: tenho carta branca pra reescrever/reorganizar a copy mantendo a voz da marca.

## Estrutura do repo

```
Site Callseller/
├─ CLAUDE.md                     ← você está aqui
├─ .aiox-core/                   ← AIOX framework (agentes brand squad, etc)
├─ .claude/                      ← config local Claude Code
├─ .env / .env.example
├─ squads/                       ← definições dos agentes AIOX
└─ Infos site Callseller/        ← TODO o material de referência
   ├─ README.md                  ← design system doc completa (leia antes de mexer em visual)
   ├─ SKILL.md                   ← agent-skill entry point
   ├─ Copy Recrutamento Callsesller.md  ← copy final pt-BR
   ├─ colors_and_type.css        ← tokens CSS (cor, tipo, spacing, shadow, glow)
   ├─ assets/                    ← logos + hero plates + foto escritório + videos/
   ├─ Logos img Callseller/      ← logos originais (1-4.png)
   ├─ Logos PNG/                 ← LOGO1-4.png (mesma coisa renomeada)
   ├─ preview/                   ← HTML cards do design system (cores, tipo, botões, etc)
   ├─ screenshots/               ← kit-hero/kit-final/etc (histórico visual)
   ├─ ui_kits/recrutamento/      ← protótipo React anterior (Hero.jsx, Videos.jsx, etc)
   └─ uploads/                   ← originais (não editar)
```

## Design system — regras inegociáveis

Detalhes completos em `Infos site Callseller/README.md`. Resumo do que **não** pode ser quebrado:

- **Dark mode é o default e a identidade.** Fundo preto puro `#000`, acento verde elétrico `#1FB526` (único acento — sem segunda cor complementar, só tons de verde).
- **Glow verde é a assinatura.** CTAs, focus rings, marcas ativas. Multi-camada (luz real), nunca drop shadow colorido de 1 camada.
- **Tipografia:** Barlow Condensed 700/800 UPPERCASE pra display (placas hero, seções), Inter 400-700 pra corpo, JetBrains Mono pra números.
- **Ícones: Lucide line icons, 1.75px stroke.** NUNCA emoji. NUNCA unicode. A copy lista os ícones exatos por nome (`shield-check`, `award`, `cpu`, `globe`, `trending-up`, `trophy`, `zap`, `settings`, `headphones`, `clipboard-check`, `message-circle-check`, `eye`, `arrow-up-right`) — respeitar.
- **Casing:** section headers / CTAs / headline plates em CAIXA ALTA. Body em sentença normal. **Negrito** pra âncoras e números (`+R$ 7.000.000,00`, `+7 Anos`).
- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` — saída rápida, acomodação suave. **Sem spring bouncy.**
- **Durações:** 120ms (micro), 220ms (state), 400ms (layout), 700ms (hero reveals).

### Proibições explícitas (anti-slop)

- ❌ Parallax, flips 3D, rotações, confete, typewriter
- ❌ Gradientes pastel, washes de aquarela, blobs abstratos, renders 3D AI-slop
- ❌ Cards só com borda esquerda colorida (trope de AI-slop)
- ❌ Cantos 0px (muito brutal) ou totalmente arredondados > 32px (exceto pills)
- ❌ Emoji, unicode como ícone, Font Awesome
- ❌ Segunda cor de acento que não seja tom de verde
- ❌ Flat drop shadow colorido — sempre glow multi-camada

## Voz e copy — regras

- **Imperativo + primeira pessoa.** CTA canônico: **"QUERO ME CANDIDATAR"**.
- **Sem hedging.** Nada de "talvez", "possivelmente". Sempre declarativo.
- **Ritmo: afirmação curta e afiada + clarificador mais longo.** Exemplo: "Esqueça teorias intermináveis. Nós acreditamos no 'fazer'."
- **Parênteses pra gírias acessíveis:** "100% Hands-on (mão na massa)", "Home Office (trabalhe de onde quiser)".
- **Moeda em formato brasileiro:** `R$ 7.000.000,00` com negrito.

## CTA de candidatura

Botão primário abre WhatsApp com mensagem pré-escrita:

- Número: `+55 51 9828-2431` (confirmar dígito — provavelmente `99828-2431`)
- Link template: `https://wa.me/555198282431?text=<mensagem url-encoded>`
- Mensagem sugerida (a validar): `Olá! Vi o site da CallSeller e quero me candidatar pra trabalhar com vocês.`

## Workflow em andamento

Fase atual: **1. Brainstorm** (respondendo perguntas de scoping).

| # | Fase | Output |
|---|---|---|
| 1 | Brainstorm | respostas às 5-7 perguntas de scoping |
| 2 | Arquitetura narrativa | `narrative.md` (arco cena-a-cena) |
| 3 | Motion design | `motion-spec.md` (scroll choreography) |
| 4 | Spec de design | `docs/superpowers/specs/2026-04-18-callseller-recrutamento-design.md` |
| 5 | Plano de implementação | `plan.md` (via skill `writing-plans`) |
| 6 | Build + deploy | site no ar em `/trabalheconosco` |

Google Stitch entra na **fase 3** pra gerar variações visuais de seção / hero animado.

## Agentes e skills relevantes

- **Brand Chief** (`AIOX:agents:brand-chief`) — orquestrador brand, já ativo nessa sessão
- **superpowers:brainstorming** — skill ativa agora
- **superpowers:writing-plans** — próxima skill após spec aprovada
- **research** (`/research <tópico>`) — obrigatório quando bater barreira técnica (ex: como fazer scroll scrubbing WebGL específico)
- **deploy-vps** — skill de deploy pra VPS (pode ser relevante na fase 6)

## Referências externas (o que inspira)

- **Apple MacBook Pro** (`https://www.apple.com/macbook-pro/`) — benchmark de "WOW" que o usuário citou. Scroll scrubbing + WebGL + animações coreografadas.
- **Callseller atual** (`http://callseller.com.br`) — mal feito, será refeito depois.
