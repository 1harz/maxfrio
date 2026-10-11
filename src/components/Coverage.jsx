import { PlaneIcon, HoverLink, CtaButton, Barcode, SnowIcon } from './bits.jsx';

const BAIRROS = [
  'Brasília',
  'Asa Sul',
  'Asa Norte',
  'Lago Sul',
  'Lago Norte',
  'Sudoeste',
  'Noroeste',
  'Águas Claras',
  'Guará',
  'Taguatinga',
  'Vicente Pires',
  'Jardim Botânico',
  'Park Way',
  'Núcleo Bandeirante',
  'Cruzeiro',
  'Sobradinho',
  'Planaltina',
  'Ceilândia',
  'Samambaia',
  'Gama',
  'Santa Maria',
  'São Sebastião',
  'Riacho Fundo',
  'Recanto das Emas',
  'Entorno do DF',
];

/* wordmark MAXFRIO com tipografia 3D geométrica minimalista */
function Wordmark() {
  return (
    <svg
      className="cov-wordmark"
      data-wordmark-svg
      viewBox="0 0 1440 320"
      fill="none"
      aria-label="MaxFrio"
    >
      <defs>
        {/* Gradiente Frontal de Gelo Metálico */}
        <linearGradient id="wm3dFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="35%" stopColor="#C2EEFE" stopOpacity="0.95" />
          <stop offset="75%" stopColor="#68BEED" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#256B9E" stopOpacity="0.75" />
        </linearGradient>

        {/* Gradiente de Extrusão 3D e Profundidade */}
        <linearGradient id="wm3dDepth" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14426B" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#041220" stopOpacity="0.98" />
        </linearGradient>

        {/* Brilho Icy */}
        <filter id="iceGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#7FE3FF" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Camada 3D de Extrusão / Sombra Isométrica */}
      <g fill="url(#wm3dDepth)" transform="translate(6, 12)" opacity="0.9">
        {/* M */}
        <path d="M 40,280 L 40,60 L 100,60 L 150,175 L 200,60 L 260,60 L 260,280 L 208,280 L 208,124 L 164,226 L 136,226 L 92,124 L 92,280 Z" />
        {/* A */}
        <path d="M 285,280 L 355,60 L 420,60 L 490,280 L 436,280 L 418,220 L 357,220 L 339,280 Z M 371,175 L 404,175 L 387.5,115 Z" />
        {/* X */}
        <path d="M 505,280 L 565,170 L 510,60 L 568,60 L 602,130 L 636,60 L 694,60 L 639,170 L 699,280 L 641,280 L 602,208 L 563,280 Z" />
        {/* F */}
        <path d="M 720,280 L 720,60 L 850,60 L 850,108 L 772,108 L 772,148 L 840,148 L 840,196 L 772,196 L 772,280 Z" />
        {/* R */}
        <path d="M 875,280 L 875,60 L 980,60 C 1025,60 1055,80 1055,125 C 1055,158 1035,180 1005,188 L 1065,280 L 1008,280 L 954,196 L 927,196 L 927,280 Z M 927,152 L 972,152 C 992,152 1004,142 1004,125 C 1004,108 992,98 972,98 L 927,98 Z" />
        {/* I */}
        <path d="M 1090,280 L 1090,60 L 1142,60 L 1142,280 Z" />
        {/* O */}
        <path d="M 1285,55 C 1355,55 1405,105 1405,170 C 1405,235 1355,285 1285,285 C 1215,285 1165,235 1165,170 C 1165,105 1215,55 1285,55 Z M 1285,102 C 1242,102 1218,132 1218,170 C 1218,208 1242,238 1285,238 C 1328,238 1352,208 1352,170 C 1352,132 1328,102 1285,102 Z" />
      </g>

      {/* Camada Frontal 3D com Degradê Metálico e Contorno Fino de Precisão */}
      <g
        fill="url(#wm3dFront)"
        stroke="#A8E4FC"
        strokeWidth="1.5"
        filter="url(#iceGlow)"
        className="wm-3d-group"
      >
        {/* M */}
        <path className="wm-letter" d="M 40,280 L 40,60 L 100,60 L 150,175 L 200,60 L 260,60 L 260,280 L 208,280 L 208,124 L 164,226 L 136,226 L 92,124 L 92,280 Z" />
        {/* A */}
        <path className="wm-letter" d="M 285,280 L 355,60 L 420,60 L 490,280 L 436,280 L 418,220 L 357,220 L 339,280 Z M 371,175 L 404,175 L 387.5,115 Z" />
        {/* X */}
        <path className="wm-letter" d="M 505,280 L 565,170 L 510,60 L 568,60 L 602,130 L 636,60 L 694,60 L 639,170 L 699,280 L 641,280 L 602,208 L 563,280 Z" />
        {/* F */}
        <path className="wm-letter" d="M 720,280 L 720,60 L 850,60 L 850,108 L 772,108 L 772,148 L 840,148 L 840,196 L 772,196 L 772,280 Z" />
        {/* R */}
        <path className="wm-letter" d="M 875,280 L 875,60 L 980,60 C 1025,60 1055,80 1055,125 C 1055,158 1035,180 1005,188 L 1065,280 L 1008,280 L 954,196 L 927,196 L 927,280 Z M 927,152 L 972,152 C 992,152 1004,142 1004,125 C 1004,108 992,98 972,98 L 927,98 Z" />
        {/* I */}
        <path className="wm-letter" d="M 1090,280 L 1090,60 L 1142,60 L 1142,280 Z" />
        {/* O */}
        <path className="wm-letter" d="M 1285,55 C 1355,55 1405,105 1405,170 C 1405,235 1355,285 1285,285 C 1215,285 1165,235 1165,170 C 1165,105 1215,55 1285,55 Z M 1285,102 C 1242,102 1218,132 1218,170 C 1218,208 1242,238 1285,238 C 1328,238 1352,208 1352,170 C 1352,132 1328,102 1285,102 Z" />
      </g>
    </svg>
  );
}

