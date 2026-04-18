import { useEffect, useState } from 'react';
import { NAV_LINKS, WHATSAPP_URL } from '../lib/constants';
import { Icon } from './Icon';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-200 ease-brand
        ${scrolled ? 'backdrop-blur-xl bg-[rgba(10,12,10,0.65)] border-b border-white/5' : 'bg-transparent'}
      `}
      aria-label="Navegação principal"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2 !border-0" aria-label="CallSeller — início">
          <img src="/assets/logo-mark-white.png" alt="" className="h-8 w-auto" />
          <img src="/assets/logo-horizontal-white.png" alt="CallSeller" className="h-6 w-auto hidden sm:block" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-cs-ink-700 hover:text-cs-green-400 transition-colors duration-150 !border-0"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-cs-green-500 text-cs-ink-0 rounded-lg font-bold text-sm uppercase tracking-wider !border-0 hover:bg-cs-green-600 transition-all duration-150 ease-brand"
          style={{ boxShadow: 'var(--glow-green-sm)' }}
          data-cta="nav"
        >
          Quero me candidatar
          <Icon name="arrow-up-right" size={16} />
        </a>

        <button
          className="md:hidden p-2 text-cs-ink-900"
          onClick={() => setMobileOpen(o => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl bg-[rgba(10,12,10,0.95)] border-t border-white/5">
          <ul className="flex flex-col px-6 py-6 gap-4">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-cs-ink-800 hover:text-cs-green-400 !border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-cs-green-500 text-cs-ink-0 rounded-lg font-bold uppercase tracking-wider !border-0"
                style={{ boxShadow: 'var(--glow-green-md)' }}
                data-cta="nav-mobile"
                onClick={() => setMobileOpen(false)}
              >
                Quero me candidatar
                <Icon name="arrow-up-right" size={18} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
