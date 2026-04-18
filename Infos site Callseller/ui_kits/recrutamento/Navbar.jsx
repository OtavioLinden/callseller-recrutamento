// Sticky top navigation bar — logo left, nav center (optional on mobile), primary CTA right.
function Navbar() {
  return (
    <header className="cs-nav">
      <a className="cs-nav__brand" href="#top">
        <img src="../../assets/logo-horizontal-white.png" alt="CallSeller" />
      </a>
      <nav className="cs-nav__links">
        <a href="#quem-somos">Quem somos</a>
        <a href="#beneficios">Benefícios</a>
        <a href="#processo">Processo</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="cs-btn cs-btn--primary cs-btn--sm" href="#candidatar">
        Quero me candidatar <i data-lucide="arrow-up-right" />
      </a>
    </header>
  );
}

Object.assign(window, { Navbar });
