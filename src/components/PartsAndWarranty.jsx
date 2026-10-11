export default function PartsAndWarranty() {
  return (
    <section
      id="venda-pecas"
      className="parts-section section bg-light"
      data-bg="light"
      aria-labelledby="parts-title"
    >
      <div className="container">
        {/* Cabeçalho da Seção */}
        <div className="parts-head">
          <div>
            <div className="parts-head__tag">
              <span className="parts-head__tag-dot" aria-hidden="true" />
              <span>Seminovos Revisados & Peças Usadas Testadas</span>
            </div>
            <div className="u-12" />
            <h2 id="parts-title" className="parts-head__title">
              Aparelhos seminovos e peças originais <span>com garantia.</span>
            </h2>
          </div>
          <p className="parts-head__desc">
            Economia inteligente com procedência comprovada: comercializamos aparelhos de ar-condicionado
            seminovos completamente revisados e peças originais usadas rigorosamente testadas em bancada pela equipe técnica da MaxFrio.
          </p>
        </div>

        {/* Grid de 2 Cards Principais: Aparelhos Seminovos & Peças Usadas */}
        <div className="parts-grid">
          {/* Card 1: Venda de Aparelhos Seminovos e Usados com Garantia */}
          <article className="parts-card">
            <div className="parts-card__header">
              <div className="parts-card__badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Garantia Técnica MaxFrio
              </div>
              <div className="parts-card__icon-box" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </div>
            </div>

            <h3 className="parts-card__title">Aparelhos de Ar-Condicionado Seminovos</h3>
            <p className="parts-card__text">
              Equipamentos seminovos e usados criteriosamente selecionados, submetidos a checklist técnico completo,
              higienização profunda e testes em bancada. Alto rendimento com economia de até 60% e garantia real de funcionamento.
            </p>

            {/* Marcas Homologadas */}
            <div className="parts-card__pills">
              {['Daikin', 'Fujitsu', 'Midea', 'Gree', 'LG', 'Samsung', 'Carrier', 'Elgin'].map((brand) => (
                <span className="parts-pill" key={brand}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="6" cy="6" r="3" />
                  </svg>
                  {brand}
                </span>
              ))}
            </div>

            {/* Diferenciais / Itens */}
            <ul className="parts-card__list">
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Testados e revisados em bancada:</strong> Verificação minuciosa do compressor, estanqueidade das serpentinas, placa eletrônica e teste de pressão antes da entrega.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Higienização química profunda:</strong> Evaporadora e condensadora 100% limpas e desinfetadas, garantindo ar puro e livre de fungos, bactérias ou odores.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Garantia formal MaxFrio:</strong> Tranquilidade total com garantia própria de funcionamento emitida pela nossa assistência técnica em Brasília.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Modelos de alta eficiência:</strong> Opções Split Hi-Wall, Inverter, Cassete e Piso-Teto para residências, escritórios e comércios do DF.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Instalação profissional disponível:</strong> Compre e conte com nossa equipe especializada para a instalação no local seguindo os padrões do fabricante.
                </span>
              </li>
            </ul>

            <div className="parts-card__footer">
              <button
                type="button"
                className="parts-btn"
                data-pop-open="quote"
                aria-label="Solicitar cotação de aparelho seminovo"
              >
                <span>Cotar Aparelho Seminovo</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </article>

          {/* Card 2: Peças Originais Usadas / Seminovas */}
          <article className="parts-card parts-card--alt">
            <div className="parts-card__header">
              <div className="parts-card__badge parts-card__badge--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                100% Peças Originais Testadas
              </div>
              <div className="parts-card__icon-box" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
            </div>

            <h3 className="parts-card__title">Peças Originais Usadas e Seminovas</h3>
            <p className="parts-card__text">
              Componentes genuínos de reposição retirados de aparelhos selecionados e 100% testados em bancada.
              A solução definitiva para recuperar seu equipamento com a confiabilidade da peça original do fabricante, sem adaptações paralelas e por um valor justo.
            </p>

            {/* Principais Componentes */}
            <div className="parts-card__pills">
              {['Placas Inverter', 'Compressores', 'Motores Ventiladores', 'Sensores', 'Serpentinas Cobre', 'Hélices & Turbinas', 'Válvulas'].map((part) => (
                <span className="parts-pill" key={part}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M2 6h8M6 2v8" />
                  </svg>
                  {part}
                </span>
              ))}
            </div>

            {/* Diferenciais / Itens */}
            <ul className="parts-card__list">
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>100% Originais e Genuínas:</strong> Peças de fábrica que preservam a integridade elétrica e o projeto original do seu equipamento.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Testadas em bancada técnica:</strong> Testes de circuito elétrico, amperagem, capacitância e resposta mecânica antes de qualquer liberação.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Garantia formal MaxFrio:</strong> Todas as peças seminovas são fornecidas com garantia técnica de funcionamento.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Solução para modelos fora de linha:</strong> Encontre peças raras ou descontinuadas que não existem mais ou custam preços abusivos nas autorizadas.
                </span>
              </li>
              <li className="parts-card__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <strong>Evite placas paralelas genéricas:</strong> Peças originais seminovas evitam sobrecargas e queimas prematuras do seu compressor.
                </span>
              </li>
            </ul>

            <div className="parts-card__footer">
              <button
                type="button"
                className="parts-btn parts-btn--alt"
                data-pop-open="quote"
                aria-label="Consultar peças seminovas de reposição"
              >
                <span>Consultar Peça Seminova</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </article>
        </div>

        {/* 4 Pilares de Garantia & Segurança */}
        <div className="parts-pillars">
          <div className="parts-pillar">
            <div className="parts-pillar__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h4 className="parts-pillar__title">Garantia Técnica MaxFrio</h4>
            <p className="parts-pillar__text">
              Aparelhos seminovos e peças usadas com garantia formal de funcionamento emitida pela nossa assistência.
            </p>
          </div>

          <div className="parts-pillar">
            <div className="parts-pillar__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h4 className="parts-pillar__title">Revisão Rigorosa em Bancada</h4>
            <p className="parts-pillar__text">
              Cada compressor, placa e unidade passa por checklist elétrico, teste de compressão e estanqueidade.
            </p>
          </div>

          <div className="parts-pillar">
            <div className="parts-pillar__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <h4 className="parts-pillar__title">100% Peças Genuínas</h4>
            <p className="parts-pillar__text">
              Mantemos a originalidade do projeto de fábrica sem adaptações perigosas ou placas universais genéricas.
            </p>
          </div>

          <div className="parts-pillar">
            <div className="parts-pillar__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h4 className="parts-pillar__title">Economia & Procedência</h4>
            <p className="parts-pillar__text">
              Economize até 60% com a segurança e a credibilidade de mais de 30 anos de experiência da MaxFrio no DF (desde 1994).
            </p>
          </div>
        </div>

        {/* Banner CTA */}
        <div className="parts-banner">
          <div className="parts-banner__info">
            <h4>Precisa de um ar-condicionado seminovo ou de uma peça usada com garantia?</h4>
            <p>
              Consulte nosso estoque de aparelhos revisados e peças originais testadas para pronta entrega em Brasília e DF.
            </p>
          </div>
          <div className="parts-banner__actions">
            <button
              type="button"
              className="parts-banner__btn-quote"
              data-pop-open="quote"
            >
              Solicitar Orçamento
            </button>
            <a
              href="https://wa.me/556132736005?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20aparelhos%20seminovos%20e%20pe%C3%A7as%20usadas%20com%20garantia"
              target="_blank"
              rel="noopener noreferrer"
              className="parts-banner__btn-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              WhatsApp (61) 3273-6005
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
