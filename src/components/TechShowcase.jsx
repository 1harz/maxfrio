const BASE = import.meta.env.BASE_URL;

const TECH_ITEMS = [
  {
    id: 'instalacao',
    tag: 'RESIDENCIAL // COMERCIAL // INDUSTRIAL',
    title: 'Instalação e venda',
    subtitle: 'Todas as marcas e modelos',
    img: `${BASE}assets/servico-instalacao-uniforme.webp`,
    alt: 'Técnico capacitado instalando ar-condicionado split em residência de Brasília',
    specs: [
      { k: 'Visita técnica', v: 'Marcação e orientação' },
      { k: 'Linha frigorígena', v: 'Tubulação de cobre' },
      { k: 'Acabamento', v: 'Isolamento e suporte' },
      { k: 'Garantia do serviço', v: '12 meses' },
    ],
    desc: 'Instalação profissional e segura, com orientação para escolher o aparelho adequado ao ambiente e suporte técnico após o serviço.',
  },
  {
    id: 'manutencao',
    tag: 'PREVENÇÃO // DIAGNÓSTICO',
    title: 'Manutenção preventiva e corretiva',
    subtitle: 'Eficiência e vida útil do equipamento',
    img: `${BASE}assets/servico-manutencao-uniforme.webp`,
    alt: 'Técnico realizando diagnóstico em condensadora de ar-condicionado',
    specs: [
      { k: 'Avaliação', v: 'Componentes e funcionamento' },
      { k: 'Prevenção', v: 'Falhas e perda de rendimento' },
      { k: 'Correção', v: 'Diagnóstico técnico' },
      { k: 'Atendimento', v: 'Residencial e empresarial' },
    ],
    desc: 'Manutenções periódicas ajudam a preservar o desempenho, reduzir falhas inesperadas e prolongar a vida útil do ar-condicionado.',
  },
  {
    id: 'higienizacao',
    tag: 'LIMPEZA // QUALIDADE DO AR',
    title: 'Higienização completa',
    subtitle: 'Cuidado com o aparelho e com o ambiente',
    img: `${BASE}assets/servico-higienizacao-uniforme.webp`,
    alt: 'Higienização profissional de evaporadora de ar-condicionado',
    specs: [
      { k: 'Limpeza', v: 'Filtros e componentes' },
      { k: 'Proteção do local', v: 'Área de trabalho organizada' },
      { k: 'Benefício', v: 'Melhor qualidade do ar' },
      { k: 'Prevenção', v: 'Acúmulo e falhas' },
    ],
    desc: 'Limpeza profunda para remover sujeira acumulada e ajudar a reduzir fungos, bactérias e alérgenos que afetam a qualidade do ar.',
  },
  {
    id: 'reparos',
    tag: 'CONSERTO // PEÇAS DE QUALIDADE',
    title: 'Consertos e reparos',
    subtitle: 'Diagnóstico rápido e solução responsável',
    img: `${BASE}assets/servico-reparos-uniforme.webp`,
    alt: 'Técnico verificando componentes internos de um ar-condicionado split',
    specs: [
      { k: 'Inspeção', v: 'Falha e causa do problema' },
      { k: 'Peças', v: 'Originais ou de primeira linha' },
      { k: 'Transparência', v: 'Orçamento antes do reparo' },
      { k: 'Especialização', v: 'Principais marcas do mercado' },
    ],
    desc: 'Correção de falhas com técnicos especializados e peças adequadas, sempre após avaliação do equipamento e aprovação do orçamento.',
  },
  {
    id: 'gas',
    tag: 'CARGA // TESTE DE VAZAMENTO',
    title: 'Recarga de gás refrigerante',
    subtitle: 'Pressão correta e funcionamento seguro',
    img: `${BASE}assets/servico-gas-uniforme.webp`,
    alt: 'Manômetros conectados à condensadora para verificação da pressão do sistema',
    specs: [
      { k: 'Antes da carga', v: 'Diagnóstico do sistema' },
      { k: 'Verificação', v: 'Possíveis vazamentos' },
      { k: 'Aplicação', v: 'Conforme o equipamento' },
      { k: 'Teste final', v: 'Funcionamento e rendimento' },
    ],
    desc: 'A baixa pressão pode comprometer o resfriamento e indicar vazamento. A equipe avalia o sistema antes de recomendar qualquer recarga.',
  },
  {
    id: 'ecologico',
    tag: 'ECONOMIA // RESPONSABILIDADE',
    title: 'Soluções mais econômicas',
    subtitle: 'Tecnologia inverter e gases adequados',
    img: `${BASE}assets/servico-eficiencia-real.webp`,
    alt: 'Escritório climatizado com ar-condicionado split instalado na parede',
    specs: [
      { k: 'Dimensionamento', v: 'Capacidade para cada ambiente' },
      { k: 'Tecnologia', v: 'Opções inverter' },
      { k: 'Aplicação', v: 'Casa, comércio e indústria' },
      { k: 'Orientação', v: 'Uso e manutenção consciente' },
    ],
    desc: 'Orientação para equipamentos eficientes, modernos e compatíveis com o espaço, buscando conforto térmico com consumo responsável.',
  },
];

export default function TechShowcase() {
  return (
    <section id="servicos" className="tech-showcase section bg-dark" data-bg="dark" style={{ position: 'relative', zIndex: 2 }}>
      <div className="tech-track" data-tech-track style={{ position: 'relative', zIndex: 1 }}>
        <div className="sticky-stage tech-stage">
          {/* Header da seção com telemetria: 100% legível e nítido */}
          <div className="container tech-header" style={{ position: 'relative', zIndex: 10 }}>
            <div className="tech-header-grid">
              <div>
                <div className="l1 text-frost font-mono">[ SERVIÇOS MAXFRIO ]</div>
                <h2 className="h2 tech-title" style={{ marginTop: '8px' }}>
                  Soluções completas para <span className="text-frost">seu conforto</span>
                </h2>
              </div>
              <div className="a-right tech-header-meta" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                <div className="font-mono l1 text-dim">RESIDENCIAL · COMERCIAL · INDUSTRIAL</div>
                <div className="p7 text-frost" style={{ marginTop: '4px' }}>
                  <span className="tech-hint-scroll">Role para conhecer todos os serviços</span>
                  <span className="tech-hint-swipe">Deslize para conhecer os serviços</span>
                </div>
                <div className="tech-controls" aria-label="Navegação dos serviços">
                  <button type="button" data-tech-prev aria-label="Serviço anterior">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg>
                  </button>
                  <button type="button" data-tech-next aria-label="Próximo serviço">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="line-h" style={{ marginTop: '20px', opacity: 0.3 }} />
          </div>

          {/* Faixa que desliza horizontalmente com o scroll */}
          <div className="tech-horizontal-wrap" tabIndex={0} role="region" aria-label="Serviços MaxFrio">
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
