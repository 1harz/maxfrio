import { useState, useEffect } from 'react';
import { climateState } from '../js/core.js';

/* ================================================================
   MaxFrio Hero — v3
   Layout: texto (esquerda) | AC visual (direita)
   Interação: botão power que liga/desliga o AC (climateState)
   Transição: slices diagonais estilo Adidas no rodapé
   ================================================================ */

/* Correntes de ar — aparecem só quando ligado */
function FlowStreams({ isOn }) {
  return (
    <svg
      className={`h3-flow ${isOn ? 'is-on' : ''}`}
      viewBox="0 0 900 600"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="fg3" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#7FE3FF" stopOpacity="1" />
          <stop offset="70%" stopColor="#4FA8DC" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#A8DDF9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* correntes saindo do centro da unidade */}
      <path className="h3-fa" stroke="url(#fg3)" d="M450 60 C390 170 310 240 200 300 C120 344 50 410 24 500" />
      <path className="h3-fb" stroke="url(#fg3)" d="M450 60 C460 200 410 330 310 440 C258 492 220 548 206 600" />
      <path className="h3-fa" stroke="url(#fg3)" d="M450 60 C510 170 610 250 730 310 C820 354 880 420 906 510" />
      <path className="h3-fb" stroke="url(#fg3)" d="M450 60 C440 200 490 330 590 440 C648 490 690 550 700 600" />
      <path className="h3-fb" stroke="url(#fg3)" d="M450 60 C375 140 270 190 170 230 C100 258 44 310 20 380" />
      <path className="h3-fa" stroke="url(#fg3)" d="M450 60 C530 120 640 150 760 175 C850 196 904 248 900 318" />
    </svg>
  );
}

