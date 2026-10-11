const BASE = import.meta.env.BASE_URL;

const CLIENTS = [
  { src: `${BASE}assets/clients/ACNUR.png`, alt: 'ACNUR' },
  { src: `${BASE}assets/clients/PSB.png`, alt: 'Partido Socialista Brasileiro' },
  { src: `${BASE}assets/clients/ambr.png`, alt: 'Associação Médica de Brasília' },
  { src: `${BASE}assets/clients/cebgas.png`, alt: 'CEBGas' },
  { src: `${BASE}assets/clients/clinicabrasilia.png`, alt: 'Clínica Brasília' },
  { src: `${BASE}assets/clients/hospitalpai.png`, alt: 'Hospital PAI' },
  { src: `${BASE}assets/clients/meneportella.png`, alt: 'Mene Portella' },
  { src: `${BASE}assets/clients/opas.png`, alt: 'Organização Pan-Americana da Saúde' },
];

export default function Clients() {
  return (
    <section id="clientes" className="clients section bg-light" data-bg="light">
      <div className="container">
        <div className="clients-head">
          <div>
            <div className="l1 text-dim">Confiança construída no atendimento</div>
            <h2 className="h3">Alguns de nossos clientes</h2>
          </div>
          <p className="p7 text-dim">Empresas e instituições que já confiaram seu conforto térmico à MaxFrio.</p>
        </div>
        <div className="clients-grid" data-reveal="children" data-prevent-flicker="true">
          {CLIENTS.map((client) => (
            <div className="client-logo" key={client.alt}>
              <img src={client.src} alt={client.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
