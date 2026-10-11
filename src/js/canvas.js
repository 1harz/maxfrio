/* ============================================================
   MaxFrio: canvas.js
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

/* ------------------------------------------------------------
   ESFERA DE PARTÍCULAS: fibonacci + graticulos + cometas
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
