/* ============================================================
   MaxFrio: site.js
   Orquestrador das cenas e interações do site.
   ============================================================ */

import { initCore } from './core.js';
import { initScrollReveals, initHighlight, initParallax, initBlockReveal } from './reveals.js';
import { initLinkHovers, initCtaHovers, initNavHovers, initMagnetic } from './hovers.js';
import { initTheme, initClock, initLoopingWords, initPopups, initMenu } from './ui.js';
import {
  initRemoteScene,
  initIntroParallax,
  initTechScene,
  initProductsScene,
  initCoverageScene,
  initSlideReveals,
  initFooterCta,
} from './scenes.js';
import { initSphere } from './canvas.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let initialized = false;

function initAll() {
  initBlockReveal();
  initTheme();
  initClock();
  initScrollReveals();
  initHighlight();
  initParallax();
  initRemoteScene();
  initIntroParallax();
  initTechScene();
  initProductsScene();
  initCoverageScene();
  initSlideReveals();
  initFooterCta();
  initLinkHovers();
  initCtaHovers();
  initNavHovers();
  initMagnetic();
  initPopups();
  initMenu();
  initLoopingWords();

  requestAnimationFrame(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });

  document.fonts?.ready.then(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
}


export function initSite() {
  if (initialized) return;
  initialized = true;
  initCore();

  // Inicializa a esfera da seção de cobertura.
  initSphere(document.querySelector('[data-sphere]'));

  initAll();
}
