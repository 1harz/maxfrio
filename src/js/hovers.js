/* ============================================================
   MaxFrio — hovers.js
   Micro-interações: roll de caracteres em links, botão CTA,
   itens de navegação e efeito magnético.
   ============================================================ */

import { gsap, splitEl, onDesktop } from './core.js';

/* link comum: texto rola letra a letra */
export function initLinkHovers() {
  onDesktop(() => {
    document.querySelectorAll('[data-hover="link"]').forEach((el) => {
      const labels = el.querySelectorAll('[data-hover-text]');
      if (labels.length < 2) return;
      const a = splitEl(labels[0], 'words,chars');
      const b = splitEl(labels[1], 'words,chars');
      if (!a.chars || !b.chars || !a.chars.length) return;

      gsap.set(b.chars, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(a.chars, { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.01, ease: 'mf-out' }, 0);
      tl.to(b.chars, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.01, ease: 'mf-out' }, 0.03);

      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    });
  });
}

/* botão CTA: rótulo rola + ícone troca em diagonal */
export function initCtaHovers() {
  onDesktop(() => {
    document.querySelectorAll('[data-hover="cta"]').forEach((el) => {
      const labels = el.querySelectorAll('[data-hover-text]');
      const icons = el.querySelectorAll('[data-hover-ico]');
      if (labels.length < 2) return;
      const a = splitEl(labels[0], 'words,chars');
      const b = splitEl(labels[1], 'words,chars');
      if (!a.chars || !b.chars || !a.chars.length) return;

      const [ico1, ico2] = icons;
      gsap.set(b.chars, { yPercent: 110, opacity: 0 });
      if (ico2) gsap.set(ico2, { xPercent: -160, yPercent: 90, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(a.chars, { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.008, ease: 'mf-out' }, 0);
      tl.to(b.chars, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.008, ease: 'mf-out' }, 0.03);
      if (ico1) tl.to(ico1, { xPercent: 160, yPercent: -90, duration: 0.5, ease: 'mf-inout' }, 0);
      if (ico2) tl.to(ico2, { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.5, ease: 'mf-inout' }, 0);

      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    });
  });
}

/* item de nav: texto rola letra a letra (o fundo é :hover em CSS) */
export function initNavHovers() {
  onDesktop(() => {
    document.querySelectorAll('.nav-item').forEach((el) => {
      const labels = el.querySelectorAll('[data-hover-text]');
      if (labels.length < 2) return;

      gsap.set(labels[1], { yPercent: 110 });

      const tl = gsap.timeline({ paused: true });
      tl.to(labels[0], { yPercent: -110, duration: 0.55, ease: 'mf-out' }, 0);
      tl.to(labels[1], { yPercent: 0, duration: 0.55, ease: 'mf-out' }, 0);

      const back = () => {
        gsap.to(tl, { progress: 0, duration: 0.5, ease: 'mf-out', overwrite: true });
      };
      const fwd = () => {
        gsap.to(tl, { progress: 1, duration: 0.6, ease: 'mf-out', overwrite: true });
      };
      el.addEventListener('mouseenter', fwd);
      el.addEventListener('mouseleave', back);
    });
  });
}

/* efeito magnético (botões chamada) */
export function initMagnetic() {
  onDesktop(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.getAttribute('data-magnetic')) || 22;
      const inner = el.querySelector('[data-magnetic-inner]');

      const reset = (instant) => {
        gsap.killTweensOf(el);
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: instant ? 0 : 1.4,
          ease: 'elastic.out(1, 0.3)',
          clearProps: instant ? 'all' : '',
        });
      };

      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          rotate: '0.001deg',
          duration: 1.2,
          ease: 'power4.out',
        });
        if (inner) {
          gsap.to(inner, {
            x: dx * strength * 0.5,
            y: dy * strength * 0.5,
            duration: 1.4,
            ease: 'power4.out',
          });
        }
      });
      el.addEventListener('mouseleave', () => reset(false));
    });
  });
}
