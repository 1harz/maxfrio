/* ============================================================
   MaxFrio — canvas.js
   Neve do hero e esfera de partículas da cobertura.
   Canvas 2D puro: leve, sem WebGL, pausa fora da viewport.
   ============================================================ */

function fitCanvas(canvas, dprAware = true) {
  const dpr = dprAware ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const r = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.round(r.width * dpr));
  canvas.height = Math.max(1, Math.round(r.height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: r.width, h: r.height };
}

function watchVisibility(el, onHidden, onShown) {
  if (!('IntersectionObserver' in window)) return () => {};
  let visible = true;
  const io = new IntersectionObserver(
    (entries) => {
      const now = entries[0].isIntersecting;
      if (now && !visible) onShown();
      if (!now && visible) onHidden();
      visible = now;
    },
    { threshold: 0.01 }
  );
  io.observe(el);
  return () => io.disconnect();
}

import { climateState } from './core.js';

/* ------------------------------------------------------------
   NEVE & TÚNEL DE AR 3D — partículas de fluxo e cristais
   ------------------------------------------------------------ */
export let airTunnelIntensity = { value: 0 }; // controlado pelo scroll do Hero

export function initSnow(canvas) {
  if (!canvas) return;
  let { ctx, w, h } = fitCanvas(canvas);
  let running = true;
  let raf = 0;

  // 1. Flocos de neve flutuantes
  const N = Math.min(180, Math.round(w / 8));
  const flakes = Array.from({ length: N }, () => {
    const depth = Math.random();
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + depth * 2.4,
      v: 14 + depth * 46,
      drift: Math.random() * Math.PI * 2,
      ds: 0.2 + Math.random() * 0.7,
      a: 0.18 + depth * 0.55,
    };
  });

  // 2. Partículas 3D do túnel de ar (vórtice aerodinâmico)
  const TUNNEL_COUNT = 240;
  const tunnelParticles = Array.from({ length: TUNNEL_COUNT }, () => {
    const angle = Math.random() * Math.PI * 2;
    const rad = 20 + Math.random() * 260;
    return {
      x: Math.cos(angle) * rad,
      y: Math.sin(angle) * rad,
      z: 0.05 + Math.random() * 0.95,
      speed: 0.35 + Math.random() * 0.75,
      trail: [],
      size: 1 + Math.random() * 2.5,
      color: Math.random() > 0.4 ? 'rgba(127, 227, 255, ' : 'rgba(255, 255, 255, ',
    };
  });

  const onResize = () => ({ w, h } = fitCanvas(canvas));
  window.addEventListener('resize', onResize);

  let last = performance.now();
  const tick = (now) => {
    if (!running) return;
    const dt = Math.min(50, now - last) / 1000;
    last = now;
    ctx.clearRect(0, 0, w, h);

    const isAcOn = climateState.isOn;
    const tempMult = isAcOn ? (28 - climateState.temp) / 6 : 0.8; // mais frio = mais rápido
    const tunnelFactor = Math.max(0, Math.min(1, airTunnelIntensity.value));

    // A. Desenha os flocos ambientes (suaves quando normal, energizados quando ar ligado)
    ctx.fillStyle = '#dff2fd';
    for (const f of flakes) {
      const speedMult = 1 + (isAcOn ? 0.6 * tempMult : 0) + tunnelFactor * 2;
      f.drift += f.ds * dt * speedMult;
      f.y += f.v * dt * speedMult;
      f.x += (Math.sin(f.drift) * 12 - f.v * 0.14) * dt * speedMult;
      if (f.y > h + 6) {
        f.y = -6;
        f.x = Math.random() * w;
      }
      if (f.x < -8) f.x = w + 8;
      ctx.globalAlpha = f.a * (1 - tunnelFactor * 0.6); // flocos recuam quando o túnel dispara
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // B. Desenha o túnel 3D de ar e vórtice (dispara no scroll ou quando ar ligado)
    if (tunnelFactor > 0.01 || isAcOn) {
      const activeFactor = Math.max(tunnelFactor, isAcOn ? 0.35 : 0);
      const cx = w / 2;
      const cy = h / 2;
      const fov = Math.min(w, h) * 0.65;

      for (const p of tunnelParticles) {
        p.z -= p.speed * (0.4 + activeFactor * 1.6) * dt;
        if (p.z <= 0.02) {
          p.z = 1.0;
          const angle = Math.random() * Math.PI * 2;
          const rad = 25 + Math.random() * (120 + activeFactor * 220);
          p.x = Math.cos(angle) * rad;
          p.y = Math.sin(angle) * (rad * 0.55); // proporção horizontal do ar-condicionado
          p.trail = [];
        }

        // Projeção perspectiva 3D
        const scale = fov / (p.z * fov + 10);
        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;

        // Armazena rastro de velocidade
        p.trail.unshift({ x: sx, y: sy });
        if (p.trail.length > 6) p.trail.pop();

        if (sx >= -50 && sx <= w + 50 && sy >= -50 && sy <= h + 50) {
          const alpha = (1 - p.z) * activeFactor * 0.85;

          // Desenha rastro de luz aerodinâmico
          if (p.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let i = 1; i < p.trail.length; i++) {
              ctx.lineTo(p.trail[i].x, p.trail[i].y);
            }
            ctx.strokeStyle = `${p.color}${(alpha * 0.6).toFixed(3)})`;
            ctx.lineWidth = Math.max(1, p.size * scale * 0.35);
            ctx.stroke();
          }

          // Ponto de luz frontal
          ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(1, p.size * scale * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  const unwatch = watchVisibility(canvas, stop, start);
  start();

  return () => {
    stop();
    unwatch();
    window.removeEventListener('resize', onResize);
  };
}


/* ------------------------------------------------------------
   ESFERA DE PARTÍCULAS — fibonacci + graticulos + cometas
   ------------------------------------------------------------ */
export function initSphere(canvas) {
  if (!canvas) return;
  let { ctx, w, h } = fitCanvas(canvas);
  let running = true;
  let raf = 0;

  const N = 760;
  const R = () => Math.min(w, h) * 0.42;
  const TILT = -0.32;

  // pontos distribuídos em espiral de fibonacci
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * rad, y, z: Math.sin(theta) * rad });
  }

  // paralelos e meridianos como correntes de pontos
  const rings = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const phi = (lat * Math.PI) / 180;
    const y = Math.sin(phi);
    const rr = Math.cos(phi);
    const seg = [];
    for (let a = 0; a < Math.PI * 2; a += 0.055) seg.push({ x: Math.cos(a) * rr, y, z: Math.sin(a) * rr });
    rings.push(seg);
  }
  for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
    const seg = [];
    for (let a = 0; a < Math.PI * 2; a += 0.05) {
      seg.push({ x: Math.cos(a) * Math.cos(lon), y: Math.sin(a), z: Math.cos(a) * Math.sin(lon) });
    }
    rings.push(seg);
  }

  // cometas: pontos que orbitam com cauda
  const comets = Array.from({ length: 5 }, (_, i) => ({
    speed: 0.24 + i * 0.07,
    phase: Math.random() * Math.PI * 2,
    incl: 0.5 + Math.random() * 1.1,
    trail: [],
  }));

  let rotY = 0;
  let mouseInf = 0;
  let mouseTarget = 0;

  const onMove = (e) => {
    mouseTarget = (e.clientX / window.innerWidth - 0.5) * 0.7;
  };
  window.addEventListener('mousemove', onMove);

  const onResize = () => ({ w, h } = fitCanvas(canvas));
  window.addEventListener('resize', onResize);

  const project = (p) => {
    const cy = Math.cos(rotY),
      sy = Math.sin(rotY);
    const x1 = p.x * cy - p.z * sy;
    const z1 = p.x * sy + p.z * cy;
    const ct = Math.cos(TILT),
      st = Math.sin(TILT);
    const y2 = p.y * ct - z1 * st;
    const z2 = p.y * st + z1 * ct;
    const r = R();
    return { sx: w / 2 + x1 * r, sy: h / 2 + y2 * r, z: z2 };
  };

  let last = performance.now();
  const tick = (now) => {
    if (!running) return;
    const dt = Math.min(50, now - last) / 1000;
    last = now;
    rotY += (0.12 + mouseInf * 0.25) * dt;
    mouseInf += (mouseTarget - mouseInf) * Math.min(1, dt * 2.2);

    ctx.clearRect(0, 0, w, h);

    // graticulos (linhas finas atrás)
    ctx.lineWidth = 1;
    for (const seg of rings) {
      ctx.beginPath();
      let started = false;
      for (const p of seg) {
        const pr = project(p);
        if (pr.z < -0.05) {
          started = false;
          continue;
        }
        if (!started) {
          ctx.moveTo(pr.sx, pr.sy);
          started = true;
        } else {
          ctx.lineTo(pr.sx, pr.sy);
        }
      }
      ctx.strokeStyle = 'rgba(127, 200, 240, 0.10)';
      ctx.stroke();
    }

    // pontos com profundidade
    for (const p of pts) {
      const pr = project(p);
      const depth = (pr.z + 1) / 2; // 0 fundo → 1 frente
      if (depth < 0.06) continue;
      const a = 0.08 + depth * 0.72;
      const size = 0.7 + depth * 1.7;
      ctx.fillStyle = `rgba(168, 221, 249, ${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(pr.sx, pr.sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // cometas com cauda
    for (const c of comets) {
      c.phase += c.speed * dt;
      const a = c.phase;
      const pos = {
        x: Math.cos(a) * Math.cos(c.incl),
        y: Math.sin(a) * 0.55,
        z: Math.sin(a) * Math.cos(c.incl),
      };
      const pr = project(pos);
      c.trail.unshift(pr);
      if (c.trail.length > 26) c.trail.pop();
      for (let i = c.trail.length - 1; i >= 0; i--) {
        const t = c.trail[i];
        const fade = 1 - i / c.trail.length;
        ctx.fillStyle = `rgba(127, 227, 255, ${(fade * 0.65).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(t.sx, t.sy, 0.8 + fade * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  const unwatch = watchVisibility(canvas, stop, start);
  start();

  return () => {
    stop();
    unwatch();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMove);
  };
}
