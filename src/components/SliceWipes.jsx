/* ============================================================
   SLICE WIPE TRANSITION: Estilo Adidas
   Fatias diagonais que cobrem e revelam entre seções.
   Instâncias renderizadas pelo App.jsx, ancoradas ao topo do
   documento e ativadas via ScrollTrigger em scenes.js.
   ============================================================ */

export default function SliceWipes() {
  return (
    <>
      {/* Wipe 1: Hero → Remote Control */}
      <div className="slice-wipe" id="slice-wipe-hero" aria-hidden="true">
        <div className="slice-wipe__slice sw-s1" />
        <div className="slice-wipe__slice sw-s2" />
        <div className="slice-wipe__slice sw-s3" />
        <div className="slice-wipe__slice sw-s4" />
        <div className="slice-wipe__slice sw-s5" />
      </div>

      {/* Wipe 2: Remote Control → Intro 3D AC */}
      <div className="slice-wipe" id="slice-wipe-remote" aria-hidden="true">
        <div className="slice-wipe__slice sw-s1" />
        <div className="slice-wipe__slice sw-s2" />
        <div className="slice-wipe__slice sw-s3" />
        <div className="slice-wipe__slice sw-s4" />
        <div className="slice-wipe__slice sw-s5" />
      </div>
    </>
  );
}
