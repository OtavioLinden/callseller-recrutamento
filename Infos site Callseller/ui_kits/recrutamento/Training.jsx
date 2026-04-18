// Training methodology + big-claim plate — "NENHUMA AULA VENCE A PRÁTICA."
function Training() {
  const items = [
    { icon: 'zap',        title: 'Agilidade',             body: 'Foco em contato eficiente e execução diária.' },
    { icon: 'settings',   title: 'Domínio da Operação',   body: 'Você aprenderá com perfeição a plataforma PagaH e os produtos.' },
    { icon: 'headphones', title: 'Suporte Real',          body: 'Avaliação constante e feedbacks em tempo real para o seu desenvolvimento.' },
  ];
  return (
    <section className="cs-section cs-section--dark" id="treinamento">
      <div className="cs-section__head">
        <div className="cs-eyebrow">Metodologia de treinamento</div>
        <h2 className="cs-section__title">Esqueça teorias intermináveis.<br/>Nós acreditamos no <em>"fazer".</em></h2>
        <p className="cs-section__lede">
          Trabalhamos com agilidade e contato rápido com o cliente. Por isso,
          nosso treinamento é <b>100% Hands-on (mão na massa).</b>
        </p>
      </div>
      <div className="cs-benefits">
        {items.map(it => (
          <article className="cs-benefit" key={it.icon}>
            <div className="cs-benefit__icon"><i data-lucide={it.icon} /></div>
            <h3 className="cs-benefit__title">{it.title}</h3>
            <p className="cs-benefit__body">{it.body}</p>
          </article>
        ))}
      </div>
      <div className="cs-bigclaim">
        <span>Nenhuma aula</span>
        <span className="cs-bigclaim__accent">vence a prática.</span>
      </div>
    </section>
  );
}

Object.assign(window, { Training });
