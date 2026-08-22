export default function DataStrip() {
  return (
    <section className="data section bg-light" data-bg="light">
      <div className="container">
        <div className="u-24" />
        <div className="line-h" />
        <div className="grid" data-reveal="children" data-prevent-flicker="true">
          <div className="g-col-4 data-item-v">
            <div className="l1 text-dim">Bairros atendidos</div>
            <div className="h3" style={{ marginTop: '10px' }}>
              96+
            </div>
          </div>
          <div className="g-col-4 data-item-v">
            <div className="l1 text-dim">Base</div>
            <div className="h3" style={{ marginTop: '10px' }}>
              São Paulo, BR
            </div>
          </div>
          <div className="g-col-4 data-item-v a-right">
            <div className="l1 text-dim">Hora local</div>
            <div className="clock" data-clock style={{ marginTop: '10px' }}>
              --:--
            </div>
          </div>
        </div>
        <div className="u-24" />
        <div className="line-h" />
        <div className="u-24" />
      </div>
    </section>
  );
}
