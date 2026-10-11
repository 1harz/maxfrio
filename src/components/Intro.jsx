import IntroScene from './IntroScene.jsx';

export default function Intro() {
  return (
    <section id="sobre" className="intro bg-dark section" data-bg="dark" style={{ overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
      {/* Vinheta superior com blur para transição atmosférica */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, #040b12 0%, rgba(4, 11, 18, 0.6) 50%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
      {/* marquee fantasma ao fundo */}
      <div className="ghost" aria-hidden="true" data-parallax-bg>
        <div className="ghost_row">
          MaxFrio · Ar-Condicionado · MaxFrio · Ar-Condicionado · MaxFrio · Ar-Condicionado · MaxFrio ·
          Ar-Condicionado ·&nbsp;
          MaxFrio · Ar-Condicionado · MaxFrio · Ar-Condicionado · MaxFrio · Ar-Condicionado · MaxFrio ·
          Ar-Condicionado ·&nbsp;
        </div>
      </div>

      {/* palco 3D pinado ocupando 100% da largura horizontal da tela */}
      <div className="intro-stage" id="intro-stage">
        <IntroScene />
      </div>

      {/* Transição de blur suave no rodapé da seção 3D para Anatomia do Frio */}
      <div className="section-bottom-blur" aria-hidden="true" style={{ zIndex: 5 }}>
        <div className="blur-step blur-step-1" />
        <div className="blur-step blur-step-2" />
        <div className="blur-step blur-step-3" />
        <div className="blur-gradient-fill" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(4, 11, 18, 0.35) 30%, rgba(6, 13, 21, 0.8) 70%, #060D15 100%)'
        }} />
      </div>
    </section>
  );
}
