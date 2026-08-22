/* eslint-disable jsx-a11y/anchor-is-valid */

const ITEMS = [
  {
    id: 'instalacao',
    title: 'Instalação Arquitetônica 24h',
    img: '/assets/ac-interior-architecture.jpg',
    alt: 'Integração arquitetônica com difusores lineares e climatização invisível',
    text: 'Equipe de engenharia própria, cálculo de carga térmica in loco e instalação limpa no mesmo dia. Tubulação embutida, teste estanque de vácuo a 500 microns e esterilização da linha frigorígena antes do primeiro acionamento.',
  },
  {
    id: 'manutencao',
    title: 'Engenharia de Manutenção Preventiva',
    img: '/assets/ac-copper-coil.jpg',
    alt: 'Inspeção técnica e limpeza ultrassônica da serpentina de cobre',
    text: 'Planos que visitam seu equipamento antes de qualquer falha: higienização ultrassônica com bactericida hospitalar, teste de pressão digital e verificação de estanqueidade. Eficiência máxima e consumo até 40% menor.',
  },
  {
    id: 'ar',
    title: 'Pureza Hospitalar e Ionização Ativa',
    img: '/assets/ac-condenser.jpg',
    alt: 'Unidade de alta performance com filtragem eletrostática e fluxo contínuo',
    text: 'Filtragem tripla HEPA H13 e geradores de íons negativos que neutralizam 99,9% de vírus, bactérias, ácaros e odores. O ambiente perfeito para quem valoriza a saúde respiratória.',
  },
  {
    id: 'smart',
    title: 'Controle e Automação Conectada',
    img: '/assets/ac-inverter-engine.jpg',
    alt: 'Placa eletrônica inverter com conectividade e automação',
    text: 'Climatize sua residência antes mesmo de sair do trabalho. Integração total com Apple HomeKit, Alexa, Google Home e sistemas de automação de luxo KNX e Control4.',
  },
];


function IconPlus({ id }) {
  return (
    <span className="bene-ico" aria-hidden="true">
      <svg viewBox="0 0 14 14">
        <path d="M0 7h14" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <svg className="ico-x" data-acc-icon={id} viewBox="0 0 14 14">
        <path d="M7 0v14" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export default function Benefits() {
  return (
    <section id="vantagens" className="bene section bg-light" data-bg="light" style={{ position: 'relative', zIndex: 11, overflow: 'hidden' }}>
      <div className="side-curtain-bg" data-curtain="side" aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="u-96" />
        <div className="line-h" />
        <div className="u-12" />
        <div className="l1 text-dim">Por que MaxFrio</div>
        <div className="u-60" />
        <div className="grid bene-grid">
          <div className="g-col-6 bene-list" data-slide-in="left">
            {ITEMS.map((item) => (
              <div className="bene-item" key={item.id}>
                <button className="bene-head" data-acc-btn={item.id}>
                  <h3 className="p5">{item.title}</h3>
                  <IconPlus id={item.id} />
                </button>
                <div className="bene-desc" data-acc-desc={item.id}>
                  <div className="u-36" />
                  <p className="p7">{item.text}</p>
                  <div className="b-mobile">
                    <div className="u-24" />
                    <div className="img-w" style={{ borderRadius: 'var(--radius)' }}>
                      <img src={item.img} alt={item.alt} loading="lazy" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div className="u-24" />
                </div>
              </div>
            ))}
          </div>

          <div className="g-col-6 b-desktop" data-slide-in="right">
            <div className="bene-media">
              {ITEMS.map((item) => (
                <div className="bene-media-item" data-acc-media={item.id} key={item.id}>
                  <div className="img-w" data-parallax-w>
                    <img data-parallax-img src={item.img} alt={item.alt} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="u-96" />
      </div>
    </section>
  );
}
