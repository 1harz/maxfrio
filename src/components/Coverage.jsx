import { PlaneIcon, HoverLink, CtaButton, Barcode, SnowIcon } from './bits.jsx';

const BAIRROS = [
  'Jardins',
  'Itaim Bibi',
  'Pinheiros',
  'Vila Mariana',
  'Moema',
  'Vila Madalena',
  'Brooklin',
  'Morumbi',
  'Perdizes',
  'Pacaembu',
  'Higienópolis',
  'Santana',
  'Tatuapé',
  'Barra Funda',
  'Butantã',
  'Alphaville',
  'Granja Viana',
  'Santo André',
  'São Bernardo',
  'São Caetano',
  'Santos',
  'Guarujá',
  'Campinas',
  'Jundiaí',
  'Sorocaba',
  'Barueri',
  'Osasco',
  'Taboão da Serra',
  'Santo Amaro',
  'Água Branca',
];

/* wordmark MAXFRIO monoline — desenhado pelo scroll */
function Wordmark() {
  return (
    <svg className="cov-wordmark" data-wordmark-svg viewBox="0 0 1440 360" fill="none" aria-label="MaxFrio">
      <defs>
        <linearGradient id="wmgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8DDF9" stopOpacity=".95" />
          <stop offset=".45" stopColor="#7CC8F0" stopOpacity=".55" />
          <stop offset="1" stopColor="#4FA8DC" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="url(#wmgrad)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
        <path className="wm-letter" pathLength="1" d="M30 300V60L115 205L200 60V300" />
        <path className="wm-letter" pathLength="1" d="M235 300L320 60L405 300" />
        <path className="wm-letter" pathLength="1" d="M277 214h86" />
        <path className="wm-letter" pathLength="1" d="M440 60L610 300" />
        <path className="wm-letter" pathLength="1" d="M610 60L440 300" />
        <path className="wm-letter" pathLength="1" d="M665 300V60H815" />
        <path className="wm-letter" pathLength="1" d="M665 176h130" />
        <path className="wm-letter" pathLength="1" d="M850 300V60H928Q1000 60 1000 117Q1000 174 928 174H850" />
        <path className="wm-letter" pathLength="1" d="M912 174L996 300" />
        <path className="wm-letter" pathLength="1" d="M1075 60V300" />
        <path className="wm-letter" pathLength="1" d="M1045 60h60M1045 300h60" />
        <ellipse className="wm-letter" pathLength="1" cx="1245" cy="180" rx="85" ry="120" />
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
                    Atendemos onde
                    <br />
                    o calor chegar
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
          <div className="factoid-num">
            12 mil+
            <Barcode className="barcode" />
          </div>
          <div className="u-12" />
          <div className="l1 text-frost">Instalações realizadas com precisão</div>
          <div className="u-36" />
          <p className="p7" style={{ maxWidth: '56ch' }}>
            Cada projeto segue norma ABNT, termo de garantia e checklist fotográfico — do primeiro
            orçamento ao pós-venda que continua ano após ano.
          </p>
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
              <SnowIcon size={40} />
              <div className="u-24" />
              <h2 className="h3 foot-title" data-reveal="lines" data-prevent-flicker="true">
                Pronto para o verão mais fresco da sua vida?
              </h2>
              <div className="u-24" />
              <p className="p7" style={{ maxWidth: '46ch' }} data-reveal="children" data-prevent-flicker="true">
                Resposta em até 2h úteis, visita técnica gratuita e orçamento fechado — sem letra
                miúda.
              </p>
            </div>
            <div className="foot-contact-list" data-reveal="children" data-prevent-flicker="true">
              <h4 className="l1 text-frost">
                Para
                <br />
                orçamentos
              </h4>
              <HoverLink href="mailto:contato@maxfrio.com.br" textClass="p6">
                contato@maxfrio.com.br
              </HoverLink>
              <HoverLink href="tel:+551140002020" textClass="p6">
                +55 11 4000-2020
              </HoverLink>
              <HoverLink href="https://wa.me/5511940002020" textClass="p6">
                WhatsApp +55 11 94000-2020
              </HoverLink>
            </div>
          </div>
          <div className="foot-legal">
            <div className="l1">
              © <span data-year>2026</span> MaxFrio Climatização. Todos os direitos reservados.
            </div>
            <HoverLink href="#" textClass="l1">
              Política de privacidade
            </HoverLink>
          </div>
        </div>
      </footer>
    </section>
  );
}
