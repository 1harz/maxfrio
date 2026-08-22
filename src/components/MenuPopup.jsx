const MENU = [
  { n: '01', label: 'Sobre', href: '#sobre' },
  { n: '02', label: 'Engenharia', href: '#engenharia' },
  { n: '03', label: 'Equipamentos', href: '#equipamentos' },
  { n: '04', label: 'Vantagens', href: '#vantagens' },
  { n: '05', label: 'Cobertura', href: '#cobertura' },
  { n: '06', label: 'Contato', href: '#contato' },
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
        <span className="l1">contato@maxfrio.com.br</span>
        <span className="l1">+55 11 4000-2020</span>
      </div>
    </div>
  );
}
