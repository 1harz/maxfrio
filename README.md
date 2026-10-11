# MaxFrio | Ar-Condicionado em Brasília

Site institucional da MaxFrio Ar-Condicionado, empresa de Brasília com mais de 20 anos
de experiência em instalação, manutenção, higienização e reparos. A abertura
usa uma composição editorial minimalista com uma foto pequena de apoio; as seções
seguintes mantêm animações de rolagem, SVG e canvas 2D.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em /dist
npm run preview  # serve o build
```

## Stack

- **React 18 + Vite 5** | componentes e build
- **GSAP 3.13** (ScrollTrigger, SplitText, CustomEase) | coreografia de scroll
- **Lenis** | smooth scroll
- **Canvas 2D** | esfera de partículas da cobertura (pausa fora da viewport
  via IntersectionObserver)

## Estrutura

```
src/
  components/       seções React (Hero, Products, Benefits, Coverage…)
  js/
    core.js         Lenis + GSAP + eases + utilidades
    reveals.js      sistema de reveal por blur (linhas/chars/blocos) + highlight scrub
    hovers.js       roll de caracteres, CTA roll, magnético
    ui.js           popups, menu, acordeão, palavras em loop, relógio, tema do header
    scenes.js       cenas de rolagem, troca de telas + blueprint, cobertura
    canvas.js       esfera de partículas
    site.js         orquestrador
  styles/           design system (tokens, layout, componentes)
public/assets/      SVGs autorais (unidades AC, blueprint, cenas, dial, wordmark)
```

## Assinaturas de animação

| Momento | Técnica |
| --- | --- |
| Hero | tipografia em destaque, imagem de apoio discreta e acesso direto ao orçamento |
| Produtos | troca de telas (spec entra de cima), unidade encolhe e "derrete" por máscara, blueprint desenha via `stroke-dashoffset` com `pathLength=1` |
| Cobertura | wordmark monoline se desenha dentro da timeline do pin; esfera chega ampliando (yPercent 138→0, scale 2→1); bairros saem varridos por máscara |
| Micro | reveals com `blur(36px)`, hovers com roll de caracteres, botão magnético, acordeão com reveal de mídia |

## Identidade

- Paleta: navy glacial `#0C1826` × gelo `#F2FAFE` com acento frost `#7CC8F0`
- Tipografia: Encode Sans Expanded (display) + Encode Sans Semi Expanded (texto)
- Assets: todos os SVGs foram desenhados para o projeto (unidades, cenas
  técnicas, dial de termostato, wordmark monoline)
