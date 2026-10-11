import { SnowIcon } from './bits.jsx';

const MENU = [
  { n: '01', label: 'Sobre', href: '#sobre' },
  { n: '02', label: 'Serviços', href: '#servicos' },
  { n: '03', label: 'Equipamentos', href: '#equipamentos' },
  { n: '04', label: 'Seminovos & Peças', href: '#venda-pecas' },
  { n: '05', label: 'Diferenciais', href: '#vantagens' },
  { n: '06', label: 'Instalação', href: '#termos-instalacao' },
  { n: '07', label: 'Clientes', href: '#clientes' },
  { n: '08', label: 'Contato', href: '#contato' },
];

export default function MenuPopup() {
  return (
    <div className="menu" data-menu role="dialog" aria-modal="true" aria-label="Menu de Navegação">
      <div className="menu_overlay" data-menu-close />
      
      {/* Barra superior do menu com logo e botão fechar */}
      <div className="menu_header">
        <a href="#hero" className="menu_logo" data-menu-close aria-label="Ir para o início">
          <SnowIcon />
          <div className="brand-lockup">
            <span className="brand-lockup__name">
              Max<span className="text-frost">Frio</span>
            </span>
            <span className="brand-lockup__sub">ar-condicionado</span>
          </div>
        </a>
        <button className="menu_close" data-menu-close aria-label="Fechar menu" type="button">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

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
