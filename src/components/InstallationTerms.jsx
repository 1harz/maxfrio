const INCLUDED = [
  'Tubulação de cobre de até 3 metros',
  'Isolamento térmico da linha frigorígena',
  'Suporte para a unidade externa',
  'Visita técnica para marcação e instalação, se necessária',
  'Instalação por profissionais capacitados',
  '12 meses de garantia no serviço prestado',
];

const NOT_INCLUDED = [
  'Cortes, rasgos ou recomposição de alvenaria',
  'Serviços ou adequações elétricas',
  'Desinstalação e retirada de aparelhos antigos',
  'Tubulação de alumínio',
  'Materiais excedentes aos itens e medidas informados',
];

export default function InstallationTerms() {
  return (
    <section id="termos-instalacao" className="terms section bg-dark" data-bg="dark">
      <div className="container">
        <div className="terms-head">
          <div className="l1 text-frost font-mono">[ INSTALAÇÃO SEM SURPRESAS ]</div>
          <h2 className="h2" data-reveal="lines" data-prevent-flicker="true">
            Tudo claro antes da instalação.
          </h2>
          <p className="p7 text-dim">
            Saiba o que está incluído, prepare o ambiente e alinhe qualquer necessidade específica
            com a nossa equipe antes do serviço.
          </p>
        </div>

        <div className="terms-grid" data-reveal="children" data-prevent-flicker="true">
          <article className="terms-card terms-card--included">
            <div className="terms-card-label font-mono">INCLUÍDO NO SERVIÇO</div>
            <h3 className="h4">Instalação essencial</h3>
            <ul>
              {INCLUDED.map((item) => (
                <li key={item}>
                  <span aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 7 3 3 6-6" /></svg></span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="terms-card terms-card--attention">
            <div className="terms-card-label font-mono">PONTOS DE ATENÇÃO</div>
            <h3 className="h4">Não incluído</h3>
            <ul>
              {NOT_INCLUDED.map((item) => <li key={item}><span aria-hidden="true">!</span>{item}</li>)}
            </ul>
          </article>
        </div>

        <div className="terms-full-copy">
          <div className="terms-full-copy__icon" aria-hidden="true">i</div>
          <div>
            <div className="l1 text-frost">CONDIÇÕES COMPLETAS</div>
            <p className="p7">
              Nosso serviço de instalação inclui todos os itens essenciais, como <strong>tubulação de cobre de até 3 metros</strong>,{' '}
              <strong>isolamento térmico</strong>, <strong>suporte para a unidade externa</strong>, e uma <strong>visita técnica</strong> para marcação
              e instalação, se necessário. A instalação é realizada por <strong>profissionais capacitados</strong> que conhecem as principais marcas
              do mercado, assegurando uma instalação eficiente e segura. Além disso, oferecemos <strong>12 meses de garantia</strong> no serviço
              prestado, proporcionando total tranquilidade.
            </p>
            <p className="p7">
              <strong>Importante:</strong> o serviço <strong>não inclui</strong> cortes em alvenaria, serviços elétricos ou a desinstalação de aparelhos
              antigos. A instalação também <strong>não é realizada</strong> com tubulação de alumínio, pois isso comprometeria a garantia do seu aparelho.
              Materiais extras, se necessários, serão cobrados à parte. Certifique-se de discutir todas as necessidades específicas com o técnico para
              garantir que o serviço atenda às suas expectativas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

