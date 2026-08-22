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
              <input id="q-zap" name="whatsapp" type="tel" placeholder="(11) 90000-0000" required />
            </div>
            <div className="field">
              <label className="l1" htmlFor="q-email">
                E-mail
              </label>
              <input id="q-email" name="email" type="email" placeholder="voce@email.com" />
            </div>
            <div className="field">
              <label className="l1" htmlFor="q-amb">
                Ambiente
              </label>
              <select id="q-amb" name="ambiente" defaultValue="Residencial">
                <option>Residencial</option>
                <option>Comercial</option>
                <option>Corporativo</option>
                <option>Industrial</option>
              </select>
            </div>
            <div className="field field--full">
              <label className="l1" htmlFor="q-msg">
                Mensagem
              </label>
              <textarea id="q-msg" name="mensagem" placeholder="Conte sobre o ambiente, área em m², quantidade de ambientes..." style={{ resize: 'none' }} />
            </div>
          </div>

          <label className="form-legal l1" htmlFor="q-legal">
            <input id="q-legal" type="checkbox" required />
            Ao enviar, você concorda com nossa política de privacidade.
          </label>

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
            Nossa equipe retorna em até 2h úteis com a melhor proposta de frio da cidade.
          </p>
        </div>
      </div>
    </div>
  );
}
