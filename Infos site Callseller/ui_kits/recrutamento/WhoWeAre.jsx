// "Quem é a CallSeller?" — institutional block with 3 pillar cards.
function WhoWeAre() {
  const pillars = [
    { icon: 'shield-check', title: 'Solidez',            body: 'Operando desde 2017 com crescimento constante.' },
    { icon: 'award',        title: 'Autoridade',         body: 'Referência reconhecida em conversão e vendas online.' },
    { icon: 'cpu',          title: 'Tecnologia Própria', body: 'Integrada à nossa plataforma de pagamentos, a PagaH.' },
  ];
  return (
    <section className="cs-section" id="quem-somos">
      <div className="cs-section__head">
        <div className="cs-eyebrow">Quem é a CallSeller</div>
        <h2 className="cs-section__title">Especialistas em recuperação<br/>de vendas e upsell.</h2>
        <p className="cs-section__lede">
          Conectamos grandes produtores digitais aos seus clientes finais através
          da nossa tecnologia própria, a plataforma <b>PagaH</b>.
        </p>
      </div>
      <div className="cs-pillars">
        {pillars.map(p => (
          <article className="cs-pillar" key={p.icon}>
            <div className="cs-pillar__icon"><i data-lucide={p.icon} /></div>
            <h3 className="cs-pillar__title">{p.title}</h3>
            <p className="cs-pillar__body">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { WhoWeAre });
