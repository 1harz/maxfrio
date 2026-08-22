import IntroScene from './IntroScene.jsx';

export default function Intro() {
  return (
    <section id="sobre" className="intro bg-dark section" data-bg="dark" style={{ overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
      {/* marquee fantasma ao fundo */}
      <div className="ghost" aria-hidden="true" data-parallax-bg>
        <div className="ghost_row">
          MaxFrio — Climatização — MaxFrio — Climatização — MaxFrio — Climatização — MaxFrio —
          Climatização —&nbsp;
          MaxFrio — Climatização — MaxFrio — Climatização — MaxFrio — Climatização — MaxFrio —
          Climatização —&nbsp;
        </div>
      </div>

      {/* palco 3D pinado ocupando 100% da largura horizontal da tela */}
      <div className="intro-stage" id="intro-stage">
        <IntroScene />
      </div>
    </section>
  );
}
