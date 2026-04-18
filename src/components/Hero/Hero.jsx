import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Icon } from '../Icon';
import { HeroCanvas } from './HeroCanvas';
import { ProofBar } from './ProofBar';
import { WHATSAPP_URL } from '../../lib/constants';
import { scrollToSelector } from '../../lib/smoothScroll';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const revealRef = useRef({ current: 0 });
  // single obj wrapper so gsap can tween revealRef.current
  const revealState = useRef({ v: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const ctasRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Proxy: canvas reads revealRef.current as a number; we expose an object with a getter
  const revealReadRef = useRef(0);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) setWebglSupported(false);
    } catch { setWebglSupported(false); }
  }, []);

  useEffect(() => {
    if (reduced) {
      revealReadRef.current = 1;
      [eyebrowRef, titleRef, leadRef, ctasRef].forEach(r => {
        if (r.current) {
          r.current.style.opacity = 1;
          r.current.style.transform = 'none';
        }
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(revealState.current, {
      v: 1,
      duration: 0.9,
      onUpdate: () => { revealReadRef.current = revealState.current.v; },
    });
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4);
    tl.fromTo(titleRef.current, { opacity: 0, y: 32, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 0.55);
    tl.fromTo(leadRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
    tl.fromTo(ctasRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);

    return () => { tl.kill(); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current.x += (x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (y - mouseRef.current.y) * 0.08;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  const handleVideoClick = (e) => {
    e.preventDefault();
    scrollToSelector('#operacao');
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cs-ink-0 pt-20 pb-12 px-4"
      id="hero"
    >
      {webglSupported && !reduced ? (
        <HeroCanvas revealRef={revealReadRef} mouseRef={mouseRef} />
      ) : (
        <img
          src="/assets/recrutamento-radial.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
        />
      )}

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div
          ref={eyebrowRef}
          className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-6"
          style={{ opacity: 0 }}
        >
          Recrutamento · CallSeller
        </div>

        <h1
          ref={titleRef}
          className="font-display font-extrabold uppercase text-cs-ink-900 leading-[0.95]"
          style={{
            fontSize: 'clamp(56px, 10vw, 144px)',
            letterSpacing: '-0.015em',
            opacity: 0,
            textShadow: '0 0 40px rgba(31,181,38,0.35)',
          }}
        >
          Trabalhe<br />Conosco.
        </h1>

        <p
          ref={leadRef}
          className="mt-8 max-w-[600px] mx-auto text-cs-ink-700 text-base sm:text-lg leading-relaxed"
          style={{ opacity: 0 }}
        >
          Somos uma operação de vendas de alta performance, referência nacional no Mercado Digital.
          Inseridos em um ecossistema que movimenta mais de <b className="text-cs-ink-900">R$ 1 Bilhão por ano</b>.
        </p>

        <div
          ref={ctasRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-cs-green-500 text-cs-ink-0 rounded-lg font-extrabold uppercase tracking-[0.14em] text-sm !border-0 hover:bg-cs-green-600 transition-all duration-150 ease-brand cs-pulse"
            style={{ boxShadow: 'var(--glow-green-md)' }}
            data-cta="hero"
          >
            Quero me candidatar
            <Icon name="arrow-up-right" size={18} />
          </a>
          <button
            type="button"
            onClick={handleVideoClick}
            className="inline-flex items-center gap-2 px-7 py-4 bg-transparent text-cs-ink-900 rounded-lg font-bold uppercase tracking-[0.14em] text-sm border border-white/20 hover:border-white/40 transition-all duration-150 ease-brand"
          >
            <Icon name="play-circle" size={20} />
            Assistir vídeo institucional
          </button>
        </div>

        <ProofBar />
      </div>
    </section>
  );
}
