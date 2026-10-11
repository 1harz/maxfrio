import BlueprintSvg from './BlueprintSvg.jsx';

const BASE = import.meta.env.BASE_URL;

const SPECS = [
  ['Atendimento', 'todas as marcas'],
  ['Tecnologias', 'convencional e inverter'],
  ['Aplicação', 'residencial e comercial'],
  ['Dimensionamento', 'conforme o ambiente'],
  ['Instalação', 'linha frigorígena em cobre'],
  ['Pós-serviço', 'orientação de uso'],
];

const MINI = [
  ['Visita técnica', 'quando necessária'],
  ['Garantia do serviço', '12 meses'],
  ['Orçamento', 'antes da execução'],
];

const MODELS = [
  {
    img: `${BASE}assets/produto-split-hiwall-v2.jpg`,
    alt: 'Ar-condicionado split hi-wall branco',
    tag: 'Residencial e comercial',
    name: 'Split Hi-Wall',
    desc: 'Solução versátil para quartos, salas, escritórios e pequenos comércios.',
    specs: [
      ['Tipo', 'convencional ou inverter'],
      ['Capacidade', 'definida por cálculo'],
      ['Serviços', 'instalação e manutenção'],
    ],
  },
  {
    img: `${BASE}assets/produto-cassete-v2.jpg`,
    alt: 'Ar-condicionado cassete de quatro vias branco',
    tag: 'Ambientes comerciais',
    name: 'Cassete 4 Vias',
    desc: 'Distribuição de ar pelo ambiente com instalação integrada ao forro.',
    specs: [
      ['Aplicação', 'lojas, clínicas e escritórios'],
      ['Capacidade', 'definida por cálculo'],
      ['Serviços', 'instalação e manutenção'],
    ],
  },
  {
    img: `${BASE}assets/produto-pisoteto-v2.jpg`,
    alt: 'Ar-condicionado piso-teto branco',
    tag: 'Grandes ambientes',
    name: 'Piso-Teto',
    desc: 'Alternativa robusta para salões, restaurantes, igrejas e espaços amplos.',
    specs: [
      ['Aplicação', 'médios e grandes espaços'],
      ['Capacidade', 'definida por cálculo'],
      ['Serviços', 'instalação e manutenção'],
    ],
  },
];

export default function Products() {
  return (
    <section id="equipamentos" className="prod section bg-light" data-bg="light" style={{ position: 'relative', zIndex: 10 }}>
      <div className="prod-track" data-prod-track>
        <div className="sticky-stage prod-stage">
          {/* fundo claro que amanhece sobre a seção escura anterior */}
          <div className="prod-lightbg" data-prod-light />

          <div className="prod-switch">
            {/* tela 1: título gigante + unidade flutuante */}
            <div className="prod-screen prod-screen--hero">
              <div className="container prod-screen-c prod-screen-c--hero">
                <div className="u-96" />
                <div className="prod-title">
                  <h2 className="h1" data-reveal="chars" data-prevent-flicker="true">
                    Equipamento
                  </h2>
                  <h2 className="h1 a-right" data-reveal="chars" data-prevent-flicker="true">
                    certo.
                  </h2>
                </div>
                <div className="prod-unit-mobile">
                  <img src={`${BASE}assets/ac-hero.svg`} alt="Ilustração de uma unidade interna split hi-wall" />
                </div>
                <div className="prod-hero-bot">
                  <div className="grid">
                    <div className="g-col-6">
                      <div className="l1 text-dim" data-reveal="children" data-prevent-flicker="true">
                        Tipos de aparelho
                      </div>
                      <div className="u-24" />
                      <h3 className="p5" data-reveal="lines" data-prevent-flicker="true">
                        Uma solução para
                        <br />cada ambiente
                      </h3>
                    </div>
                    <div className="g-col-6 a-right">
                      <div className="l1" data-reveal="children" data-prevent-flicker="true">
                        Atendimento especializado
                      </div>
                      <div className="u-12" />
                      <p className="p7 a-right" style={{ maxWidth: '44ch', marginLeft: 'auto' }}>
                        Instalamos e realizamos manutenção nos principais tipos de ar-condicionado,
                        respeitando as especificações de cada fabricante.
                      </p>
                    </div>
                  </div>
                  <div className="u-12" />
                </div>
              </div>
            </div>

            {/* tela 2: ficha técnica com blueprint */}
            <div className="prod-screen prod-screen--spec">
              <div className="container prod-screen-c prod-screen-c--spec">
                <div className="u-36" />
                <div className="prod-spec-grid">
                  <div className="prod-spec-card">
                    <div className="line-h" />
                    <div className="u-12" />
                    <div className="l1 text-dim">Unidade Interna</div>
                    <div className="h3" style={{ marginTop: '8px', color: 'var(--navy-900)' }}>
                      Instalação de Split
                    </div>
                    <div className="spec-list">
                      {SPECS.map(([k, v]) => (
                        <div className="spec-row" key={k}>
                          <span className="l1 text-dim">{k}</span>
                          <span className="l1 font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="prod-blueprint-w">
                    <BlueprintSvg />
                  </div>

                  <div className="prod-spec-card">
                    <div className="line-h" />
                    <div className="u-12" />
                    <h3 className="p5 prod-right-title">Instalação bem planejada</h3>
                    <div className="u-12" />
                    <p className="p7">
                      Avaliamos as características do ambiente para orientar a capacidade adequada,
                      o melhor ponto de instalação e os materiais necessários para executar o serviço.
                    </p>
                    <div className="u-24" />
                    <div className="line-h" />
                    {MINI.map(([k, v]) => (
                      <div className="spec-row" key={k}>
                        <span className="l1 text-dim">{k}</span>
                        <span className="l1 font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="u-24" />
              </div>
            </div>
          </div>

          {/* a unidade: encolhe e doca suavemente conforme o scroll */}
          <div className="prod-unit" data-prod-unit>
            <img src={`${BASE}assets/ac-hero.svg`} alt="Ilustração de uma unidade interna split hi-wall" />
          </div>
        </div>
      </div>


      {/* linha de modelos */}
      <div className="prod-models">
        <div className="container">
          <div className="u-96" />
          <div className="line-h" />
          <div className="u-12" />
          <div className="l1 text-dim">Linha completa</div>
          <div className="u-24" />
          <div className="grid">
            <div className="g-col-8">
              <h3 className="h3">Um modelo para cada ambiente</h3>
            </div>
            <div className="g-col-4 a-right" style={{ alignSelf: 'end' }}>
              <p className="p7">Da residência ao ambiente comercial ou industrial.</p>
            </div>
          </div>
          <div className="u-60" />
          <div className="grid" data-reveal="children" data-prevent-flicker="true">
            {MODELS.map((m) => (
              <article className="g-col-4 model-card" key={m.name}>
                <div className="model-card_media">
                  <img src={m.img} alt={m.alt} loading="lazy" />
                </div>
                <div className="u-24" />
                <div className="l1 text-dim">{m.tag}</div>
                <h3 className="h4" style={{ marginTop: '6px' }}>
                  {m.name}
                </h3>
                <div className="u-12" />
                <p className="p7">{m.desc}</p>
                <div className="u-24" />
                <div className="line-h" />
                <div className="model-card_data">
                  {m.specs.map(([k, v]) => (
                    <div className="spec-row" key={k}>
                      <span className="l1 text-dim">{k}</span>
                      <span className="l1">{v}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="u-96" />
        </div>
      </div>
    </section>
  );
}
