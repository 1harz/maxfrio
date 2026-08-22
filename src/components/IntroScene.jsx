import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Fontes locais */
const FONT_BOLD = '/fonts/EncodeSansExpanded-800.ttf';
const FONT_SEMI = '/fonts/EncodeSansExpanded-600.ttf';

/* 5 Frases oficiais MaxFrio perfeitamente distribuídas a cada 72° nos 360° */
const PHRASES = [
  { label: '22° NA MEDIDA', angle: 0, y: -0.16, size: 0.056, bold: true, color: '#f2fafe' },
  { label: 'INSTALAÇÃO LIMPA', angle: 72, y: 0.16, size: 0.048, bold: false, color: '#7cc8f0' },
  { label: 'MANUTENÇÃO PREVENTIVA', angle: 144, y: -0.16, size: 0.044, bold: false, color: '#a8ddf9' },
  { label: 'O AR QUE VOCÊ SENTE', angle: 216, y: 0.16, size: 0.048, bold: false, color: '#85b8dd' },
  { label: '40° LÁ FORA', angle: 288, y: 0.16, size: 0.054, bold: true, color: '#a8ddf9' },
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width:${breakpoint}px)`).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
}

/* Largura aproximada dos caracteres */
function getCharWidth(ch, size, tracking = 0, bold = false) {
  if (ch === ' ') return size * 0.40 + tracking;
  if (ch === '°' || ch === '-' || ch === '—') return size * 0.58 + tracking;
  if (['I', '1', 'l', '!', '/', '|', ':', '.', ','].includes(ch)) return size * 0.36 + tracking;
  if (['M', 'W', 'Q', 'O', 'G', 'D', '0'].includes(ch)) return size * (bold ? 0.90 : 0.82) + tracking;
  return size * (bold ? 0.72 : 0.66) + tracking;
}

/* Mouse Rig suave com parallax */
function Rig() {
  return useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 0.2 - state.camera.position.x) * 0.04;
    state.camera.position.y += (state.pointer.y * 0.12 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
}

/* Anéis de Marquee 360° MaxFrio */
function MaxFrioMarqueeRing({ y, radius, text, size, speed, material }) {
  const ringRef = useRef(null);

  const items = useMemo(() => {
    const fullText = (text + '   ').repeat(3);
    const chars = [...fullText];
    const widths = chars.map((ch) => getCharWidth(ch, size, size * 0.08, false));
    const totalLen = widths.reduce((a, b) => a + b, 0);

    let currentDist = 0;
    return chars.map((ch, i) => {
      const angle = (currentDist / totalLen) * Math.PI * 2;
      currentDist += widths[i];
      return {
        ch,
        pos: [Math.sin(angle) * radius, y, Math.cos(angle) * radius],
        rot: [0, angle, 0],
      };
    });
  }, [text, y, radius, size]);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += speed * delta;
    }
  });

  return (
    <group ref={ringRef}>
      {items.map((it, i) =>
        it.ch === ' ' ? null : (
          <group key={i} position={it.pos} rotation={it.rot}>
            <Text
              font={FONT_SEMI}
              fontSize={size}
              color="#7cc8f0"
              anchorX="center"
              anchorY="middle"
              material={material}
            >
              {it.ch}
            </Text>
          </group>
        )
      )}
    </group>
  );
}

/* Modelo 3D centralizado e perfeitamente legível */
function SecondModel({ isMobile }) {
  const { nodes } = useGLTF('/assets/ShirtScrolling.glb');
  const acGLTF = useGLTF('/assets/air.glb');

  const groupRef = useRef(null);
  const textsRef = useRef(null);

  /* Raio amplo para curvatura suave que mantém todos os caracteres legíveis de frente */
  const R = isMobile ? 0.58 : 0.68;

  /* Material compartilhado para os textos principais */
  const textsMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#f2fafe',
        transparent: true,
        opacity: 1,
        side: THREE.FrontSide,
        depthTest: true,
      }),
    []
  );

  /* Material compartilhado para os letreiros infinitos */
  const marqueeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#7cc8f0',
        transparent: true,
        opacity: 0,
        side: THREE.FrontSide,
        depthTest: true,
      }),
    []
  );

  /* Fundo glacial escuro MaxFrio */
  const sphereTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
    grad.addColorStop(0, '#183c5e');
    grad.addColorStop(0.5, '#0c1f33');
    grad.addColorStop(0.85, '#071320');
    grad.addColorStop(1, '#040b12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#3187bd';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, Math.PI * 2);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const sphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: sphereTex,
      }),
    [sphereTex]
  );

  /* Cálculo dos caracteres em arco suave perfeitamente centralizado */
  const allTextChars = useMemo(() => {
    const list = [];
    PHRASES.forEach((p, pIdx) => {
      const angleRad = (p.angle * Math.PI) / 180;
      const tracking = p.size * 0.12;
      const widths = [...p.label].map((ch) => getCharWidth(ch, p.size, tracking, p.bold));
      const total = widths.reduce((a, b) => a + b, 0);

      let pen = -total / 2;
      [...p.label].forEach((ch, i) => {
        const mid = pen + (widths[i] - tracking) / 2;
        const dTheta = mid / R;
        pen += widths[i];
        const th = angleRad + dTheta;
        list.push({
          id: `${pIdx}-${i}`,
          ch,
          pos: [Math.sin(th) * R, p.y, Math.cos(th) * R],
          rot: [0, th, 0],
          size: p.size,
          bold: p.bold,
          color: p.color,
        });
      });
    });
    return list;
  }, [R]);

  /* Animação dos textos — estilo Adidas */
  const animateTexts = (textsGroupRef) => {
    if (!textsGroupRef.current) return gsap.timeline();
    const meshes = textsGroupRef.current.children;

    const tl = gsap.timeline();
    meshes.forEach((mesh, i) => {
      tl.from(mesh.scale, { x: 0, y: 0, z: 0, duration: 1, ease: 'circ.out' }, i * 0.03);
      tl.from(mesh.position, { y: '+=0.04', duration: 1, ease: 'back.out' }, i * 0.03);
    });

    return tl;
  };

  /* ScrollTrigger Timeline: inicia com a frase 1 perfeitamente no centro e gira 360° */
  useEffect(() => {
    if (!groupRef.current || !textsRef.current) return;

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '#intro-stage',
          start: 'top top',
          end: '600% top',
          scrub: 1,
          pin: true,
        },
      })
      .to(groupRef.current.rotation, { y: -Math.PI * 2, duration: 1 }, 0)
      .add(animateTexts(textsRef).duration(0.55), 0);

    return () => {
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  /* Escala da condensadora */
  const acScale = isMobile ? 0.24 : 0.30;

  return (
    <group
      ref={groupRef}
      dispose={null}
      scale={isMobile ? 1.4 : 1.9}
      rotation={[0, 0, 0]} // Inicia com ângulo 0 para frase 1 ficar 100% de frente e centralizada
      position={[0, 0, 0]}
    >
      {/* Aparelho de Ar Condicionado (retangular, centralizado) */}
      <mesh
        geometry={acGLTF.nodes.Cube.geometry}
        material={acGLTF.nodes.Cube.material}
        scale={[0.4 * acScale, 1.1 * acScale, 1.5 * acScale]}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Esfera de Ambiente MaxFrio (Sphere_ENV) */}
      <mesh
        geometry={nodes.Sphere_ENV.geometry}
        material={sphereMaterial}
        scale={[1.6, 1.6, 1.6]}
        position={[0, -1.12, -0.05]}
      />

      {/* Textos 3D Curvados MaxFrio Nivelados e Legíveis */}
      <group ref={textsRef}>
        {allTextChars.map((item) =>
          item.ch === ' ' ? null : (
            <group key={item.id} position={item.pos} rotation={item.rot}>
              <Text
                font={item.bold ? FONT_BOLD : FONT_SEMI}
                fontSize={item.size}
                color={item.color}
                anchorX="center"
                anchorY="middle"
                material={textsMaterial}
              >
                {item.ch}
              </Text>
            </group>
          )
        )}
      </group>


    </group>
  );
}

export default function IntroScene() {
  const isMobile = useIsMobile();
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 3.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <pointLight position={[-3, 1, 3]} intensity={18} color="#4fa8dc" />
      <pointLight position={[3, -2, 2]} intensity={14} color="#a8ddf9" />
      <Suspense fallback={null}>
        <SecondModel isMobile={isMobile} />
      </Suspense>
      <Rig />
    </Canvas>
  );
}

useGLTF.preload('/assets/ShirtScrolling.glb');
useGLTF.preload('/assets/air.glb');
