export default function Preloader() {
  return (
    <div className="preloader" data-preloader aria-hidden="true">
      {/* CRT scan lines overlay */}
      <div className="pre-scanlines" />

      {/* Particle burst ring — animated via CSS */}
      <div className="pre-burst" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="pre-burst__shard" style={{ '--i': i }} />
        ))}
      </div>

      {/* Central snowflake that morphs into the logo */}
      <div className="pre-core">
        <div className="pre-snowflake" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none">
            <line x1="32" y1="4" x2="32" y2="60" stroke="#7FE3FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="4" y1="32" x2="60" y2="32" stroke="#7FE3FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11.5" y1="11.5" x2="52.5" y2="52.5" stroke="#7FE3FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="52.5" y1="11.5" x2="11.5" y2="52.5" stroke="#7FE3FF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Branch ticks */}
            <line x1="32" y1="4" x2="25" y2="11" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="32" y1="4" x2="39" y2="11" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="32" y1="60" x2="25" y2="53" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="32" y1="60" x2="39" y2="53" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="4" y1="32" x2="11" y2="25" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="4" y1="32" x2="11" y2="39" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="32" x2="53" y2="25" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="32" x2="53" y2="39" stroke="#7FE3FF" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        <div className="pre-wordmark preloader_title" data-split="chars">
          MAX<span className="text-frost">FRIO</span>
        </div>

        <div className="pre-sub preloader_sub font-mono">
          Conforto, experiência e confiança desde 2002
        </div>
      </div>

      {/* Cold wipe that exits the screen */}
      <div className="preloader_bg" data-preloader-bg>
        <div className="preloader_bg_grad" />
      </div>
    </div>
  );
}
