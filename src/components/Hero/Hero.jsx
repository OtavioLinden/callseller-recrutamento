import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Icon } from '../Icon';
import { HeroCanvas } from './HeroCanvas';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const revealState = useRef({ v: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const photoRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

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
      [eyebrowRef, titleRef, leadRef, photoRef].forEach(r => {
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
    tl.fromTo(photoRef.current, { opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 1.15);

    return () => { tl.kill(); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hasHover) {
      const onMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -((e.clientY / window.innerHeight) * 2 - 1);
        mouseRef.current.x += (x - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (y - mouseRef.current.y) * 0.08;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    }

    let raf = 0;
    const start = performance.now();
    const orbit = (now) => {
      const t = (now - start) / 1000;
      const angle = (t / 14) * Math.PI * 2;
      mouseRef.current.x = Math.cos(angle) * 0.55;
      mouseRef.current.y = Math.sin(angle) * 0.35;
      raf = requestAnimationFrame(orbit);
    };
    raf = requestAnimationFrame(orbit);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cs-ink-0 pt-16 pb-24 md:pb-28 px-4"
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

      {/* Mobile-only darkening shield */}
      <div className="cs-hero-shield" aria-hidden="true" />

      {/* Logo mark watermark — subtle behind hero content */}
      <img
        src="/assets/logo-mark-white.png"
        alt=""
        aria-hidden="true"
        className="cs-hero-watermark pointer-events-none"
      />

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
          Trabalhe<br />Conosco
        </h1>

        <p
          ref={leadRef}
          className="mt-8 max-w-[600px] mx-auto text-cs-ink-900 text-base sm:text-lg leading-relaxed font-medium"
          style={{ opacity: 0 }}
        >
          Operação de vendas de alta performance, referência nacional no Mercado Digital brasileiro.
        </p>

        <div
          ref={photoRef}
          className="relative mt-10 mx-auto w-full max-w-[420px] md:max-w-[480px] rounded-2xl overflow-hidden cs-hero-photo"
          style={{
            opacity: 0,
            boxShadow: 'inset 0 0 0 1px rgba(31,181,38,0.5), 0 0 0 1px rgba(31,181,38,0.25), 0 20px 60px rgba(0,0,0,0.6), var(--glow-green-sm)',
          }}
        >
          <img
            src="/assets/team-floor.jpeg"
            alt="Equipe CallSeller no chão de vendas"
            className="block w-full h-auto"
            style={{ filter: 'saturate(0.72) brightness(0.92) contrast(1.02)' }}
            loading="lazy"
          />
          {/* Dark overlay pra integrar com o tema */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0) 60%), linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%)',
            }}
          />
        </div>
      </div>

      {/* Scroll hint — só a setinha pulsando */}
      <div
        className="cs-scroll-hint absolute bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Icon name="chevron-down" size={22} className="text-cs-green-400 cs-bounce" />
      </div>
    </section>
  );
}
