import BlueprintSvg from './BlueprintSvg.jsx';

const SPECS = [
  ['Capacidade', '24.000 BTU/h'],
  ['Área recomendada', 'até 40 m²'],
  ['Eficiência', 'SEER 6,1 — classe A'],
  ['Nível de ruído', '19 dB'],
  ['Conexão', 'Wi-Fi nativo'],
  ['Refrigerante', 'R-32 ecológico'],
];

const MINI = [
  ['Instalação', 'até 24h'],
  ['Garantia', '5 anos'],
  ['Manutenção 1º ano', 'inclusa'],
];

const MODELS = [
  {
    img: '/assets/ac-hero.svg',
    alt: 'Unidade hi-wall inverter MaxFrio Arctic',
    tag: 'Hi-Wall Inverter',
    name: 'Arctic 9–24k',
    desc: 'A parede virou brisa: compacta, silenciosa e invisível na conta de luz.',
    specs: [
      ['BTU', '9.000 — 24.000'],
      ['Área', 'até 35 m²'],
      ['Ruído', '19 dB'],
    ],
  },
  {
    img: '/assets/ac-cassette.svg',
    alt: 'Cassete de teto quatro vias MaxFrio',
    tag: 'Cassete 4 Vias',
    name: 'Ceil 24–48k',
    desc: 'Clima uniforme em 360°, embutido no forro — perfeito para lojas e escritórios.',
    specs: [
      ['BTU', '24.000 — 48.000'],
      ['Área', 'até 70 m²'],
      ['Ruído', '24 dB'],
    ],
  },
  {
    img: '/assets/ac-pisoteto.svg',
    alt: 'Console piso-teto MaxFrio',
    tag: 'Piso-Teto',
    name: 'Console PT 28–60k',
    desc: 'Potência industrial com acabamento fino para halls, restaurantes e clínicas.',
    specs: [
      ['BTU', '28.000 — 60.000'],
      ['Área', 'até 90 m²'],
      ['Ruído', '27 dB'],
    ],
  },
];

export default function Products() {
  return (
    <section id="equipamentos" className="prod section bg-light" data-bg="light">
      <div className="prod-track" data-prod-track>
        <div className="sticky-stage prod-stage">
          {/* fundo claro que amanhece sobre a seção escura anterior */}
          <div className="prod-lightbg" data-prod-light />

          <div className="prod-switch">
            {/* tela 1: título gigante + unidade flutuante */}
            <div className="prod-screen prod-screen--hero">
              <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="u-96" />
                <div className="prod-title">
                  <h2 className="h1" data-reveal="chars" data-prevent-flicker="true">
                    Frio que
                  </h2>
                  <h2 className="h1 a-right" data-reveal="chars" data-prevent-flicker="true">
                    você sente.
                  </h2>
                </div>
                <div className="prod-hero-bot">
                  <div className="grid">
                    <div className="g-col-6">
                      <div className="l1 text-dim" data-reveal="children" data-prevent-flicker="true">
                        Equipamentos
                      </div>
                      <div className="u-24" />
                      <h3 className="p5" data-reveal="lines" data-prevent-flicker="true">
                        Conforto sem
                        <br />
                        pontos quentes
                      </h3>
                    </div>
                    <div className="g-col-6 a-right">
                      <div className="l1" data-reveal="children" data-prevent-flicker="true">
                        MaxFrio Arctic
                      </div>
                      <div className="u-12" />
                      <p className="p7 a-right" style={{ maxWidth: '44ch', marginLeft: 'auto' }}>
                        Compressor inverter dual, distribuição 4D e sensor de presença: a Arctic
                        alcança a temperatura ideal 40% mais rápido e mantém variação de ±0,5°.
                      </p>
                    </div>
                  </div>
                  <div className="u-12" />
                </div>
              </div>
            </div>

            {/* tela 2: ficha técnica com blueprint */}
            <div className="prod-screen prod-screen--spec">
              <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="u-36" />
                <div className="prod-spec-grid">
                  <div className="prod-spec-card">
                    <div className="line-h" />
                    <div className="u-12" />
                    <div className="l1 text-dim">Unidade Interna</div>
                    <div className="h3" style={{ marginTop: '8px', color: 'var(--navy-900)' }}>
                      Arctic Dual 24k
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
                    <h3 className="p5 prod-right-title">Engenharia do conforto</h3>
                    <div className="u-12" />
                    <p className="p7">
                      Cada projeto nasce de um cálculo térmico real — não de palpite. Medimos o
                      ambiente, o sol que bate e o fluxo de pessoas para dimensionar a máquina
                      certa, na potência certa, no lugar certo.
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
            <img src="/assets/ac-hero.svg" alt="Unidade Arctic 24000 em destaque" />
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
              <h3 className="h3">Um para cada ambiente</h3>
            </div>
            <div className="g-col-4 a-right" style={{ alignSelf: 'end' }}>
              <p className="p7">Do studio de 20 m² ao galpão inteiro.</p>
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
