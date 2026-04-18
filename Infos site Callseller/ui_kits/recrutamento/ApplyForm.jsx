// Closing CTA — substitui o formulário. Abre WhatsApp com mensagem pré-preenchida.
// Número: +55 51 98282-2431  →  wa.me/555198282431 (formato internacional sem símbolos)
function ApplyForm() {
  const waNumber  = '555198282431';
  const waMessage = encodeURIComponent('Olá! Quero me candidatar para a CallSeller.');
  const waHref    = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <section className="cs-section cs-section--apply" id="candidatar">
      <div className="cs-apply">
        <div className="cs-apply__left">
          <img src="../../assets/recrutamento-3d-dark.png" alt="Recrutamento"/>
          <h2 className="cs-apply__title">Pronto para começar?</h2>
          <p>Chama a gente direto no WhatsApp. Nossa equipe de recrutamento responde pessoalmente.</p>
          <ul className="cs-apply__list">
            <li><i data-lucide="check" /> Resposta em poucas horas</li>
            <li><i data-lucide="check" /> Conversa direta com um líder de vendas</li>
            <li><i data-lucide="check" /> Sem taxas, sem burocracia</li>
          </ul>
        </div>

        <div className="cs-apply__right">
          <div className="cs-apply__phone">
            <div className="cs-apply__phone-head">
              <span className="cs-apply__phone-dot" />
              <span className="cs-apply__phone-title">CallSeller · Recrutamento</span>
              <span className="cs-apply__phone-status">online</span>
            </div>
            <div className="cs-apply__bubble cs-apply__bubble--them">
              Oi! 👋 Aqui é do time de recrutamento da CallSeller.
            </div>
            <div className="cs-apply__bubble cs-apply__bubble--them">
              Manda um "oi" pra gente e já te passamos os próximos passos do processo.
            </div>
            <div className="cs-apply__bubble cs-apply__bubble--me">
              Quero me candidatar para a CallSeller.
            </div>
          </div>

          <a
            className="cs-btn cs-btn--whatsapp cs-btn--lg cs-btn--block"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i data-lucide="message-circle" />
            Chamar no WhatsApp
            <i data-lucide="arrow-up-right" />
          </a>

          <small className="cs-apply__phonenum">+55 (51) 98282-2431</small>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ApplyForm });
