/* ============================================================
   MaxFrio: scenes.js
   Coreografias de rolagem: parallax da intro, transição de
   produtos com blueprint e cobertura.
   ============================================================ */

import { gsap, onDesktop, onMobile } from './core.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ------------------------------------------------------------
   CONTROLE REMOTO: entra da direita, sai para a esquerda
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
   ENGENHARIA: scroll horizontal (Jesko Style)
   ------------------------------------------------------------ */
export function initTechScene() {
  const track = document.querySelector('[data-tech-track]');
  const strip = document.querySelector('[data-tech-strip]');
  const progress = document.querySelector('[data-tech-progress]');
  if (!track || !strip) return;

  const wrap = track.querySelector('.tech-horizontal-wrap');
  const previous = track.querySelector('[data-tech-prev]');
  const next = track.querySelector('[data-tech-next]');
  const nativeScroll = window.matchMedia('(max-width: 991px), (max-height: 559px)');

  if (wrap) {
    const updateControls = () => {
      const max = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
      if (previous) previous.disabled = wrap.scrollLeft <= 2;
      if (next) next.disabled = wrap.scrollLeft >= max - 2;
    };

    const syncScrollMode = () => {
      wrap.toggleAttribute('data-lenis-prevent', nativeScroll.matches);
      if (!nativeScroll.matches) wrap.scrollLeft = 0;
      requestAnimationFrame(updateControls);
    };

    wrap.addEventListener('wheel', (event) => {
      if (!nativeScroll.matches || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const max = wrap.scrollWidth - wrap.clientWidth;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? wrap.clientWidth : 1);
      const canMove = delta > 0 ? wrap.scrollLeft < max - 2 : wrap.scrollLeft > 2;
      if (!canMove) return;
      event.preventDefault();
      event.stopPropagation();
      wrap.scrollLeft += delta;
    }, { passive: false, capture: true });

    const step = () => Math.max(280, wrap.clientWidth * 0.72);
    previous?.addEventListener('click', () => wrap.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => wrap.scrollBy({ left: step(), behavior: 'smooth' }));
    wrap.addEventListener('scroll', updateControls, { passive: true });
    nativeScroll.addEventListener('change', syncScrollMode);
    window.addEventListener('resize', updateControls);
    syncScrollMode();
  }

  const media = gsap.matchMedia();
  media.add('(min-width: 992px) and (min-height: 560px)', () => {
    const totalDist = () => Math.max(0, strip.scrollWidth - window.innerWidth);

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
   INTRO: parallax sutil
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
   PRODUTOS: transição contínua sem tela branca
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
   COBERTURA: wordmark sobe, esfera, bairros saem
   ------------------------------------------------------------ */
export function initCoverageScene() {
  const track = document.querySelector('[data-cov-track]');
  if (!track) return;

  const letters = document.querySelectorAll('[data-wordmark-svg] .wm-letter');

  onDesktop(() => {
    const title = track.querySelector('[data-cov-title]');
    const sphere = track.querySelector('[data-cov-sphere]');
    const cities = track.querySelector('[data-cov-cities]');
    const citiesLoop = track.querySelector('[data-cov-mask]');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: true },
    });

    if (title) tl.fromTo(title, { y: '30em', scale: 0.88, opacity: 0.2 }, { y: '0em', scale: 1, opacity: 1, ease: 'none', duration: 1 }, 0);
    if (sphere) tl.fromTo(sphere, { yPercent: 138, scale: 2 }, { yPercent: 0, scale: 1, ease: 'none', duration: 1 }, 0);
    if (cities) tl.fromTo(cities, { yPercent: -34 }, { yPercent: 0, ease: 'none', duration: 0.4 }, 0);

    if (letters.length) {
      tl.fromTo(
        letters,
        { opacity: 0.2, y: 24 },
        { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.04 }, duration: 0.5 },
        0.15
      );
    }

    if (citiesLoop) {
      tl.to(citiesLoop, { '--mask-size': '100% 0%', ease: 'none', duration: 0.3 }, 0.72);
    }
  });

  onMobile(() => {
    const wm = document.querySelector('[data-wordmark-svg]');
    if (!wm) return;
    gsap.fromTo(
      wm,
      { opacity: 0.3, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: wm, start: 'top 92%', end: 'top 45%', scrub: true },
      }
    );
  });
}

/* ------------------------------------------------------------
   PARALLAX LATERAL: seções deslizam para o lado no scroll
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
   FOOTER: CTA sobe flutuando
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

