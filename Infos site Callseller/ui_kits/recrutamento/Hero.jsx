// Hero — the "TRABALHE CONOSCO" plate. Green glow behind, radial backdrop, dual CTA.
function Hero() {
  return (
    <section className="cs-hero" id="top">
      <div className="cs-hero__bg" />
      <div className="cs-hero__inner">
        <div className="cs-eyebrow">Recrutamento · CallSeller</div>
        <h1 className="cs-hero__title">
          Trabalhe<br/>conosco.
        </h1>
        <p className="cs-hero__lede">
          Somos uma operação de vendas de alta performance, referência nacional
          no Mercado Digital. Inseridos em um ecossistema que movimenta mais de
          {' '}<b>R$ 1 Bilhão por ano</b>.
        </p>
        <div className="cs-hero__cta">
          <a className="cs-btn cs-btn--primary cs-btn--lg" href="#candidatar">
            Quero me candidatar <i data-lucide="arrow-up-right" />
          </a>
          <a className="cs-btn cs-btn--secondary cs-btn--lg" href="#video">
            <i data-lucide="play-circle" /> Assistir vídeo institucional
          </a>
        </div>
        <div className="cs-hero__proof">
          <span><b>+7 anos</b> de operação</span>
          <span className="sep" />
          <span><b>+100</b> vendedores no Brasil</span>
          <span className="sep" />
          <span><b>+R$ 7M</b> recuperados/mês</span>
        </div>
      </div>
      <img className="cs-hero__plate" src="../../assets/recrutamento-radial.png" alt="" />
    </section>
  );
}

Object.assign(window, { Hero });
