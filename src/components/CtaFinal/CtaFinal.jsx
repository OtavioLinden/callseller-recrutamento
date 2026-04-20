import { useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '../Icon';
import { WHATSAPP_URL } from '../../lib/constants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInView } from '../../hooks/useInView';

const Particles = lazy(() => import('./Particles').then(m => ({ default: m.Particles })));

function splitWords(text, reduced) {
  return text.split(' ').map((w, i) => (
    <span
      key={i}
      data-word
      className="inline-block mr-[0.25em]"
      style={{ opacity: reduced ? 1 : 0 }}
    >
      {w}
    </span>
  ));
}

export function CtaFinal() {
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { ref: inViewRef, isInView } = useInView({ once: true, threshold: 0.3 });

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('[data-word]');
      gsap.fromTo(words, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0,
        duration: 0.55, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
      const cta = sectionRef.current.querySelector('[data-cta-final]');
      if (cta) {
        gsap.fromTo(cta, { opacity: 0, scale: 0.9 }, {
          opacity: 1, scale: 1,
          duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="candidatar"
      ref={(el) => { sectionRef.current = el; inViewRef.current = el; }}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24 px-4 md:px-6"
    >
      {!reduced && isInView && (
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      )}

      <div className="relative z-10 text-center max-w-[900px] mx-auto">
        <div
          className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-6"
          data-word
          style={{ opacity: reduced ? 1 : 0 }}
        >
          Vagas abertas
        </div>

        <h2
          className="font-display font-extrabold uppercase text-cs-ink-900 leading-[1.02] mb-6"
          style={{
            fontSize: 'clamp(48px, 9vw, 128px)',
            letterSpacing: '-0.015em',
            textShadow: '0 0 50px rgba(31,181,38,0.4)',
          }}
        >
          <span className="block">{splitWords('Pronto pra', reduced)}</span>
          <span className="block">{splitWords('começar?', reduced)}</span>
        </h2>

        <p
          className="text-cs-ink-700 text-base md:text-lg max-w-[520px] mx-auto mb-10"
          data-word
          style={{ opacity: reduced ? 1 : 0 }}
        >
          Nos chame no WhatsApp que te explicamos os próximos passos.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-final
          data-cta="final"
          className="inline-flex items-center gap-3 px-10 py-6 bg-cs-green-500 text-cs-ink-0 rounded-xl font-extrabold uppercase tracking-[0.14em] !border-0 hover:bg-cs-green-400 hover:scale-[1.02] transition-all duration-200 ease-brand cs-pulse"
          style={{
            fontSize: 'clamp(16px, 2.2vw, 22px)',
            boxShadow: 'var(--glow-green-lg)',
            opacity: reduced ? 1 : 0,
          }}
        >
          Quero me candidatar
          <Icon name="arrow-up-right" size={22} />
        </a>

      </div>
    </section>
  );
}
