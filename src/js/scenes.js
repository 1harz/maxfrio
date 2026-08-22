/* ============================================================
   MaxFrio — scenes.js
   Coreografias de rolagem: preloader, zoom do hero, parallax
   da intro, transição de produtos com blueprint e cobertura.
   ============================================================ */

import { gsap, lockScroll, onDesktop, onMobile, splitEl } from './core.js';
import { blurIn, blurOut } from './reveals.js';
import { airTunnelIntensity } from './canvas.js';

/* ------------------------------------------------------------
   PRELOADER — CRT mínimo + snowflake explodindo em logo
   ------------------------------------------------------------ */
export function runPreloader(onReveal) {
  const pre = document.querySelector('[data-preloader]');
  if (!pre) {
    onReveal && onReveal();
    return;
  }

  let visited = false;
  try {
    visited = !!sessionStorage.getItem('maxfrio_visited');
    sessionStorage.setItem('maxfrio_visited', 'true');
  } catch (e) {
    /* storage bloqueado */
  }

  const hold = visited ? 0.9 : 2.6;

  lockScroll(true);
  window.scrollTo(0, 0);

  const snowflake = pre.querySelector('.pre-snowflake');
  const wordmark = pre.querySelector('.pre-wordmark');
  const sub = pre.querySelector('.pre-sub');
  const shards = pre.querySelectorAll('.pre-burst__shard');
  const bg = pre.querySelector('[data-preloader-bg]');

  // --- Estado inicial ---
  gsap.set(pre, { autoAlpha: 1 });
  gsap.set(wordmark, { autoAlpha: 0, scale: 0.88, filter: 'blur(12px)' });
  gsap.set(sub, { autoAlpha: 0, y: 8 });
  if (shards.length) gsap.set(shards, { scale: 0, autoAlpha: 0 });

  const tl = gsap.timeline();

  if (!visited) {
    // 0. Snowflake entra girando
    if (snowflake) {
      gsap.set(snowflake, { scale: 0.3, autoAlpha: 0, rotate: -90 });
      tl.to(snowflake, { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.6)' }, 0.1);
    }

    // 1. Partículas explodem para fora (burst)
    if (shards.length) {
      tl.to(
        shards,
        {
          scale: 1,
          autoAlpha: 0.9,
          duration: 0.35,
          stagger: 0.03,
          ease: 'back.out(2)',
        },
        0.55
      );
      tl.to(
        shards,
        {
          scale: 2.8,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.03,
          ease: 'power3.in',
        },
        0.75
      );
    }

    // 2. Snowflake encolhe e vira logo
    if (snowflake) {
      tl.to(snowflake, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0.8);
    }

    // 3. Wordmark emerge do centro com blur
    if (wordmark) {
      tl.to(
        wordmark,
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.95
      );
    }

    // 4. Sub-texto sobe
    if (sub) {
      tl.to(sub, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.15);
    }

    // 5. Logo blur-out antes de sair
    if (wordmark) {
      tl.to(
        wordmark,
        { autoAlpha: 0, scale: 1.05, filter: 'blur(8px)', duration: 0.4, ease: 'power2.in' },
        hold - 0.55
      );
    }
    if (sub) {
      tl.to(sub, { autoAlpha: 0, y: -6, duration: 0.3, ease: 'power2.in' }, hold - 0.5);
    }
  }

  // Cold-wipe sai varrendo de baixo para cima
  if (bg) {
    gsap.fromTo(
      bg,
      { '--mask-size': '100% 200%', '--mask-y': '0%' },
      { '--mask-size': '100% 200%', '--mask-y': '200%', duration: 1.1, delay: hold - 0.55, ease: 'mf-inout' }
    );
  }

  // O site acorda ligeiramente antes do wipe
  setTimeout(() => onReveal && onReveal(), Math.max(0, (hold - 0.5) * 1000));

  gsap.to(pre, {
    autoAlpha: 0,
    duration: 0.6,
    delay: hold + 0.2,
    ease: 'mf-out',
    onComplete: () => {
      pre.style.display = 'none';
      lockScroll(false);
    },
  });
}

/* ------------------------------------------------------------
   HERO — zoom scrub: mergulho pelo vão do ar no túnel 3D
   ------------------------------------------------------------ */
export function initHeroScene() {
  const track = document.querySelector('[data-hero-track]');
  const scene = document.querySelector('[data-hero-scene]');
  const content = document.querySelector('[data-hero-content]');
  const halfL = document.querySelector('[data-hero-half="l"]');
  const halfR = document.querySelector('[data-hero-half="r"]');
  const bot = document.querySelector('[data-hero-bot]');
  const ac = document.querySelector('[data-hero-ac]');
  const louver = document.querySelector('[data-hero-louver]');
  const core = document.querySelector('[data-hero-core]');
  if (!track || !scene || !content) return;

  // Respiração idle do AC
  if (ac) {
    gsap.to(ac, { y: '+=12', duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }

  const applyZoom = (withHalves) => {
    // Garante estado inicial limpo ao entrar de volta
    gsap.set(scene, { scale: 1, yPercent: 0 });
    gsap.set(content, { scale: 1, opacity: 1 });
    if (louver) gsap.set(louver, { yPercent: 0, opacity: 1 });
    if (core) gsap.set(core, { opacity: 0.4 });
    if (bot) gsap.set(bot, { opacity: 1, y: 0 });
    if (halfL) gsap.set(halfL, { x: '0vw', opacity: 1 });
    if (halfR) gsap.set(halfR, { x: '0vw', opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onLeaveBack: () => {
          // reset tudo ao voltar ao topo
          gsap.set(scene, { scale: 1, yPercent: 0 });
          gsap.set(content, { scale: 1, opacity: 1 });
          if (louver) gsap.set(louver, { yPercent: 0, opacity: 1 });
          if (core) gsap.set(core, { opacity: 0.4 });
          if (bot) gsap.set(bot, { opacity: 1, y: 0 });
          if (halfL) gsap.set(halfL, { x: '0vw', opacity: 1 });
          if (halfR) gsap.set(halfR, { x: '0vw', opacity: 1 });
          airTunnelIntensity.value = 0;
        },
      },
    });

    if (louver) {
      tl.fromTo(louver, { yPercent: 0, opacity: 1 }, { yPercent: 42, opacity: 0.75, ease: 'none', duration: 0.45 }, 0.05);
    }
    if (core) {
      tl.fromTo(core, { opacity: 0.4 }, { opacity: 1, ease: 'none', duration: 0.4 }, 0.1);
    }

    tl.to(airTunnelIntensity, { value: 1, ease: 'none', duration: 0.7 }, 0.15);
    tl.fromTo(scene, { scale: 1, yPercent: 0 }, { scale: 8.8, yPercent: 14, ease: 'none', duration: 1 }, 0);
    tl.fromTo(content, { scale: 1, opacity: 1 }, { scale: 6.5, opacity: 0.15, ease: 'none', duration: 0.8 }, 0);

    if (withHalves && halfL && halfR) {
      tl.fromTo(halfL, { x: '0vw', opacity: 1 }, { x: '-52vw', opacity: 0, ease: 'none', duration: 0.75 }, 0);
      tl.fromTo(halfR, { x: '0vw', opacity: 1 }, { x: '52vw', opacity: 0, ease: 'none', duration: 0.75 }, 0);
    }
    if (bot) {
      tl.fromTo(bot, { opacity: 1, y: 0 }, { opacity: 0, y: -24, ease: 'none', duration: 0.25 }, 0.02);
    }
  };

  onDesktop(() => applyZoom(true));
  onMobile(() => applyZoom(false));

  onDesktop(() => {
    const logo = document.querySelector('.header_logo');
    if (!logo) return;
    gsap.set(logo, { y: '40vh', scale: 1.2 });
    gsap.to(logo, {
      y: '0vh',
      scale: 1,
      ease: 'mf-ease',
      scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  });

  const dial = document.querySelector('[data-hero-dial]');
  if (dial) {
    gsap.set(dial, { scale: 1.6, opacity: 0, rotate: -24 });
    gsap.to(dial, { scale: 1, opacity: 0.5, rotate: 0, duration: 1.6, ease: 'mf-out', delay: 0.35 });
  }
}

/* ------------------------------------------------------------
   CONTROLE REMOTO — entra da direita, sai para a esquerda
   ------------------------------------------------------------ */
export function initRemoteScene() {
  const section = document.querySelector('[data-remote-section]');
  const copy = document.querySelector('[data-remote-copy]');
  const device = document.querySelector('[data-remote-device]');
  if (!section) return;

  onDesktop(() => {
    // Reset inicial: cópia fora à esquerda, device fora à direita
    if (copy) gsap.set(copy, { xPercent: -30, opacity: 0 });
    if (device) gsap.set(device, { xPercent: 40, opacity: 0, rotateY: 22, rotateX: 8 });

    // Entrada via ScrollTrigger
    gsap.to(copy, {
      xPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 30%',
        scrub: 0.6,
      },
    });

    gsap.to(device, {
      xPercent: 0,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 20%',
        scrub: 0.8,
      },
    });

    // Saída: desliza para a esquerda quando a seção realmente sai de tela
    gsap.to([copy, device].filter(Boolean), {
      xPercent: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'bottom 20%',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  });
}

/* ------------------------------------------------------------
   ENGENHARIA — scroll horizontal (Jesko Style)
   ------------------------------------------------------------ */
export function initTechScene() {
  const track = document.querySelector('[data-tech-track]');
  const strip = document.querySelector('[data-tech-strip]');
  const progress = document.querySelector('[data-tech-progress]');
  if (!track || !strip) return;

  onDesktop(() => {
    const totalDist = () => Math.max(0, strip.scrollWidth - window.innerWidth + 120);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(strip, { x: () => -totalDist(), ease: 'none' }, 0);

    if (progress) {
      tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
    }
  });
}

/* ------------------------------------------------------------
   INTRO — parallax sutil
   ------------------------------------------------------------ */
export function initIntroParallax() {
  onDesktop(() => {
    const inner = document.querySelector('[data-intro-inner]');
    if (!inner) return;
    gsap.fromTo(
      inner,
      { y: '0vh' },
      {
        y: '-10vh',
        ease: 'none',
        scrollTrigger: { trigger: inner, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      }
    );
  });
}

/* ------------------------------------------------------------
   PRODUTOS — transição contínua sem tela branca
   ------------------------------------------------------------ */
export function initProductsScene() {
  const track = document.querySelector('[data-prod-track]');
  if (!track) return;

  onDesktop(() => {
    const light = track.querySelector('[data-prod-light]');
    const heroScreen = track.querySelector('.prod-screen--hero');
    const specScreen = track.querySelector('.prod-screen--spec');
    const unit = track.querySelector('[data-prod-unit]');
    const blueprint = document.querySelector('[data-blueprint]');

    if (specScreen) gsap.set(specScreen, { yPercent: 30, opacity: 0 });
    // FIXA: a unidade deve chegar a opacity 0 completamente
    if (unit) gsap.set(unit, { scale: 1, yPercent: 0, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: true },
    });

    if (light) {
      tl.fromTo(light, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.4 }, 0);
    }
    if (heroScreen) {
      tl.to(heroScreen, { yPercent: -30, opacity: 0, ease: 'none', duration: 0.38 }, 0.22);
    }
    // A unidade some por completo (opacity: 0, não 0.18)
    if (unit) {
      tl.fromTo(
        unit,
        { scale: 1, yPercent: 0, opacity: 1 },
        { scale: 0.45, yPercent: -12, opacity: 0, ease: 'mf-in', duration: 0.45 },
        0.18
      );
    }
    if (specScreen) {
      tl.to(specScreen, { yPercent: 0, opacity: 1, ease: 'none', duration: 0.42 }, 0.28);
    }
    if (blueprint) {
      const paths = blueprint.querySelectorAll('path, ellipse, rect, circle');
      gsap.set(paths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
      tl.to(
        paths,
        { strokeDashoffset: 0, ease: 'none', stagger: { each: 0.015, from: 'start' }, duration: 0.4 },
        0.35
      );
    }
  });

  onMobile(() => {
    const specScreen = document.querySelector('.prod-screen--spec');
    if (specScreen) gsap.set(specScreen, { yPercent: 0, opacity: 1 });
    const blueprint = document.querySelector('[data-blueprint]');
    if (!blueprint) return;
    const paths = blueprint.querySelectorAll('path, ellipse, rect, circle');
    gsap.set(paths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
    gsap.to(paths, {
      strokeDashoffset: 0,
      ease: 'none',
      stagger: 0.03,
      scrollTrigger: { trigger: blueprint, start: 'top 85%', end: 'bottom 55%', scrub: true },
    });
  });
}

/* ------------------------------------------------------------
   COBERTURA — wordmark sobe, esfera, bairros saem
   ------------------------------------------------------------ */
export function initCoverageScene() {
  const track = document.querySelector('[data-cov-track]');
  if (!track) return;

  const letters = document.querySelectorAll('[data-wordmark-svg] .wm-letter');
  if (letters.length) {
    gsap.set(letters, { strokeDasharray: '1 1', strokeDashoffset: 1 });
  }

  onDesktop(() => {
    const title = track.querySelector('[data-cov-title]');
    const sphere = track.querySelector('[data-cov-sphere]');
    const cities = track.querySelector('[data-cov-cities]');
    const citiesLoop = track.querySelector('[data-cov-mask]');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: true },
    });

    if (title) tl.fromTo(title, { y: '34em' }, { y: '0em', ease: 'none', duration: 1 }, 0);
    if (sphere) tl.fromTo(sphere, { yPercent: 138, scale: 2 }, { yPercent: 0, scale: 1, ease: 'none', duration: 1 }, 0);
    if (cities) tl.fromTo(cities, { yPercent: -34 }, { yPercent: 0, ease: 'none', duration: 0.4 }, 0);

    if (letters.length) {
      tl.to(
        letters,
        { strokeDashoffset: 0, ease: 'none', stagger: { each: 0.035 }, duration: 0.42 },
        0.16
      );
    }

    if (citiesLoop) {
      tl.to(citiesLoop, { '--mask-size': '100% 0%', ease: 'none', duration: 0.3 }, 0.72);
    }
  });

  onMobile(() => {
    const wm = document.querySelector('[data-wordmark-svg]');
    if (!wm || !letters.length) return;
    gsap.to(letters, {
      strokeDashoffset: 0,
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: wm, start: 'top 92%', end: 'top 45%', scrub: true },
    });
  });
}

/* ------------------------------------------------------------
   PARALLAX LATERAL — seções deslizam para o lado no scroll
   (aplicado onde data-slide-reveal existe)
   ------------------------------------------------------------ */
export function initSlideReveals() {
  // Painéis que entram da direita (como Anatomia→Frio)
  const panels = document.querySelectorAll('[data-slide-in="right"]');
  panels.forEach((el) => {
    onDesktop(() => {
      gsap.fromTo(
        el,
        { xPercent: 18, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: 0.8 },
        }
      );
    });
  });

  // Painéis que entram da esquerda
  const panelsL = document.querySelectorAll('[data-slide-in="left"]');
  panelsL.forEach((el) => {
    onDesktop(() => {
      gsap.fromTo(
        el,
        { xPercent: -18, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: 0.8 },
        }
      );
    });
  });

  // Painéis que escalam do centro (estilo Anatomia)
  const panelsScale = document.querySelectorAll('[data-scale-reveal]');
  panelsScale.forEach((el) => {
    onDesktop(() => {
      gsap.fromTo(
        el,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 40%', scrub: 0.9 },
        }
      );
    });
  });

  // Cortina lateral que vem do lado
  const sideCurtains = document.querySelectorAll('[data-curtain="side"]');
  sideCurtains.forEach((el) => {
    onDesktop(() => {
      gsap.fromTo(
        el,
        { xPercent: -100 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top 90%', end: 'top 15%', scrub: 0.8 },
        }
      );
    });
  });

  // Cortina superior que vem de cima
  const topCurtains = document.querySelectorAll('[data-curtain="top"]');
  topCurtains.forEach((el) => {
    onDesktop(() => {
      gsap.fromTo(
        el,
        { yPercent: -100 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top 90%', end: 'top 15%', scrub: 0.8 },
        }
      );
    });
  });

  // Fundo que se desloca em direção oposta (parallax invertido)
  const bgLayers = document.querySelectorAll('[data-parallax-bg]');
  bgLayers.forEach((el) => {
    const dir = el.dataset.parallaxBg || 'y';
    onDesktop(() => {
      const from = dir === 'x' ? { xPercent: -6 } : { yPercent: -12 };
      const to = dir === 'x' ? { xPercent: 6 } : { yPercent: 12 };
      gsap.fromTo(el, from, {
        ...to,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    });
  });
}

/* ------------------------------------------------------------
   FOOTER — CTA sobe flutuando
   ------------------------------------------------------------ */
export function initFooterCta() {
  onDesktop(() => {
    const cta = document.querySelector('[data-foot-cta]');
    const zone = document.querySelector('[data-foot-zone]');
    if (!cta || !zone) return;
    gsap.fromTo(
      cta,
      { y: '15em' },
      {
        y: '0em',
        ease: 'none',
        scrollTrigger: { trigger: zone, start: 'top bottom', end: 'bottom bottom', scrub: true },
      }
    );
  });
}
