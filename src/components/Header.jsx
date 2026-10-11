import { SnowIcon, CtaButton } from './bits.jsx';

export default function Header() {
  return (
    <header className="header" data-prevent-flicker="true">
      <div className="container">
        <div className="header_c">
          <a href="#hero" className="header_logo" data-menu-close>
            <SnowIcon />
            <span>
              Max<span className="text-frost">Frio</span>
            </span>
          </a>

          <div className="header_side">
            <a href="tel:+556132736005" className="link header_phone" data-hover="link">
              <span className="link_label">
                <span className="l1" data-hover-text>
                  (61) 3273-6005
                </span>
                <span className="l1 is-2" data-hover-text aria-hidden="true">
                  (61) 3273-6005
                </span>
              </span>
            </a>
            <CtaButton data-pop-open="quote">Orçamento</CtaButton>
            <button className="header_burger" data-menu-btn aria-label="Abrir menu">
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

