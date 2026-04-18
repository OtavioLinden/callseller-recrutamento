// Benefits — "O QUE VOCÊ ENCONTRA" — 4-up card grid with large Lucide icons.
function Benefits() {
  const items = [
    { icon: 'globe',          title: 'Liberdade Geográfica', body: 'Trabalho 100% Home Office. Trabalhe de onde quiser.' },
    { icon: 'trending-up',    title: 'Projeção de Ganhos',   body: 'Possibilidade de ganhos acima da média, compatíveis com a sua dedicação.' },
    { icon: 'trophy',         title: 'Valorização do Resultado', body: 'Reconhecimento real para quem entrega o que é proposto.' },
    { icon: 'arrow-up-right', title: 'Oportunidades Internas',   body: 'Espaço para assumir novas responsabilidades conforme o seu desempenho.' },
  ];
  return (
    <section className="cs-section cs-section--inset" id="beneficios">
      <div className="cs-section__head">
        <div className="cs-eyebrow">Trabalhando com a gente</div>
        <h2 className="cs-section__title">O que você encontra<br/>ao trabalhar conosco.</h2>
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
    </section>
  );
}

Object.assign(window, { Benefits });
