const MENU = [
  { n: '01', label: 'Sobre', href: '#sobre' },
  { n: '02', label: 'Serviços', href: '#servicos' },
  { n: '03', label: 'Equipamentos', href: '#equipamentos' },
  { n: '04', label: 'Diferenciais', href: '#vantagens' },
  { n: '05', label: 'Instalação', href: '#termos-instalacao' },
  { n: '06', label: 'Clientes', href: '#clientes' },
  { n: '07', label: 'Contato', href: '#contato' },
];


export default function MenuPopup() {
  return (
    <div className="menu" data-menu role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu_overlay" data-menu-close />
      <div className="menu_c">
        {MENU.map((item) => (
          <a className="menu_item" href={item.href} key={item.n} data-menu-close>
            <span className="l1">{item.n}</span>
            {item.label}
          </a>
        ))}
      </div>
      <div className="menu_foot">
        <span className="l1">maxfrio710@gmail.com</span>
        <span className="l1">(61) 3273-6005</span>
      </div>
    </div>
  );
}
