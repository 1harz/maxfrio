import { useState, useEffect, useRef, useCallback } from 'react';
import { climateState } from '../js/core.js';

/* Bottom Blur Transition */
function BottomBlurTransition() {
  return (
    <div className="section-bottom-blur" aria-hidden="true">
      <div className="blur-step blur-step-1" />
      <div className="blur-step blur-step-2" />
      <div className="blur-step blur-step-3" />
      <div className="blur-gradient-fill" />
    </div>
  );
}

/* Wind canvas that fires when AC is activated */
function WindCanvas({ active }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ active: false, raf: 0, running: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fit = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    // streaks
    const N = 60;
    const streaks = Array.from({ length: N }, () => makeStreak(W(), H()));

    function makeStreak(w, h) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        len: 40 + Math.random() * 120,
        speed: 180 + Math.random() * 280,
        a: 0.05 + Math.random() * 0.18,
        active: false,
      };
    }

    let intensity = 0;
    let last = performance.now();

    const tick = (now) => {
      if (!stateRef.current.running) return;
      const dt = Math.min(40, now - last) / 1000;
      last = now;

      const target = stateRef.current.active ? 1 : 0;
      intensity += (target - intensity) * Math.min(1, dt * 2.5);

      const ctx = canvas.getContext('2d');
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      if (intensity < 0.02) {
        stateRef.current.raf = requestAnimationFrame(tick);
        return;
      }

      for (const s of streaks) {
        s.x -= s.speed * dt * intensity;
        if (s.x + s.len < 0) {
          s.x = w + s.len;
          s.y = Math.random() * h;
          s.len = 40 + Math.random() * 120;
          s.speed = 180 + Math.random() * 280;
          s.a = 0.05 + Math.random() * 0.18;
        }
        const alpha = s.a * intensity;
        const grad = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        grad.addColorStop(0, `rgba(127,227,255,0)`);
        grad.addColorStop(0.6, `rgba(127,227,255,${alpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(200,240,255,0)`);
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + Math.random() * 1.2;
        ctx.stroke();
      }

      stateRef.current.raf = requestAnimationFrame(tick);
    };

    stateRef.current.running = true;
    stateRef.current.raf = requestAnimationFrame(tick);

    const onResize = fit;
    window.addEventListener('resize', onResize);

    return () => {
      stateRef.current.running = false;
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    stateRef.current.active = active;
  }, [active]);

  return <canvas ref={canvasRef} className="remote-wind-canvas" aria-hidden="true" />;
}

/* IR Beam SVG fired toward the evaporator */
function IrBeam({ firing }) {
  return (
    <svg
      className={`remote-ir-beam ${firing ? 'is-firing' : ''}`}
      viewBox="0 0 220 80"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="irGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7FE3FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7FE3FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M10 40 Q80 20 220 8" stroke="url(#irGrad)" strokeWidth="1.5" strokeDasharray="4 6" />
      <path d="M10 40 Q80 40 220 38" stroke="url(#irGrad)" strokeWidth="2" />
      <path d="M10 40 Q80 60 220 72" stroke="url(#irGrad)" strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="10" cy="40" r="5" fill="#7FE3FF" opacity="0.8" />
    </svg>
  );
}