export default function Coverage() {
  return (
    <section id="cobertura" className="cov bg-dark section clip" data-bg="dark">
      <div className="cov-track" data-cov-track>
        <div className="sticky-stage cov-stage">
          {/* linha de bairros no topo */}
          <div className="cov-cities" data-cov-cities>
            <div className="container cov-cities-c">
              <div className="grid" style={{ alignItems: 'center' }}>
                <div className="g-col-4">
                  <h2 className="p5" data-reveal="lines" data-prevent-flicker="true">
                    Atendimento em
                    <br />Brasília e Entorno
                  </h2>
                </div>
                <div className="g-col-2 cov-cities-diagram" aria-hidden="true">
                  <div className="dg-line" />
                  <PlaneIcon />
                  <div className="dg-line" />
                </div>
                <div className="g-col-6">
                  <div className="cov-cities-loop" data-cov-mask>
                    <div className="loop-list" data-loop-words>
                      {BAIRROS.map((b) => (
                        <div className="loop-item" key={b}>
                          <h3 className="p5">{b}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* wordmark + esfera sobem durante o pin */}
          <div className="cov-title" data-cov-title aria-hidden="true">
            <Wordmark />
            <div className="cov-wordmark-sub">AR-CONDICIONADO</div>
          </div>
          <div className="cov-bot">
            <div className="cov-sphere-w" data-cov-sphere>
              <canvas className="cov-sphere" data-sphere aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* cartão de serviço */}
      <div className="container cov-factoid">
        <div className="factoid-card" data-reveal="children" data-prevent-flicker="true">
          <div className="factoid-stat">
            <div className="l1 text-frost">MAXFRIO EM BRASÍLIA</div>
            <div className="factoid-num">
              30+ <span>anos</span>
              <Barcode className="barcode" />
            </div>
            <div className="l1 text-frost">Experiência, honestidade e confiança desde 1994</div>
          </div>
          <div className="factoid-story">
            <p className="factoid-story__title">Cuidado técnico que atravessa gerações.</p>
            <p className="p7">
              Instalação, manutenção, higienização e reparo de ar-condicionado para casas,
              empresas e indústrias do Distrito Federal.
            </p>
            <div className="factoid-story__services" aria-label="Áreas de atuação">
              <span>Residencial</span><span>Comercial</span><span>Industrial</span>
            </div>
          </div>
        </div>
      </div>

      {/* contato / rodapé */}
      <footer className="foot" id="contato" data-foot-zone>
        <div className="container">
          <div className="foot-cta">
            <CtaButton data-pop-open="quote" data-foot-cta>
              Solicitar orçamento
            </CtaButton>
          </div>
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <SnowIcon size={38} />
                <div className="brand-lockup">
                  <span className="brand-lockup__name" style={{ fontSize: '1.45rem', lineHeight: 1 }}>
                    Max<span className="text-frost">Frio</span>
                  </span>
                  <span className="brand-lockup__sub" style={{ fontSize: '0.62rem', letterSpacing: '0.22em' }}>
                    ar-condicionado
                  </span>
                </div>
              </div>
              <div className="u-24" />
              <h2 className="h3 foot-title" data-reveal="lines" data-prevent-flicker="true">
                Precisa instalar ou cuidar do seu ar-condicionado?
              </h2>
              <div className="u-24" />
              <p className="p7" style={{ maxWidth: '46ch' }} data-reveal="children" data-prevent-flicker="true">
                Fale diretamente com nossa equipe para explicar sua necessidade e solicitar um
                orçamento sem compromisso.
              </p>
            </div>
            <div className="foot-contact-list" data-reveal="children" data-prevent-flicker="true">
              <h4 className="l1 text-frost">
                Para
                <br />
                orçamentos
              </h4>
              <HoverLink href="mailto:maxfrio710@gmail.com" textClass="p6">
                maxfrio710@gmail.com
              </HoverLink>
              <HoverLink href="tel:+556132736005" textClass="p6">
                (61) 3273-6005
              </HoverLink>
              <HoverLink href="https://wa.me/556132736005?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento." textClass="p6" target="_blank" rel="noreferrer">
                WhatsApp (61) 3273-6005
              </HoverLink>
            </div>
          </div>
          <div className="foot-legal">
            <div className="l1">
              © <span data-year>2026</span> MaxFrio Ar-Condicionado. Todos os direitos reservados.
            </div>
            <HoverLink href="#" textClass="l1">
              Brasília, DF e Entorno
            </HoverLink>
          </div>
        </div>
      </footer>
    </section>
  );
}

