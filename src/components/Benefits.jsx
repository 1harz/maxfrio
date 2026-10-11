/* eslint-disable jsx-a11y/anchor-is-valid */

const ITEMS = [
  {
    id: 'experiencia',
    title: 'Mais de 20 anos de experiência',
    img: '/assets/servico-instalacao-v2.jpg',
    alt: 'Técnico MaxFrio instalando ar-condicionado em residência de Brasília',
    text: 'Desde 2002, a MaxFrio atende residências e empresas com uma relação baseada em experiência, honestidade e confiança. Cada serviço começa com uma avaliação clara da necessidade do cliente.',
  },
  {
    id: 'equipe',
    title: 'Equipe técnica própria e capacitada',
    img: '/assets/servico-manutencao-v2.jpg',
    alt: 'Profissional capacitado realizando manutenção em condensadora',
    text: 'Profissionais treinados, atualizados e orientados para trabalhar com segurança. A equipe conhece as principais marcas do mercado e explica o diagnóstico antes de iniciar o serviço.',
  },
  {
    id: 'qualidade',
    title: 'Peças e materiais de qualidade',
    img: '/assets/servico-higienizacao-v2.jpg',
    alt: 'Higienização profissional de equipamento de ar-condicionado',
    text: 'Nos reparos, utilizamos peças originais ou de primeira linha, conforme disponibilidade e aprovação. Nas instalações, a linha frigorígena é feita em cobre para preservar a segurança e a garantia do aparelho.',
  },
  {
    id: 'atendimento',
    title: 'Atendimento completo em climatização',
    img: '/assets/servico-comercial-v2.jpg',
    alt: 'Manutenção de ar-condicionado cassete em ambiente comercial',
    text: 'Instalação, venda, manutenção preventiva e corretiva, higienização, consertos, reparos e recarga de gás para aplicações residenciais, comerciais e industriais em Brasília e Entorno.',
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
