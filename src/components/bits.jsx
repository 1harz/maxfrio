/* Bits reutilizáveis: floco de marca, link com roll, seta. */

export function SnowIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
        <path d="M32 8v48M12.4 19.3l39.2 25.4M51.6 19.3L12.4 44.7" />
        <path d="M32 8l-7 7M32 8l7 7M32 56l-7-7M32 56l7-7" />
        <path d="M12.4 19.3l9.6 2.5M12.4 19.3l-2.5 9.6M51.6 44.7l-9.6-2.5M51.6 44.7l2.5-9.6" />
        <path d="M12.4 44.7l9.6-2.5M12.4 44.7l-2.5-9.6M51.6 19.3l-9.6 2.5M51.6 19.3l2.5 9.6" />
      </g>
    </svg>
  );
}

export function ArrowDownIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v16m0 0l-6-6m6 6l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlaneIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 4h16M7 12h4m-4 5l-2 3m10-3l2 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* link com rolagem de caracteres no hover */
export function HoverLink({ href = '#', className = '', textClass = 'l1', children, ...rest }) {
  const label = String(children);
  return (
    <a href={href} className={`link ${className}`} data-hover="link" {...rest}>
      <span className="link_label">
        <span className={textClass} data-hover-text>
          {label}
        </span>
        <span className={`${textClass} is-2`} data-hover-text aria-hidden="true">
          {label}
        </span>
      </span>
    </a>
  );
}

/* botão CTA com rótulo rolando e ícone animado */
export function CtaButton({ children, className = '', ...rest }) {
  const label = String(children);
  return (
    <button type="button" className={`btn-cta ${className}`} data-hover="cta" {...rest}>
      <span className="btn-cta_label">
        <span data-hover-text>{label}</span>
        <span className="is-2" data-hover-text aria-hidden="true">
          {label}
        </span>
      </span>
      <span className="btn-cta_ico">
        <svg data-hover-ico viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 1v14M1 8h14M3 3l10 10M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}

/* código de barras decorativo (fator humano -> cartão de serviço) */
export function Barcode({ className = '' }) {
  const bars = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2];
  let x = 0;
  return (
    <svg className={className} viewBox="0 0 120 128" fill="none" aria-hidden="true" preserveAspectRatio="none">
      {bars.map((w, i) => {
        const el = <rect key={i} x={x} y={0} width={w * 0.9} height={i % 4 === 0 ? 128 : 112} fill="currentColor" />;
        x += w + 1.2;
        return el;
      })}
    </svg>
  );
}
