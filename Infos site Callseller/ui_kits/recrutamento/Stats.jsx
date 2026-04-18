// "CALLSELLER EM NÚMEROS" — 4 large stat cards, one accented.
function Stats() {
  return (
    <section className="cs-section" id="numeros">
      <div className="cs-section__head">
        <div className="cs-eyebrow">Callseller em números</div>
        <h2 className="cs-section__title">A operação<br/>em escala.</h2>
      </div>
      <div className="cs-stats">
        <article className="cs-stat">
          <div className="cs-stat__ic"><i data-lucide="calendar" /></div>
          <div className="cs-stat__num">+7 anos</div>
          <div className="cs-stat__lab">de experiência no mercado digital</div>
        </article>
        <article className="cs-stat cs-stat--accent">
          <div className="cs-stat__ic"><i data-lucide="trending-up" /></div>
          <div className="cs-stat__num">+R$ 7M</div>
          <div className="cs-stat__lab">em vendas recuperadas / mês</div>
        </article>
        <article className="cs-stat">
          <div className="cs-stat__ic"><i data-lucide="handshake" /></div>
          <div className="cs-stat__num">+50</div>
          <div className="cs-stat__lab">parceiros impactados pela tecnologia</div>
        </article>
        <article className="cs-stat">
          <div className="cs-stat__ic"><i data-lucide="users" /></div>
          <div className="cs-stat__num">+100</div>
          <div className="cs-stat__lab">vendedores atuando em todo o Brasil</div>
        </article>
      </div>
    </section>
  );
}

Object.assign(window, { Stats });
