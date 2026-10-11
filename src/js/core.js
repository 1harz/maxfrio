/* ============================================================
   MaxFrio: core.js
   Lenis + GSAP + eases + utilidades compartilhadas.
   ============================================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

export const BREAKPOINT = 992;

export let lenis = null;

export function initCore() {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

  CustomEase.create('mf-inout', '0.76,0,0.24,1');
  CustomEase.create('mf-out', '0.25,1,0.5,1');
  CustomEase.create('mf-in', '0.5,0,0.75,0');
  CustomEase.create('mf-ease', '0.25,0.1,0.25,1');

  window.scrollTo(0, 0);

  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // âncoras suaves
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // âncoras funcionam mesmo com o scroll travado (ex.: menu aberto)
      if (lenis.isStopped) {
        lenis.start();
        document.body.style.overflow = '';
        document.body.removeAttribute('data-lenis-prevent');
      }
      lenis.scrollTo(target, { duration: 1.6 });
    });
  });

  // debounce de resize → refresh
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 120);
  });
}

export function lockScroll(lock) {
  if (lock) {
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-lenis-prevent', '');
    lenis && lenis.stop();
  } else {
    document.body.style.overflow = '';
    document.body.removeAttribute('data-lenis-prevent');
    lenis && lenis.start();
  }
}

/* utilitário: isolar animações por breakpoint */
export function onDesktop(cb) {
  const mm = gsap.matchMedia();
  mm.add(`(min-width: ${BREAKPOINT}px)`, cb);
  return mm;
}

export function onMobile(cb) {
  const mm = gsap.matchMedia();
  mm.add(`(max-width: ${BREAKPOINT - 1}px)`, cb);
  return mm;
}

/* repete o SplitText preservando <br> */
export function splitEl(el, type) {
  if (el.__mfSplit) return el.__mfSplit;
  el.innerHTML = el.innerHTML.replace(/(<br\s*\/?>\s*){2}/g, '$1&zwnj;$1');
  const split = new SplitText(el, {
    type,
    linesClass: 'line',
    wordsClass: 'word',
    charsClass: 'char',
  });
  gsap.utils.toArray(split.words || []).forEach((w) => {
    w.style.display = 'inline-block';
    w.style.whiteSpace = 'nowrap';
  });
  el.__mfSplit = split;
  return split;
}

/* ============================================================
   Áudio sintético Web Audio API (sem arquivos externos)
   ============================================================ */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playAcChime(type = 'on') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'on') {
      // Bip duplo alegre característico de ligar o ar-condicionado
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.5, now); // C6
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2093.0, now + 0.08); // C7
      gain2.gain.setValueAtTime(0.15, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.3);
    } else if (type === 'off') {
      // Tom descendente de desligar
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760.0, now);
      osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'temp') {
      // Bip rápido de ajuste de temperatura
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760.0, now); // A6
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'mode') {
      // Triplo chirp de modo
      [1318.5, 1567.98, 2093.0].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.08, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.09);
      });
    }
  } catch (e) {
    /* áudio bloqueado pelo navegador antes de interação do usuário */
  }
}

/* ============================================================
   Estado de Climatização Global (Reativo)
   ============================================================ */
export const climateState = {
  isOn: false,
  temp: 22,
  mode: 'turbo', // 'cool', 'turbo', 'eco'
  listeners: new Set(),

  subscribe(fn) {
    this.listeners.add(fn);
    fn(this);
    return () => this.listeners.delete(fn);
  },

  togglePower() {
    this.isOn = !this.isOn;
    playAcChime(this.isOn ? 'on' : 'off');
    this.notify();
  },

  setPower(on) {
    if (this.isOn !== on) {
      this.isOn = on;
      playAcChime(on ? 'on' : 'off');
      this.notify();
    }
  },

  setTemp(t) {
    const clamped = Math.max(16, Math.min(26, Math.round(t)));
    if (this.temp !== clamped) {
      this.temp = clamped;
      if (this.isOn) playAcChime('temp');
      this.notify();
    }
  },

  setMode(m) {
    if (this.mode !== m) {
      this.mode = m;
      if (this.isOn) playAcChime('mode');
      this.notify();
    }
  },

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this);
      } catch (err) {
        console.error(err);
      }
    });
  },
};

export { gsap, ScrollTrigger, SplitText };

