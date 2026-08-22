const TECH_ITEMS = [
  {
    id: 'compressor',
    tag: 'MOTOR PRINCIPAL // CORE INVERTER',
    title: 'Compressor Twin Rotary Inverter',
    subtitle: 'Rotor de Neodímio e Mancais de Titânio',
    img: '/assets/ac-inverter-engine.jpg',
    alt: 'Corte técnico do compressor dual inverter',
    specs: [
      { k: 'Eficiência Energética', v: 'SEER 8.5 — Classe A+++' },
      { k: 'Faixa de Modulação', v: '10 Hz a 130 Hz contínuos' },
      { k: 'Vibração & Ruído', v: 'Redução de até 85% vs comum' },
      { k: 'Garantia de Motor', v: '10 anos de fábrica' },
    ],
    desc: 'O coração da máquina: dois rotores descentralizados que equilibram as forças mecânicas, operando sem picos de partida e reduzindo a oscilação térmica para ±0,2°C.',
  },
  {
    id: 'serpentina',
    tag: 'TROCA TÉRMICA // COPPER CORE',
    title: 'Serpentina de Cobre Hidrofílica',
    subtitle: 'Micro-Canaletas & Aletas Golden Fin',
    img: '/assets/ac-copper-coil.jpg',
    alt: 'Macro da serpentina de cobre com aletas de alumínio',
    specs: [
      { k: 'Material da Tubulação', v: 'Cobre 100% ranhurado internamente' },
      { k: 'Proteção Superficial', v: 'Tratamento Gold Fin anti-maresia' },
      { k: 'Capacidade de Troca', v: '+28% de condutividade térmica' },
      { k: 'Esterilização', v: 'Ciclo térmico auto-limpante 56°C' },
    ],
    desc: 'Tubo de cobre com ranhuras microscópicas em espiral que turbilhonam o gás ecológico R-32, extraindo calor instantaneamente com zero corrosão por décadas.',
  },
  {
    id: 'condensadora',
    tag: 'UNIDADE EXTERNA // AETHERA UNIT',
    title: 'Unidade Condensadora Aethera',
    subtitle: 'Hélice Aerodinâmica & Chassi Reforçado',
    img: '/assets/ac-condenser.jpg',
    alt: 'Unidade condensadora externa de alta performance',
    specs: [
      { k: 'Hélice do Ventilador', v: 'Pás biônicas inspiradas em aviação' },
      { k: 'Nível de Ruído Externo', v: 'Apenas 38 dB(A) a 1 metro' },
      { k: 'Gabinete Blindado', v: 'Aço galvanizado com pintura eletrostática' },
      { k: 'Operação Extrema', v: '-15°C até 52°C ambientes' },
    ],
    desc: 'Projetada para resistir ao sol escaldante, chuva torrencial e maresia pesada do litoral, mantendo pressão e fluxo constantes sem superaquecer.',
  },
  {
    id: 'arquitetura',
    tag: 'INTEGRAÇÃO // DESIGN MINIMALISTA',
    title: 'Difusão Linear Invisível',
    subtitle: 'Conforto Térmico Arquitetônico',
    img: '/assets/ac-interior-architecture.jpg',
    alt: 'Ambiente de luxo com difusores lineares embutidos',
    specs: [
      { k: 'Abertura do Difusor', v: 'Fendas discretas de 15 mm' },
      { k: 'Distribuição do Ar', v: 'Efeito Coanda 4D sem corrente direta' },
      { k: 'Controle de Ruído', v: 'Atenuadores acústicos inaudíveis (19 dB)' },
      { k: 'Compatibilidade', v: 'Automação residencial KNX / Control4' },
    ],
    desc: 'O melhor ar-condicionado é aquele que você não vê e não ouve — apenas sente. Projetos sob medida integrados ao forro de gesso e marcenaria de alto padrão.',
  },
];

export default function TechShowcase() {
  return (
    <section id="engenharia" className="tech-showcase section bg-dark clip" data-bg="dark">
      <div className="tech-track" data-tech-track>
        <div className="sticky-stage tech-stage">
          {/* Header da seção com telemetria */}
          <div className="container tech-header">
            <div className="tech-header-grid">
              <div>
                <div className="l1 text-frost font-mono">[ ENGENHARIA & COMPONENTES ]</div>
                <h2 className="h2 tech-title" style={{ marginTop: '8px' }}>
                  Anatomia do <span className="text-frost">Frio Extremo</span>
                </h2>
              </div>
              <div className="a-right tech-header-meta">
                <div className="font-mono l1 text-dim">ARQUITETURA DE CLIMATIZAÇÃO</div>
                <div className="p7 text-frost" style={{ marginTop: '4px' }}>
                  Role para navegar horizontalmente pelos componentes
                </div>
              </div>
            </div>
            <div className="line-h" style={{ marginTop: '20px', opacity: 0.3 }} />
          </div>

          {/* Faixa que desliza horizontalmente com o scroll */}
          <div className="tech-horizontal-wrap">
            <div className="tech-strip" data-tech-strip>
              {TECH_ITEMS.map((item, index) => (
                <article className="tech-card" key={item.id}>
                  <div className="tech-card_inner">
                    {/* Imagem do componente com blueprint overlay */}
                    <div className="tech-card_media">
                      <img src={item.img} alt={item.alt} loading="lazy" />
                      <div className="tech-card_badge font-mono">
                        <span>0{index + 1} // {item.id.toUpperCase()}</span>
                      </div>
                      <div className="tech-card_grid_overlay" />
                    </div>

                    {/* Ficha técnica e descrição */}
                    <div className="tech-card_info">
                      <div className="l1 text-frost font-mono">{item.tag}</div>
                      <h3 className="h4 tech-card_title">{item.title}</h3>
                      <div className="p7 text-dim font-mono">{item.subtitle}</div>
                      <p className="p7 tech-card_desc">{item.desc}</p>

                      <div className="tech-card_specs">
                        {item.specs.map((s) => (
                          <div className="tech-spec-row font-mono" key={s.k}>
                            <span className="spec-k text-dim">{s.k}</span>
                            <span className="spec-v text-frost">{s.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Barra inferior de progresso do scroll */}
          <div className="container tech-footer">
            <div className="tech-progress-bar">
              <div className="tech-progress-fill" data-tech-progress />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
