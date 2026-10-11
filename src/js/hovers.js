/* ============================================================
   MaxFrio: hovers.js
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

      gsap.set(labels[1], { opacity: 1 });
      gsap.set(b.chars, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(a.chars, { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.01, ease: 'mf-out' }, 0);
      tl.to(b.chars, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.01, ease: 'mf-out' }, 0.03);

      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    });
  });
}

/* botão CTA: rótulo rola + ícone gira suavemente */
export function initCtaHovers() {
  onDesktop(() => {
    document.querySelectorAll('[data-hover="cta"]').forEach((el) => {
      const labels = el.querySelectorAll('[data-hover-text]');
      const icon = el.querySelector('[data-hover-ico]');
      if (labels.length < 2) return;
      const a = splitEl(labels[0], 'words,chars');
      const b = splitEl(labels[1], 'words,chars');
      if (!a.chars || !b.chars || !a.chars.length) return;

      gsap.set(labels[1], { opacity: 1 });
      gsap.set(b.chars, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(a.chars, { yPercent: -110, opacity: 0, duration: 0.45, stagger: 0.008, ease: 'mf-out' }, 0);
      tl.to(b.chars, { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.008, ease: 'mf-out' }, 0.03);
      if (icon) {
        tl.to(icon, { rotate: 90, duration: 0.5, ease: 'power2.out' }, 0);
      }

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

/* efeito magnético desativado */
export function initMagnetic() {
  // Desativado a pedido do usuário: botões mantêm posição estável
}
