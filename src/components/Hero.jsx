import { useState, useEffect } from 'react';
import { climateState } from '../js/core.js';

export default function Hero() {
  const [climate, setClimate] = useState({
    isOn: climateState.isOn,
    temp: climateState.temp,
    mode: climateState.mode,
  });

  useEffect(() => {
    const unsub = climateState.subscribe((st) => {
      setClimate({ isOn: st.isOn, temp: st.temp, mode: st.mode });
    });
    return unsub;
  }, []);

  const handlePowerToggle = () => {
    climateState.togglePower();
  };

  return (
    <section id="hero" className="hero-scroll-area" data-hero-track>
      <div className="hero-w" data-hero-stage>
        {/* ── 1. FUNDO CONTÍNUO: O QUARTO CLIMATIZADO (visível pela janela e após o zoom) ── */}
        <div className="hero-w_bg_back" data-hero-room>
          <img
            src="/assets/hero-interior-room.jpg"
            alt="Quarto Climatizado MaxFrio"
            className="hero-room-img"
            loading="eager"
          />

          {/* Brilho e correntes de ar do AC em funcionamento */}
          <div className={`hero-ac-glow ${climate.isOn ? 'is-on' : ''}`} />
          <svg
            className={`hero-air-breeze ${climate.isOn ? 'is-active' : ''}`}
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="breezeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7FE3FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#31B6E4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A8DDF9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 100,70 C 240,130 380,230 640,360 C 760,420 860,470 1000,510"
              fill="none"
              stroke="url(#breezeGrad)"
              strokeWidth="3.5"
              className="breeze-p1"
            />
            <path
              d="M 120,80 C 270,160 400,280 610,410 C 720,470 820,520 960,560"
              fill="none"
              stroke="url(#breezeGrad)"
              strokeWidth="2.2"
              className="breeze-p2"
            />
            <path
              d="M 140,95 C 300,180 440,310 580,430 C 680,490 780,540 920,580"
              fill="none"
              stroke="url(#breezeGrad)"
              strokeWidth="2.8"
              className="breeze-p3"
            />
          </svg>
          <div className="hero-room-vignette" />
        </div>

        {/* ── 2. PAREDE COM 1 JANELA QUADRADA CENTRAL (Mascara a cena e dá zoom no scroll) ── */}
        <div className="hero-w_bg_front" data-hero-window-wall>
          <svg
            className="hero-wall-svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Máscara que cria o recorte transparente da janela quadrada central */}
              <mask id="windowPortalMask">
                <rect width="1920" height="1080" fill="white" />
                <rect x="670" y="160" width="580" height="760" rx="16" fill="black" />
              </mask>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d1826" />
                <stop offset="45%" stopColor="#08101a" />
                <stop offset="100%" stopColor="#04080e" />
              </linearGradient>
              <filter id="windowShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="16" stdDeviation="32" floodColor="#000000" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Parede com o recorte da janela */}
            <rect width="1920" height="1080" fill="url(#wallGrad)" mask="url(#windowPortalMask)" />

            {/* Moldura elegante da janela quadrada com chanfro arquitetônico */}
            <rect
              x="656"
              y="146"
              width="608"
              height="788"
              rx="24"
              fill="none"
              stroke="#1a293b"
              strokeWidth="20"
              filter="url(#windowShadow)"
            />
            <rect
              x="668"
              y="158"
              width="584"
              height="764"
              rx="18"
              fill="none"
              stroke="rgba(127, 227, 255, 0.45)"
              strokeWidth="2.5"
            />
            <rect
              x="670"
              y="160"
              width="580"
              height="760"
              rx="16"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* ── 3. TIPOGRAFIA LATERAL (Estilo Jesko Jets: Separa para os lados no scroll) ── */}
        <div className="hero-s" data-hero-text-grid>
          <div className="container hero-s_inner">
            {/* Grid Superior: Textos à esquerda e direita da janela */}
            <div className="hero-s_top_grid">
              <div className="hero-s_title-l" data-hero-left>
                <div className="hero-eyebrow">MAXFRIO // CLIMATIZAÇÃO</div>
                <h1 className="hero-h1-main">
                  SEU<br />REFÚGIO
                </h1>
                <p className="hero-sub-text">
                  Lá fora, 40° à sombra.
                </p>
              </div>

              <div className="hero-s_title-r" data-hero-right>
                <div className="hero-eyebrow a-right">DESDE 2009</div>
                <h2 className="hero-h1-main a-right">
                  CONTRA O<br />CALOR.
                </h2>
                <p className="hero-sub-text a-right">
                  Aqui dentro, 22° na medida.
                </p>
              </div>
            </div>

            {/* Grid Inferior: CTAs e prompt de rolagem */}
            <div className="hero-s_bot" data-hero-bot>
              <div className="hero-s_bot_left">
                <a href="#orcamento" className="hero-cta-btn" pop-up-open="orcamento">
                  <span>Solicitar Orçamento</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="hero-s_bot_center">
                <div className="hero-scroll-prompt">
                  <div className="scroll-mouse-icon">
                    <div className="scroll-mouse-wheel" />
                  </div>
                  <span className="scroll-prompt-label">ROLE PARA INICIAR A JORNADA</span>
                </div>
              </div>

              <div className="hero-s_bot_right">
                <div className="hero-pill-info">
                  <span className="pill-val">12 MIL+</span>
                  <span className="pill-lbl">INSTALAÇÕES REALIZADAS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. CONTEÚDO REVELADO NO QUARTO (Surge após o zoom pela janela) ── */}
        <div className="hero-room-content" data-hero-room-content>
          <div className="container">
            <div className="hero-room-editorial">
              <div className="room-editorial_top">
                <div className="room-tag-line">
                  <span className="room-tag-dot" />
                  <span>CONFORTO TÉRMICO MAXFRIO</span>
                </div>
                <h2 className="room-lead-title">
                  Lá fora, 40° à sombra.
                  <br />
                  <span className="text-frost">Aqui dentro, 22° na medida.</span>
                </h2>
                <p className="room-lead-desc">
                  Instalação limpa em até 24h, manutenção preventiva de alta precisão e o ar que você sente na primeira respirada.
                </p>
              </div>

              <div className="room-editorial_bottom">
                <div className="room-stats-grid">
                  <div className="room-stat-col">
                    <span className="stat-big">2009</span>
                    <span className="stat-sub">DESDE</span>
                  </div>
                  <div className="room-stat-divider" />
                  <div className="room-stat-col">
                    <span className="stat-big">12 MIL+</span>
                    <span className="stat-sub">INSTALAÇÕES REALIZADAS</span>
                  </div>
                  <div className="room-stat-divider" />
                  <div className="room-stat-col">
                    <span className="stat-big">4,9 / 5</span>
                    <span className="stat-sub">AVALIAÇÃO MÉDIA</span>
                  </div>
                </div>

                <div className="room-actions-wrap">
                  <a href="#orcamento" className="hero-cta-btn" pop-up-open="orcamento">
                    <span>Solicitar Orçamento</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    className={`hero-ac-toggle-btn ${climate.isOn ? 'is-active' : ''}`}
                    onClick={handlePowerToggle}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                    </svg>
                    <span>{climate.isOn ? 'MaxFrio Ligado // 22°C' : 'Ligar Ar Condicionado'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
