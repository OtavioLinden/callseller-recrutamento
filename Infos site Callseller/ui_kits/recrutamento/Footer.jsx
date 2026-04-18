// Footer — minimal, logo + social + legal.
function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-footer__top">
        <img src="../../assets/logo-horizontal-white.png" alt="CallSeller" className="cs-footer__logo" />
        <nav>
          <a href="#quem-somos">Quem somos</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#processo">Processo</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="cs-footer__socials">
          <a href="#"><i data-lucide="instagram" /></a>
          <a href="#"><i data-lucide="linkedin" /></a>
          <a href="#"><i data-lucide="youtube" /></a>
        </div>
      </div>
      <div className="cs-footer__legal">
        <span>© {new Date().getFullYear()} CallSeller · Todos os direitos reservados</span>
        <span>Integrado à plataforma PagaH</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