export default function RemoteControl() {
  const [climate, setClimate] = useState({
    isOn: climateState.isOn,
    temp: climateState.temp,
    mode: climateState.mode,
  });
  const [firing, setFiring] = useState(false);

  useEffect(() => {
    const unsub = climateState.subscribe((st) => {
      setClimate({ isOn: st.isOn, temp: st.temp, mode: st.mode });
    });
    return unsub;
  }, []);

  const handlePowerClick = useCallback(() => {
    const nextOn = !climate.isOn;
    climateState.togglePower();

    if (nextOn) {
      setFiring(true);
      setTimeout(() => setFiring(false), 1400);
    }
  }, [climate.isOn]);

  return (
    <section
      className="remote-section section bg-dark"
      id="ativacao"
      data-remote-section
      style={{ zIndex: 10, position: 'relative' }}
    >
      {/* Wind layer: full section */}
      <WindCanvas active={climate.isOn} />

      <div className="container remote-layout">
        {/* Left: copy */}
        <div className="remote-copy" data-remote-copy>
          <div className="l1 font-mono text-frost">[ CONTROLE DE TEMPERATURA ]</div>
          <h2 className="h3 remote-copy__title">
            Ajuste o conforto<br />
            <span className="text-frost">do seu ambiente</span>
          </h2>
          <p className="p7 text-dim" style={{ maxWidth: '44ch' }}>
            Ajuste a temperatura e visualize como pequenos cuidados de uso ajudam a manter
            o conforto do ambiente. Para falhas ou baixo rendimento, conte com avaliação técnica.
          </p>
          <div className="remote-status-badge font-mono" style={{ marginTop: '24px' }}>
            <span className={`status-indicator ${climate.isOn ? 'is-online' : 'is-standby'}`} />
            <span>STATUS: {climate.isOn ? `ONLINE // ${climate.temp}°C` : 'STANDBY // TOQUE PARA LIGAR'}</span>
          </div>
        </div>

        {/* Center: IR beam from remote → evaporator */}
        <div className="remote-bridge" aria-hidden="true">
          <IrBeam firing={firing} />
        </div>

        {/* Right: 3-D remote + mini evaporator */}
        <div className="remote-scene" data-remote-scene-inner>
          {/* Mini evaporator target */}
          <div className={`remote-evap ${climate.isOn ? 'is-on' : ''}`} aria-hidden="true">
            <div className="evap-body">
              <div className="evap-grill" />
              <div className={`evap-led ${climate.isOn ? 'is-on' : ''}`} />
              <div className="evap-louver" />
            </div>
            <div className="evap-flow-lines">
              {[0, 1, 2, 3].map(i => (
                <span key={i} className="evap-flow-line" style={{ '--li': i }} />
              ))}
            </div>
            <div className="evap-label font-mono">MAXFRIO · AR-CONDICIONADO</div>
          </div>

          {/* 3-D Remote control body */}
          <div
            className={`remote-3d ${climate.isOn ? 'is-on' : ''}`}
            data-remote-device
          >
            {/* IR emitter nose */}
            <div className="r3d-nose">
              <div className="r3d-ir-dot" />
            </div>

            {/* OLED screen */}
            <div className="r3d-screen">
              <div className="r3d-screen__header font-mono">
                <span>{climate.isOn ? (climate.mode === 'turbo' ? 'TURBO' : climate.mode === 'eco' ? 'ECO' : 'FRIO') : 'STANDBY'}</span>
                <span className={`r3d-sig ${climate.isOn ? 'is-on' : ''}`} aria-hidden="true" />
              </div>
              <div className="r3d-screen__main font-display">
                {climate.isOn
                  ? <><span className="r3d-temp">{climate.temp}</span><span className="r3d-unit">°C</span></>
                  : <span className="r3d-off">- - -</span>
                }
              </div>
              <div className="r3d-screen__bars">
                {[0, 1, 2].map(i => (
                  <span key={i} className={`r3d-bar ${climate.isOn && (i < 2 || climate.mode === 'turbo') ? 'is-on' : ''}`} />
                ))}
              </div>
            </div>

            {/* Power button */}
            <div className="r3d-power-row">
              <button
                type="button"
                className={`r3d-power-btn ${!climate.isOn ? 'r3d-power-btn--standby' : 'r3d-power-btn--on'} ${firing ? 'r3d-power-btn--firing' : ''}`}
                onClick={handlePowerClick}
                aria-label={climate.isOn ? 'Desligar ar-condicionado' : 'Ligar ar-condicionado'}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" />
                </svg>
              </button>
              <span className="r3d-power-label font-mono">{climate.isOn ? 'DESLIGAR' : 'LIGAR'}</span>
            </div>

            {/* Temp & mode buttons */}
            <div className="r3d-temp-row">
              <button
                type="button"
                className="r3d-adj-btn"
                onClick={() => climateState.setTemp(climate.temp + 1)}
                disabled={!climate.isOn || climate.temp >= 26}
                aria-label="Aumentar temperatura"
              >+</button>
              <span className="r3d-temp-disp font-mono">{climate.temp}°</span>
              <button
                type="button"
                className="r3d-adj-btn"
                onClick={() => climateState.setTemp(climate.temp - 1)}
                disabled={!climate.isOn || climate.temp <= 16}
                aria-label="Diminuir temperatura"
              >-</button>
            </div>

            <div className="r3d-mode-row font-mono">
              {['cool', 'turbo', 'eco'].map(m => (
                <button
                  key={m}
                  type="button"
                  className={`r3d-mode-btn ${climate.mode === m && climate.isOn ? 'is-active' : ''}`}
                  onClick={() => climateState.setMode(m)}
                  disabled={!climate.isOn}
                  aria-label={m === 'cool' ? 'Modo frio' : m === 'turbo' ? 'Modo turbo' : 'Modo econômico'}
                >
                  {m === 'cool' ? 'FRIO' : m === 'turbo' ? 'TURBO' : 'ECO'}
                </button>
              ))}
            </div>

            {/* Decorative ribs on the sides */}
            <div className="r3d-rib r3d-rib--l" aria-hidden="true" />
            <div className="r3d-rib r3d-rib--r" aria-hidden="true" />
          </div>
        </div>
      </div>
      
      {/* Transição de blur suave para a próxima seção */}
      <BottomBlurTransition />
    </section>
  );
}
