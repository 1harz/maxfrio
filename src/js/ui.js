/* ============================================================
   MaxFrio: ui.js
   Popups, menu mobile, acordeão de benefícios, palavras em
   loop, relógio ao vivo, troca de tema do header e utilidades.
   ============================================================ */

import { gsap, ScrollTrigger, lockScroll, splitEl } from './core.js';
import { blurIn } from './reveals.js';

/* ------------------------------------------------------------
   Tema do header: acompanha o fundo da seção sob a barra
   ------------------------------------------------------------ */
export function initTheme() {
  const header = document.querySelector('.header');
  if (!header) return;

  document.querySelectorAll('[data-bg]').forEach((section) => {
    const light = section.getAttribute('data-bg') === 'light';
    const apply = (isLight) => header.classList.toggle('theme-light', isLight);

    ScrollTrigger.create({
      trigger: section,
      start: 'top 40px',
      end: 'bottom 40px',
      onToggle: (self) => apply(self.isActive ? light : !light),
    });
  });
}

/* ------------------------------------------------------------
   Relógio ao vivo (São Paulo) + ano no rodapé
   ------------------------------------------------------------ */
export function initClock() {
  const els = document.querySelectorAll('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const tick = () => {
    const t = fmt.format(new Date());
    els.forEach((el) => (el.textContent = t));
  };
  tick();
  setInterval(tick, 1000);

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ------------------------------------------------------------
   Palavras em loop (vertical no desktop / horizontal no mobile)
   ------------------------------------------------------------ */
export function initLoopingWords() {
  const list = document.querySelector('[data-loop-words]');
  if (!list) return;
  const items = Array.from(list.children);
  const n = items.length;
  if (n < 8) return;

  const currentCls = 'current';

  const markCurrent = (i) => {
    items.forEach((it) => it.classList.remove(currentCls));
    const item = items[((i % n) + n) % n];
    item && item.classList.add(currentCls);
  };

  const isDesktop = () => window.innerWidth >= 992;

  let idx = 5;
  const stepPct = 100 / n;

  if (isDesktop()) {
    gsap.set(list, { yPercent: -stepPct * idx });
    markCurrent(idx);
    const advance = () => {
      idx += 1;
      markCurrent(idx);
      gsap.to(list, {
        yPercent: -stepPct * idx,
        duration: 0.7,
        ease: 'mf-out',
        onComplete: () => {
          if (idx >= n - 6) {
            list.appendChild(list.children[0]);
            idx -= 1;
            items.push(items.shift());
            gsap.set(list, { yPercent: -stepPct * idx });
          }
        },
      });
    };
    gsap.timeline({ repeat: -1 }).call(advance).to({}, { duration: 1.1 });
  } else {
    let unitW = items[0].getBoundingClientRect().width || 200;
    gsap.set(list, { x: -unitW * idx });
    markCurrent(idx);
    const advance = () => {
      idx += 1;
      markCurrent(idx);
      gsap.to(list, {
        x: -unitW * idx,
        duration: 1,
        ease: 'mf-out',
        onComplete: () => {
          if (idx >= n - 6) {
            list.appendChild(list.children[0]);
            idx -= 1;
            items.push(items.shift());
            unitW = items[0].getBoundingClientRect().width || unitW;
            gsap.set(list, { x: -unitW * idx });
          }
        },
      });
    };
    gsap.timeline({ repeat: -1 }).call(advance).to({}, { duration: 1.4 });
  }
}

/* ------------------------------------------------------------
   Acordeão de benefícios com revelação de mídia
   ------------------------------------------------------------ */
export function initAccordion() {
  const btns = document.querySelectorAll('[data-acc-btn]');
  if (!btns.length) return;

  let zTop = 1;
  let openId = null;

  // todas as mídias começam fora (abaixo da máscara)
  document.querySelectorAll('[data-acc-media]').forEach((m) => gsap.set(m, { yPercent: 100 }));

  const q = (attr, id) => document.querySelector(`[${attr}="${id}"]`);

  const close = (id) => {
    const desc = q('data-acc-desc', id);
    const icon = q('data-acc-icon', id);
    gsap.to(desc, { height: 0, duration: 0.9, ease: 'mf-out' });
    if (icon) gsap.to(icon, { rotate: 0, duration: 0.5, ease: 'mf-inout' });
    if (openId === id) openId = null;
  };

  const open = (id) => {
    const desc = q('data-acc-desc', id);
    const media = q('data-acc-media', id);
    const img = media && media.querySelector('img');
    const icon = q('data-acc-icon', id);
    if (!desc) return;

    gsap.killTweensOf([desc, media, img, icon]);

    if (media) {
      media.style.zIndex = String(++zTop);
      gsap.fromTo(media, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: 'mf-out' });
    }
    if (img) {
      gsap.fromTo(img, { yPercent: -34, scale: 1.5 }, { yPercent: 0, scale: 1, duration: 1, ease: 'mf-out' });
    }
    if (icon) gsap.to(icon, { rotate: 90, duration: 0.5, ease: 'mf-inout' });

    gsap.set(desc, { height: 0, overflow: 'hidden' });
    gsap.to(desc, { height: 'auto', duration: 1, ease: 'mf-out' });

    // parágrafo re-revelado com blur
    const p = desc.querySelector('p');
    if (p) {
      const split = splitEl(p, 'lines');
      gsap.set(p, { visibility: 'visible' });
      gsap.set(split.lines, { visibility: 'visible', filter: 'blur(0px)', opacity: 1 });
      blurIn(split.lines, { stagger: 0.06, delay: 0.15 });
    }
    openId = id;
  };

  btns.forEach((btn) => {
    const id = btn.getAttribute('data-acc-btn');
    btn.addEventListener('click', () => {
      if (openId === id) close(id);
      else {
        if (openId) close(openId);
        open(id);
      }
    });
  });

  // abre o primeiro por padrão
  open(btns[0].getAttribute('data-acc-btn'));
}

