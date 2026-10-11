import { CtaButton, SnowIcon } from './bits.jsx';

export default function QuotePopup() {
  return (
    <div className="pop" data-pop="quote" role="dialog" aria-modal="true" aria-label="Solicitar orçamento">
      <div className="pop_overlay" data-pop-close />

      <div className="pop_modal" data-pop-modal>
        <button className="pop_close" data-pop-close data-pop-close-btn aria-label="Fechar">
          <svg viewBox="0 0 14 14" width="14" height="14">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div className="l1 text-dim">Orçamento sem compromisso</div>
        <div className="u-12" />
        <h3 className="h4">Fale com um especialista</h3>

        <form>
          <div className="form-grid">
            <div className="field">
              <label className="l1" htmlFor="q-nome">
                Nome
              </label>
              <input id="q-nome" name="nome" type="text" placeholder="Seu nome" required />
            </div>
            <div className="field">
              <label className="l1" htmlFor="q-zap">
                WhatsApp
              </label>
              <input id="q-zap" name="whatsapp" type="tel" placeholder="(61) 90000-0000" required />
            </div>
            <div className="field">
              <label className="l1" htmlFor="q-email">
                E-mail
              </label>
              <input id="q-email" name="email" type="email" placeholder="voce@email.com" />
            </div>
            <div className="field">
              <label className="l1" htmlFor="q-amb">
                Tipo de interesse
              </label>
              <select id="q-amb" name="ambiente" defaultValue="Residencial">
                <option value="Aparelho Seminovo com Garantia">Aparelho Seminovo (com garantia)</option>
                <option value="Peças Originais Seminovas">Peças Originais Seminovas (Testadas em Bancada)</option>
                <option value="Instalação Residencial">Instalação Residencial</option>
                <option value="Instalação Comercial">Instalação Comercial / Corporativa</option>
                <option value="Manutenção e Conserto">Manutenção ou Conserto de Ar-Condicionado</option>
                <option value="Higienização Completa">Higienização Completa</option>
              </select>
            </div>
            <div className="field field--full">
              <label className="l1" htmlFor="q-msg">
                Mensagem
              </label>
              <textarea id="q-msg" name="mensagem" placeholder="Conte sobre o que precisa: aparelho seminovo, peça original revisada ou serviço no seu ambiente..." style={{ resize: 'none' }} />
            </div>
          </div>

          <p className="form-legal l1">Ao enviar, sua solicitação será aberta diretamente no WhatsApp da MaxFrio.</p>

          <div className="u-24" />
          <CtaButton data-form-btn>Enviar pedido</CtaButton>
        </form>

        {/* painel de sucesso */}
        <div className="pop_success" data-pop-success>
          <button className="pop_close" data-pop-close data-pop-close-btn aria-label="Fechar">
            <svg viewBox="0 0 14 14" width="14" height="14">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <SnowIcon size={44} />
          <div className="l1 text-frost">Pedido enviado</div>
          <h3 className="h3">Obrigado!</h3>
          <p className="p7" style={{ maxWidth: '38ch' }}>
            Sua solicitação foi preparada no WhatsApp. Envie a mensagem para iniciar o atendimento.
          </p>
        </div>
      </div>
    </div>
  );
}
