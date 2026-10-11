export default function Hero() {
  return (
    <section id="hero" className="hero-editorial" data-bg="light" aria-labelledby="hero-title">
      <div className="container hero-editorial__container">
        <div className="hero-editorial__rail">
          <span className="hero-editorial__location">
            <span aria-hidden="true" />
            CLIMATIZAÇÃO EM BRASÍLIA E ENTORNO
          </span>
          <span>RESIDENCIAL / COMERCIAL</span>
        </div>

        <div className="hero-editorial__body">
          <h1 id="hero-title" className="hero-editorial__title">
            Brasília<br />
            esquenta.<br />
            <span>A gente resolve.</span>
          </h1>

        </div>

        <aside className="hero-editorial__aside" aria-label="Experiência MaxFrio">
          <div className="hero-editorial__aside-top">
            <span>EXPERIÊNCIA MAXFRIO</span>
            <span>BRASÍLIA / DF</span>
          </div>
          <div className="hero-editorial__experience">
            <strong>20<span>+</span></strong>
            <p>ANOS DE EXPERIÊNCIA</p>
          </div>
          <p className="hero-editorial__aside-note">O seu ambiente, no ponto certo.</p>
        </aside>

        <div className="hero-editorial__base">
          <p>
            Instalação, manutenção e higienização de ar-condicionado com cuidado
            técnico do começo ao fim.
          </p>
          <div className="hero-editorial__actions">
            <a className="hero-editorial__primary" href="#contato" data-pop-open="quote">
              Solicitar orçamento
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a className="hero-editorial__secondary" href="#servicos">
              Conhecer serviços <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-editorial__service-line" aria-label="Principais serviços">
          <span>01 / INSTALAÇÃO</span>
          <span>02 / MANUTENÇÃO</span>
          <span>03 / HIGIENIZAÇÃO</span>
        </div>
      </div>
    </section>
  );
}
