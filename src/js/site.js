/* ============================================================
   MaxFrio — site.js
   Orquestrador: preloader → tudo inicializa quando a frente
   fria começa a varrer a tela.
   ============================================================ */

import { initCore } from './core.js';
import { initScrollReveals, initHighlight, initParallax, initBlockReveal } from './reveals.js';
import { initLinkHovers, initCtaHovers, initNavHovers, initMagnetic } from './hovers.js';
import { initTheme, initClock, initLoopingWords, initAccordion, initPopups, initMenu } from './ui.js';
import {
  runPreloader,
  initHeroWindowScene,
  initRemoteScene,
  initIntroParallax,
  initTechScene,
  initProductsScene,
  initCoverageScene,
  initSlideReveals,
  initFooterCta,
} from './scenes.js';
import { initSnow, initSphere } from './canvas.js';

function initAll() {
  initHeroWindowScene();
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
  initAccordion();
  initLoopingWords();
}


export function initSite() {
  initCore();

  // canvases rodam desde já (ficam atrás do preloader)
  initSnow(document.querySelector('[data-snow]'));
  initSphere(document.querySelector('[data-sphere]'));

  runPreloader(initAll);
}
