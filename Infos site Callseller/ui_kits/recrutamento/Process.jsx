// Selection process ("NOSSA SELEÇÃO DE TALENTOS") — numbered stepper.
function Process() {
  const steps = [
    { n: '01', icon: 'clipboard-check',        title: 'Avaliação de Perfil',  body: 'Todas as candidaturas são analisadas diretamente por nossos líderes de vendas.' },
    { n: '02', icon: 'message-circle-check',   title: 'Feedback Ativo',       body: 'Valorizamos seu tempo. Mantemos um fluxo de retorno após a coleta de informações.' },
    { n: '03', icon: 'eye',                    title: 'Transparência Total',  body: 'Selecionados participam de entrevistas para entenderem 100% da empresa e do modelo.' },
  ];
  return (
    <section className="cs-section" id="processo">
      <div className="cs-section__head">
        <div className="cs-eyebrow">Processo seletivo</div>
        <h2 className="cs-section__title">Seleção humana.<br/>Transparente. Rápida.</h2>
        <p className="cs-section__lede">
          Não buscamos um padrão rígido — buscamos perfis com energia, boa
          comunicação e foco em solução.
        </p>
      </div>
      <ol className="cs-steps">
        {steps.map(s => (
          <li className="cs-step" key={s.n}>
            <div className="cs-step__num">{s.n}</div>
            <div className="cs-step__ic"><i data-lucide={s.icon} /></div>
            <div className="cs-step__body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

Object.assign(window, { Process });