/* ------------------------------------------------------------
   Popups (orçamento)
   ------------------------------------------------------------ */
export function initPopups() {
  document.querySelectorAll('[data-pop-open]').forEach((trigger) => {
    const id = trigger.getAttribute('data-pop-open');
    const pop = document.querySelector(`[data-pop="${id}"]`);
    const modal = pop && pop.querySelector('[data-pop-modal]');
    const success = pop && pop.querySelector('[data-pop-success]');
    if (!pop || !modal) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.killTweensOf([modal, success]);
      pop.style.display = 'block';
      gsap.set(modal, { yPercent: 110 });
      gsap.to(modal, { yPercent: 0, duration: 1, ease: 'mf-out' });
      gsap.fromTo(pop.querySelector('.pop_overlay'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'mf-out' });
      lockScroll(true);
    });
  });

  document.querySelectorAll('[data-pop-close]').forEach((closer) => {
    const pop = closer.closest('[data-pop]');
    if (!pop) return;
    const modal = pop.querySelector('[data-pop-modal]');
    const success = pop.querySelector('[data-pop-success]');

    closer.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.killTweensOf([modal, success]);
      gsap.to(modal, { yPercent: 110, duration: 0.9, ease: 'mf-inout', onComplete: () => (pop.style.display = 'none') });
      if (success) gsap.to(success, { y: '110vh', rotate: 3, duration: 0.9, ease: 'mf-in' });
      gsap.to(pop.querySelector('.pop_overlay'), { opacity: 0, duration: 0.6, ease: 'mf-out' });
      lockScroll(false);
      // reseta o estado do formulário para a próxima abertura
      setTimeout(() => {
        const form = pop.querySelector('form');
        const successEl = pop.querySelector('[data-pop-success]');
        if (form) form.style.display = '';
        if (successEl) gsap.set(successEl, { y: '110vh', rotate: 0 });
      }, 950);
    });
  });

  // submit → painel de sucesso
  document.querySelectorAll('[data-pop] form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pop = form.closest('[data-pop]');
      const success = pop.querySelector('[data-pop-success]');
      form.style.display = 'none';
      if (success) {
        gsap.fromTo(success, { y: '110vh', rotate: 0 }, { y: '0vh', rotate: 0, duration: 1, ease: 'mf-out' });
      }
    });
  });

  // botões de envio estilizados disparam o submit real
  document.querySelectorAll('[data-form-btn]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.closest('form') && btn.closest('form').requestSubmit();
    });
  });

  // ESC fecha tudo
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('[data-pop-close-btn]').forEach((b) => b.click());
    document.querySelectorAll('[data-menu-close]').forEach((b) => b.click());
  });
}

/* ------------------------------------------------------------
   Menu mobile
   ------------------------------------------------------------ */
export function initMenu() {
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');
  if (!btn || !menu) return;

  const overlay = menu.querySelector('.menu_overlay');
  const items = Array.from(menu.querySelectorAll('.menu_item'));
  const lines = btn.querySelectorAll('span');
  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    lockScroll(true);
    menu.style.display = 'block';
    gsap.set(items, { xPercent: -40, opacity: 0 });
    gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'mf-out' });
    gsap.to(items, { xPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'mf-out', delay: 0.1 });
    if (lines[0]) gsap.to(lines[0], { rotate: 45, y: 3.5, duration: 0.45, ease: 'mf-inout' });
    if (lines[1]) gsap.to(lines[1], { rotate: -45, y: -3.5, duration: 0.45, ease: 'mf-inout' });
  };

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    gsap.to(items, { xPercent: 0, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'mf-in' });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'mf-in',
      onComplete: () => {
        menu.style.display = 'none';
        lockScroll(false);
      },
    });
    if (lines[0]) gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.45, ease: 'mf-inout' });
    if (lines[1]) gsap.to(lines[1], { rotate: 0, y: 0, duration: 0.45, ease: 'mf-inout' });
  };

  btn.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  menu.querySelectorAll('[data-menu-close]').forEach((el) => el.addEventListener('click', closeMenu));
}
