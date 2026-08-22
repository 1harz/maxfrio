/* ============================================================
   MaxFrio — reveals.js
   Sistema de revelação por blur com suporte total a scroll
   bidirecional (nunca deixa textos invisíveis no scroll reverso).
   ============================================================ */

import { gsap, ScrollTrigger, splitEl, onDesktop, onMobile } from './core.js';

/* Revela um conjunto de alvos com blur — a assinatura visual do site */
export function blurIn(targets, { stagger = 0.06, delay = 0.15, duration = 0.8 } = {}) {
  if (!targets || !targets.length) return;
  gsap.set(targets, { visibility: 'visible' });
  return gsap.fromTo(
    targets,
    { filter: 'blur(28px)', opacity: 0 },
    {
      filter: 'blur(0px)',
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'mf-out',
      overwrite: 'auto',
    }
  );
}

export function blurOut(targets, { stagger = 0.02, duration = 0.5 } = {}) {
  if (!targets || !targets.length) return;
  return gsap.to(targets, {
    filter: 'blur(28px)',
    opacity: 0,
    duration,
    stagger,
    ease: 'mf-in',
    overwrite: 'auto',
  });
}

/* Elementos com data-reveal entram com animação limpa e reversível */
export function initScrollReveals() {
  // Garante que todos os elementos sejam visíveis imediatamente
  document.querySelectorAll('[data-prevent-flicker="true"]').forEach((el) => {
    el.style.visibility = 'visible';
  });

  onDesktop(() => {
    // Linhas
    document.querySelectorAll('[data-reveal="lines"]').forEach((el) => {
      const split = splitEl(el, 'lines');
      gsap.set(el, { visibility: 'visible', opacity: 1 });
      gsap.set(split.lines, { visibility: 'visible' });
      gsap.fromTo(
        split.lines,
        { filter: 'blur(24px)', opacity: 0, y: 18 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'mf-out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Caracteres (títulos de destaque)
    document.querySelectorAll('[data-reveal="chars"]').forEach((el) => {
      const split = splitEl(el, 'words,chars');
      gsap.set(el, { visibility: 'visible', opacity: 1 });
      gsap.fromTo(
        split.chars,
        { filter: 'blur(24px)', opacity: 0, y: 20 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: 'mf-out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Blocos e filhos
    document.querySelectorAll('[data-reveal="children"]').forEach((el) => {
      const children = Array.from(el.children);
      const targets = children.length ? children : [el];
      gsap.set(el, { visibility: 'visible', opacity: 1 });
      gsap.set(targets, { visibility: 'visible' });
      gsap.fromTo(
        targets,
        { filter: 'blur(20px)', opacity: 0, y: 16 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'mf-out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  // Mobile: visibilidade imediata
  onMobile(() => {
    document.querySelectorAll('[data-prevent-flicker="true"]').forEach((el) => {
      gsap.set(el, { visibility: 'visible', opacity: 1, filter: 'blur(0px)' });
    });
  });
}

/* Texto de destaque (highlight scrub progressivo) */
export function initHighlight() {
  onDesktop(() => {
    document.querySelectorAll('[data-highlight]').forEach((el) => {
      const split = splitEl(el, 'words,chars');
      gsap.set(el, { visibility: 'visible', opacity: 1 });
      gsap.fromTo(
        split.chars,
        { opacity: 0.18 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'mf-out',
          stagger: { each: 0.03 },
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
    });
  });

  onMobile(() => {
    document.querySelectorAll('[data-highlight]').forEach((el) => {
      gsap.set(el, { visibility: 'visible', opacity: 1 });
    });
  });
}

/* Parallax vertical de imagens dentro de containers */
export function initParallax() {
  onDesktop(() => {
    document.querySelectorAll('[data-parallax-w]').forEach((wrap) => {
      const img = wrap.querySelector('[data-parallax-img]');
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -15 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        }
      );
    });
  });
}

/* Revelação suave de bloco */
export function initBlockReveal() {
  onDesktop(() => {
    const header = document.querySelector('.header');
    if (!header) return;
    gsap.set(header, { visibility: 'visible' });
    gsap.fromTo(header, { yPercent: -110 }, { yPercent: 0, duration: 1.1, ease: 'mf-out', delay: 0.2 });
  });

  onMobile(() => {
    const header = document.querySelector('.header');
    header && gsap.set(header, { visibility: 'visible', yPercent: 0 });
  });
}

export { ScrollTrigger };

