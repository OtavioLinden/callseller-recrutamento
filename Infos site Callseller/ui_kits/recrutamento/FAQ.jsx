// FAQ — accordion with green focus glow on open.
function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'Preciso ter experiência em vendas para me candidatar?',
      a: 'Não. Nós fornecemos o treinamento necessário para você dominar nossa plataforma e metodologia, desde que você tenha o perfil e a vontade de aprender.' },
    { q: 'Como funciona o trabalho Home Office?',
      a: 'Você trabalha de onde quiser, precisando apenas de um computador, internet estável e um headset. Toda a comunicação e suporte são feitos de forma online.' },
    { q: 'Como sou acompanhado no dia a dia?',
      a: 'Nossos líderes de vendas acompanham a operação em tempo real, fornecendo feedbacks constantes e suporte para que você consiga atingir seus resultados.' },
    { q: 'Qual o próximo passo após enviar meus dados?',
      a: 'Nossa equipe de recrutamento avalia todos os perfis. Se o seu perfil estiver alinhado com o que buscamos, entraremos em contato para as próximas etapas.' },
  ];
  return (
    <section className="cs-section" id="faq">
      <div className="cs-section__head">
        <div className="cs-eyebrow">FAQ</div>
        <h2 className="cs-section__title">Perguntas frequentes.</h2>
      </div>
      <div className="cs-faq">
        {items.map((it, i) => (
          <details key={i} open={open === i} onClick={(e)=>{e.preventDefault();setOpen(open===i?-1:i);}}>
            <summary>
              <span>{it.q}</span>
              <i data-lucide={open===i ? 'minus' : 'plus'} />
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { FAQ });
