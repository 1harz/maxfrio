/* Blueprint técnico inline — os traços precisam estar no DOM
   para a animação de desenho (stroke-dashoffset via pathLength=1). */
export default function BlueprintSvg() {
  return (
    <svg className="prod-blueprint" data-blueprint viewBox="0 0 1200 640" fill="none" aria-hidden="true">
      <g stroke="#33506B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* contorno da unidade */}
        <path className="bp-main" pathLength="1" d="M140 96 H980 Q1016 96 1016 132 V388 Q1016 424 980 424 H140 Q104 424 104 388 V132 Q104 96 140 96 Z" stroke="#2A4B68" strokeWidth="3" />
        {/* linha da tampa */}
        <path className="bp-main" pathLength="1" d="M104 352 H1016" strokeDasharray="1 .012" />
        {/* grade superior */}
        <path className="bp-grid" pathLength="1" d="M150 128 H970" strokeDasharray=".008 .016" strokeOpacity=".7" />
        <path className="bp-grid" pathLength="1" d="M150 152 H970" strokeDasharray=".008 .016" strokeOpacity=".7" />
        <path className="bp-grid" pathLength="1" d="M150 176 H970" strokeDasharray=".008 .016" strokeOpacity=".7" />
        {/* serpentina do evaporador */}
        <path className="bp-main" pathLength="1" d="M170 220 L170 320 M230 220 L230 320 M290 220 L290 320 M350 220 L350 320 M410 220 L410 320 M470 220 L470 320 M530 220 L530 320" strokeOpacity=".8" />
        <path className="bp-main" pathLength="1" d="M170 230 H530 M170 268 H530 M170 306 H530" strokeOpacity=".45" />
        {/* turbina */}
        <circle className="bp-main" pathLength="1" cx="760" cy="268" r="74" strokeOpacity=".9" />
        <circle className="bp-grid" pathLength="1" cx="760" cy="268" r="50" strokeDasharray=".006 .01" strokeOpacity=".55" />
        <path className="bp-main" pathLength="1" d="M760 268 L760 200 M760 268 L818 302 M760 268 L702 302" strokeOpacity=".8" />
        <circle className="bp-main" pathLength="1" cx="760" cy="268" r="8" strokeOpacity=".9" />
        {/* display */}
        <rect className="bp-main" pathLength="1" x="912" y="204" width="70" height="44" rx="8" strokeOpacity=".75" />
        {/* venezianas */}
        <path className="bp-grid" pathLength="1" d="M140 380 H980" strokeDasharray=".004 .008" strokeOpacity=".8" />
        <path className="bp-grid" pathLength="1" d="M140 398 H980" strokeDasharray=".004 .008" strokeOpacity=".6" />
        {/* fluxo de ar */}
        <path className="bp-flow" pathLength="1" d="M240 424 C260 470 320 500 420 512" stroke="#4FA8DC" strokeWidth="2.5" strokeDasharray=".05 .03" />
        <path className="bp-flow" pathLength="1" d="M480 424 C500 478 560 510 660 522" stroke="#4FA8DC" strokeWidth="2.5" strokeDasharray=".05 .03" />
        <path className="bp-flow" pathLength="1" d="M720 424 C740 470 800 498 900 510" stroke="#4FA8DC" strokeWidth="2.5" strokeDasharray=".05 .03" />
        <path className="bp-arrow" pathLength="1" d="M420 512 l-26 -6 M420 512 l-4 -26" stroke="#4FA8DC" strokeWidth="2.5" />
        <path className="bp-arrow" pathLength="1" d="M660 522 l-26 -6 M660 522 l-4 -26" stroke="#4FA8DC" strokeWidth="2.5" />
        <path className="bp-arrow" pathLength="1" d="M900 510 l-26 -6 M900 510 l-4 -26" stroke="#4FA8DC" strokeWidth="2.5" />
        {/* linha de refrigeração até condensadora */}
        <path className="bp-main" pathLength="1" d="M1016 340 H1074 V560 H960" strokeOpacity=".8" />
        <rect className="bp-main" pathLength="1" x="860" y="548" width="100" height="64" rx="8" strokeOpacity=".8" />
        <path className="bp-grid" pathLength="1" d="M874 596 H946" strokeDasharray=".008 .012" strokeOpacity=".6" />
        {/* cotas */}
        <path className="bp-dim" pathLength="1" d="M104 60 H1016" strokeOpacity=".65" />
        <path className="bp-dim" pathLength="1" d="M104 52 V68 M1016 52 V68" strokeOpacity=".65" />
        <path className="bp-dim" pathLength="1" d="M1148 96 V424" strokeOpacity=".65" />
        <path className="bp-dim" pathLength="1" d="M1140 96 H1156 M1140 424 H1156" strokeOpacity=".65" />
        <path className="bp-dim" pathLength="1" d="M64 96 V424" strokeOpacity=".65" />
        <path className="bp-dim" pathLength="1" d="M56 96 H72 M56 424 H72" strokeOpacity=".65" />
      </g>

      <g fontFamily="Arial, Helvetica, sans-serif" fontSize="19" letterSpacing="2.5" fill="#33506B">
        <text x="560" y="46" textAnchor="middle" fontWeight="700">912 mm</text>
        <text x="1160" y="266" textAnchor="middle" transform="rotate(90 1160 266)" fontWeight="700">320 mm</text>
        <text x="38" y="266" textAnchor="middle" transform="rotate(-90 38 266)" fontWeight="700">282</text>
        <text x="560" y="590" textAnchor="middle" opacity=".8" letterSpacing="4">UNIDADE INTERNA SPLIT · REFERÊNCIA TÉCNICA</text>
      </g>
      <g fontFamily="Arial, Helvetica, sans-serif" fontSize="16" letterSpacing="2" fill="#4FA8DC">
        <text x="180" y="552">FLUXO 8,4 m³/min</text>
      </g>
    </svg>
  );
}