/* SVG do aparelho de ar condicionado */
function AcUnit({ isOn, temp }) {
  return (
    <div className={`h3-ac ${isOn ? 'is-on' : 'is-off'}`} aria-label="Unidade MaxFrio Arctic">
      <svg viewBox="0 0 1200 500" fill="none" className="h3-ac-svg">
        <defs>
          <linearGradient id="h3body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.45" stopColor="#F2F9FE" />
            <stop offset="0.8" stopColor="#DDEEF8" />
            <stop offset="1" stopColor="#C2E1F3" />
          </linearGradient>
          <linearGradient id="h3core" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B1A2C" />
            <stop offset="0.5" stopColor="#112340" />
            <stop offset="1" stopColor="#070F1C" />
          </linearGradient>
          <radialGradient id="h3glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7FE3FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#31B6E4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#31B6E4" stopOpacity="0" />
          </radialGradient>
          <filter id="h3shadow" x="-12%" y="-12%" width="124%" height="124%">
            <feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#040C14" floodOpacity="0.5" />
          </filter>
          <clipPath id="h3clip">
            <rect x="60" y="90" width="1080" height="300" rx="48" />
          </clipPath>
        </defs>

        {/* Sombra projetada */}
        <ellipse cx="600" cy="435" rx="440" ry="20" fill="#030810" opacity="0.45" />

        {/* Chassis */}
        <rect x="60" y="90" width="1080" height="300" rx="48"
          fill="url(#h3body)" filter="url(#h3shadow)" stroke="#A5CCE1" strokeWidth="2.5" />

        <g clipPath="url(#h3clip)">
          {/* Reflexo superior */}
          <path d="M60 136 Q600 76 1140 136 V112 Q600 52 60 112 Z" fill="#fff" opacity="0.85" />
          {/* Reflexo lateral */}
          <path d="M200 90 L450 90 L270 390 L60 390 Z" fill="#fff" opacity="0.10" />

          {/* Grade de entrada de ar */}
          <rect x="112" y="106" width="976" height="32" rx="16" fill="#EAF5FC" />
          <path d="M140 122h920" stroke="#B6D8EC" strokeWidth="3" strokeDasharray="3 20" strokeLinecap="round" opacity="0.8" />

          {/* Logo + nome */}
          <g transform="translate(148, 188)" stroke="#7FA9C6" strokeWidth="3.2" strokeLinecap="round" opacity="0.95">
            <path d="M0 -15v30M-13 -7.5l26 15M13 -7.5l-26 15" />
            <path d="M0 -15l-4 4M0 -15l4 4M0 15l-4 -4M0 15l4 -4" />
          </g>
          <text x="176" y="194" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700"
            fill="#416880" letterSpacing="1.6">
            MAXFRIO <tspan fill="#31B6E4" fontSize="13" fontWeight="600">ARCTIC DUAL</tspan>
          </text>

          {/* Display de temperatura */}
          <rect x="972" y="160" width="72" height="40" rx="9" fill="#0C1826" opacity="0.92" />
          {isOn ? (
            <>
              <circle cx="1008" cy="180" r="42" fill="url(#h3glow)" />
              <text x="1008" y="188" textAnchor="middle" fontFamily="Arial, sans-serif"
                fontSize="22" fontWeight="800" fill="#7FE3FF" letterSpacing="1">
                {temp}°
              </text>
              <circle cx="1062" cy="180" r="5.5" fill="#31B6E4" opacity="0.9" />
            </>
          ) : (
            <>
              <text x="1008" y="188" textAnchor="middle" fontFamily="Arial, sans-serif"
                fontSize="18" fontWeight="700" fill="#4A6B80">
                --
              </text>
              <circle cx="1062" cy="180" r="4.5" fill="#3A5670" opacity="0.4" />
            </>
          )}

          {/* Interior escuro — vão de ar */}
          <rect x="80" y="338" width="1040" height="48" rx="8" fill="url(#h3core)" />
          {/* Aletas internas */}
          <g stroke="#31B6E4" strokeWidth="1.5" strokeDasharray="3 6"
            opacity={isOn ? '0.7' : '0.12'}>
            <path d="M100 352h1000M100 368h1000M100 384h1000" />
          </g>
          {/* Turbina (linhas verticais) */}
          <g stroke="#7FE3FF" strokeWidth="1" opacity={isOn ? '0.5' : '0.08'}>
            {Array.from({ length: 34 }).map((_, i) => (
              <line key={i} x1={110 + i * 28} y1="344" x2={110 + i * 28} y2="380" />
            ))}
          </g>
          {/* Brilho glacial quando ligado */}
          {isOn && (
            <rect x="80" y="338" width="1040" height="48" rx="8"
              fill="url(#h3glow)" opacity="0.38" className="h3-glow-anim" />
          )}

          {/* Aleta motorizada (louver) */}
          <g className="h3-louver">
            <rect x="60" y="344" width="1080" height="46" fill="#D8EDF8" />
            <rect x="60" y="344" width="1080" height="9" fill="#fff" opacity="0.62" />
            <g stroke="#A6D4EC" strokeWidth="5.5" strokeLinecap="round">
              <path d="M86 360h1028M86 376h1028M86 390h1028" />
            </g>
            <path d="M60 344h1080" stroke="#A9CEE2" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* Botão de power do AC */
function PowerButton({ isOn, onToggle }) {
  return (
    <button
      className={`h3-power ${isOn ? 'is-on' : ''}`}
      onClick={onToggle}
      aria-label={isOn ? 'Desligar ar condicionado' : 'Ligar ar condicionado'}
    >
      <svg className="h3-power-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M6.3 5.7A8.5 8.5 0 1 0 17.7 5.7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span>{isOn ? 'Desligar' : 'Ligar AC'}</span>
    </button>
  );
}

/* Termômetro interativo — arraste para mudar a temperatura */
function TempBadge({ isOn, temp }) {
  return (
    <div className={`h3-temp-badge ${isOn ? 'is-on' : ''}`} aria-live="polite">
      <span className="h3-temp-val">{isOn ? `${temp}°C` : '--°'}</span>
      <span className="h3-temp-lbl">{isOn ? 'Ambiente' : 'Desligado'}</span>
    </div>
  );
}

export default function Hero() {
  const [climate, setClimate] = useState({
    isOn: climateState.isOn,
    temp: climateState.temp,
    mode: climateState.mode,
  });

  useEffect(() => {
    const unsub = climateState.subscribe((st) =>
      setClimate({ isOn: st.isOn, temp: st.temp, mode: st.mode })
    );
    return unsub;
  }, []);

  /* Toggle do AC via climateState (inclui som de chime) */
  const handlePower = () => {
    climateState.togglePower();
  };

  return (
    <section id="hero" className="h3-section bg-dark" data-bg="dark">

      {/* ── Canvas de neve (inicializado pelo site.js) */}
      <canvas className="h3-snow" data-snow aria-hidden="true" />

      {/* ── Fundo gradiente */}
      <div className="h3-bg" aria-hidden="true" />

      {/* ── Raios de luz cônicos */}
      <div className="h3-rays" aria-hidden="true" />

      {/* ── Lado direito: AC visual (absolutamente posicionado) */}
      <div className="h3-visual" aria-hidden="true">
        <FlowStreams isOn={climate.isOn} />
        <AcUnit isOn={climate.isOn} temp={climate.temp} />
      </div>

      {/* ── Vinheta */}
      <div className="h3-vignette" aria-hidden="true" />

      {/* ── Coluna de conteúdo (esquerda) */}
      <div className="h3-content container">

        {/* Tag técnica */}
        <div className="h3-tag h3-in" style={{ '--d': '0ms' }}>
          <span className="h3-tag-dot" />
          <span>Arctic Core &nbsp;// &nbsp;Dual Inverter</span>
        </div>

        {/* Título */}
        <h1 className="h3-title h3-in" style={{ '--d': '100ms' }}>
          Seu refúgio<br />
          <em>contra o calor.</em>
        </h1>

        {/* Tagline "Lá fora 40°..." */}
        <p className="h3-tagline h3-in" style={{ '--d': '220ms' }}>
          Lá fora, <strong>40° à sombra.</strong> Aqui dentro,{' '}
          <strong>22° na medida</strong> — com instalação limpa,
          manutenção preventiva e o ar que você sente na primeira respirada.
        </p>

        {/* Stats */}
        <div className="h3-stats h3-in" style={{ '--d': '340ms' }}>
          {[
            { value: '2009',    label: 'Fundados em' },
            { value: '12 mil+', label: 'Instalações' },
            { value: '4,9 / 5', label: 'Avaliação média' },
          ].map((s) => (
            <div className="h3-stat" key={s.label}>
              <span className="h3-stat-val">{s.value}</span>
              <span className="h3-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div className="h3-actions h3-in" style={{ '--d': '460ms' }}>
          <a
            href="#orcamento"
            className="h3-btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('[data-popup="quote"]')?.classList.add('is-open');
            }}
          >
            <span>Solicitar orçamento</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Botão de interação com o AC */}
          <PowerButton isOn={climate.isOn} onToggle={handlePower} />

          <TempBadge isOn={climate.isOn} temp={climate.temp} />
        </div>
      </div>

      {/* ── Seta scroll */}
      <div className="h3-scroll-cue" aria-hidden="true">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(168,221,249,0.35)" strokeWidth="1.5" />
          <circle className="h3-scroll-dot" cx="10" cy="9" r="3" fill="rgba(127,200,240,0.8)" />
        </svg>
      </div>

      {/* ── Slices diagonais (transição estilo Adidas) */}
      <div className="h3-slices" aria-hidden="true">
        <div className="h3-slice h3-slice--1" />
        <div className="h3-slice h3-slice--2" />
        <div className="h3-slice h3-slice--3" />
        <div className="h3-slice h3-slice--4" />
      </div>
    </section>
  );
}
