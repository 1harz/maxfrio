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
  { label: 'INSTALAÇÃO', angle: 0, y: -0.16, size: 0.056, bold: true, color: '#f2fafe' },
  { label: 'MANUTENÇÃO', angle: 72, y: 0.04, size: 0.052, bold: false, color: '#7cc8f0' },
  { label: 'HIGIENIZAÇÃO', angle: 144, y: -0.16, size: 0.048, bold: false, color: '#a8ddf9' },
  { label: 'CONSERTO E REPARO', angle: 216, y: 0.04, size: 0.044, bold: false, color: '#85b8dd' },
  { label: 'BRASÍLIA E ENTORNO', angle: 288, y: 0.16, size: 0.042, bold: true, color: '#a8ddf9' },
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
  const letter = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (ch === ' ') return size * 0.40 + tracking;
  if (ch === '°' || ch === '-') return size * 0.58 + tracking;
  if (['I', '1', 'l', '!', '/', '|', ':', '.', ','].includes(letter)) return size * 0.36 + tracking;
  if (['M', 'W', 'Q', 'O', 'G', 'D', '0'].includes(letter)) return size * (bold ? 0.90 : 0.82) + tracking;
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

/* Subcomponente para cada frase com transição contínua e suave de opacidade */
function PhraseGroup({ phrase, phraseIndex, groupRef, R, isMobile, onMountRef }) {
  const phraseRef = useRef(null);
  const mobileScale = Math.min(0.68, 9.2 / phrase.label.length);
  const fontSize = phrase.size * 1.2 * (isMobile ? mobileScale : 1);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: phrase.color,
        transparent: true,
        opacity: phraseIndex === 0 ? 1 : 0,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    [phrase.color, phraseIndex]
  );

  const chars = useMemo(() => {
    const angleRad = (phrase.angle * Math.PI) / 180;
    const tracking = fontSize * 0.04;
    const widths = [...phrase.label].map((ch) => getCharWidth(ch, fontSize, tracking, phrase.bold));
    const total = widths.reduce((a, b) => a + b, 0);

    let pen = -total / 2;
    return [...phrase.label].map((ch, i) => {
      const mid = pen + (widths[i] - tracking) / 2;
      const dTheta = mid / R;
      pen += widths[i];
      const th = angleRad + dTheta;
      return {
        id: `${phraseIndex}-${i}`,
        ch,
        pos: [Math.sin(th) * R, phrase.y, Math.cos(th) * R],
        rot: [0, th, 0],
      };
    });
  }, [phrase, phraseIndex, R, fontSize]);

  useFrame(() => {
    if (!groupRef.current) return;
    const currentRotY = groupRef.current.rotation.y;
    const angleRad = (phrase.angle * Math.PI) / 180;
    const netAngle = (angleRad + currentRotY) % (Math.PI * 2);

    // Fade contínuo e elegante baseado no cosseno (transição suave entre 30° e 60°)
    const cosVal = Math.cos(netAngle);
    const t = Math.max(0, Math.min(1, (cosVal - 0.45) / 0.45));
    const smoothOpacity = t * t * (3 - 2 * t);

    material.opacity = smoothOpacity;
    if (phraseRef.current) {
      phraseRef.current.visible = smoothOpacity > 0.005;
    }
  });

  return (
    <group
      ref={(el) => {
        phraseRef.current = el;
        if (onMountRef) onMountRef(el, phraseIndex);
      }}
    >
      {chars.map((item) =>
        item.ch === ' ' ? null : (
          <group key={item.id} position={item.pos} rotation={item.rot}>
            <Text
              font={phrase.bold ? FONT_BOLD : FONT_SEMI}
              fontSize={fontSize}
              color={phrase.color}
              anchorX="center"
              anchorY="middle"
              material={material}
            >
              {item.ch}
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
  const phraseRefs = useRef([]);

  /* Raio amplo para curvatura suave que mantém todos os caracteres legíveis */
  const R = isMobile ? 0.58 : 0.68;

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

  /* Animação dos textos: estilo Adidas com pop-in dinâmico em cascata */
  const animateTexts = () => {
    const tl = gsap.timeline();
    let idx = 0;
    phraseRefs.current.forEach((pGroup, phraseIndex) => {
      if (!pGroup || phraseIndex === 0) return;
      pGroup.children.forEach((mesh) => {
        tl.from(mesh.scale, { x: 0, y: 0, z: 0, duration: 1, ease: 'circ.out' }, idx * 0.022);
        tl.from(mesh.position, { y: '+=0.04', duration: 1, ease: 'back.out' }, idx * 0.022);
        idx++;
      });
    });
    return tl;
  };

  /* ScrollTrigger Timeline: inicia com a frase 1 perfeitamente no centro e gira 360° */
  useEffect(() => {
    if (!groupRef.current) return;

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '#intro-stage',
          start: 'top top',
          end: '600% top',
          scrub: 1,
          pin: true,
          refreshPriority: 1,
        },
      })
      .to(groupRef.current.rotation, { y: -(Math.PI * 2 * (PHRASES.length - 1)) / PHRASES.length, duration: 1 }, 0)
      .add(animateTexts().duration(0.55), 0);

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
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

      {/* Frases 3D com transição fotográfica de opacidade e animação pop-in */}
      {PHRASES.map((phrase, pIdx) => (
        <PhraseGroup
          key={phrase.label}
          phrase={phrase}
          phraseIndex={pIdx}
          groupRef={groupRef}
          R={R}
          isMobile={isMobile}
          onMountRef={(el, idx) => {
            phraseRefs.current[idx] = el;
          }}
        />
      ))}
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

