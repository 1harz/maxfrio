const ITEMS = [
  {
    id: 'experiencia',
    title: 'Experiência que orienta',
    text: 'Desde 1994, há mais de 30 anos atendemos residências e empresas com uma avaliação clara da necessidade de cada ambiente.',
  },
  {
    id: 'equipe',
    title: 'Equipe preparada',
    text: 'Profissionais capacitados para trabalhar com segurança, conhecer as principais marcas e explicar o diagnóstico.',
  },
  {
    id: 'qualidade',
    title: 'Cuidado nos materiais',
    text: 'Peças originais ou de primeira linha nos reparos e tubulação de cobre nas instalações, conforme cada projeto.',
  },
  {
    id: 'atendimento',
    title: 'Tudo em um só lugar',
    text: 'Instalação, manutenção, higienização, consertos e orientação para escolher a solução certa para o seu espaço.',
  },
];

export default function Benefits() {
  return (
    <section id="vantagens" className="benefits-minimal section bg-light" data-bg="light" aria-labelledby="benefits-title">
      <div className="container">
        <div className="benefits-minimal__head">
          <p className="l1 text-dim">POR QUE MAXFRIO</p>
          <h2 id="benefits-title">Confiança se constrói <span>em cada detalhe.</span></h2>
          <p>Do primeiro diagnóstico ao serviço concluído, cada escolha importa para o conforto do seu ambiente.</p>
        </div>

        <div className="benefits-minimal__grid">
          {ITEMS.map((item, index) => (
            <article className="benefits-minimal__item" key={item.id}>
              <span className="benefits-minimal__number">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
