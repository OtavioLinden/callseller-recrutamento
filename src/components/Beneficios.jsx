import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const ITEMS = [
  { icon: 'globe',           title: 'Liberdade geográfica',    copy: 'Home Office 100% — trabalhe de onde quiser.' },
  { icon: 'trending-up',     title: 'Projeção de ganhos',      copy: 'Ganhos acima da média, compatíveis com a sua dedicação.' },
  { icon: 'trophy',          title: 'Valorização do resultado', copy: 'Reconhecimento real pra quem entrega o que é proposto.' },
  { icon: 'arrow-up-right',  title: 'Oportunidades internas',  copy: 'Espaço pra assumir novas responsabilidades conforme o desempenho.' },
];

export function Beneficios() {
  const gridRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll('[data-card]'),
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="beneficios" className="relative py-24 md:py-32 px-4 md:px-6 bg-cs-ink-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            O que você encontra
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            Vantagens de trabalhar conosco.
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(item => (
            <div
              key={item.title}
              data-card
              className="group relative p-8 rounded-2xl bg-cs-ink-100 border border-white/5 transition-all duration-200 ease-brand hover:border-cs-green-500/40"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-brand pointer-events-none"
                style={{ boxShadow: 'var(--glow-green-sm)' }}
              />
              <div className="relative">
                <Icon name={item.icon} size={40} className="text-cs-green-500 mb-6" />
                <h3 className="font-bold text-cs-ink-900 text-xl mb-3">{item.title}</h3>
                <p className="text-cs-ink-700 leading-relaxed">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
