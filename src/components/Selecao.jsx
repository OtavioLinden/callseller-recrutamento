import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const STEPS = [
  { n: '01', icon: 'clipboard-check',      title: 'Avaliação de perfil', copy: 'Todas as candidaturas são analisadas diretamente pelos nossos líderes de vendas.' },
  { n: '02', icon: 'message-circle-more',  title: 'Feedback ativo',      copy: 'Mantemos um fluxo de retorno ativo após a coleta de informações.' },
  { n: '03', icon: 'eye',                  title: 'Transparência total', copy: 'Entrevistas abertas com nossos líderes. Você sai sabendo exatamente como a operação funciona.' },
];

export function Selecao() {
  const gridRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll('[data-step]'),
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="selecao" className="relative py-16 md:py-32 px-4 md:px-6 bg-cs-ink-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Nossa seleção
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05] mb-4">
            Foco nas pessoas
          </h2>
          <p className="text-cs-ink-700 max-w-[560px] mx-auto">
            Processo humano e transparente. Não buscamos um padrão — buscamos energia, comunicação e foco em solução.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(s => (
            <div
              key={s.n}
              data-step
              className="group relative p-8 rounded-2xl bg-cs-ink-100 border border-white/5 transition-all duration-200 ease-brand hover:border-cs-green-500/40 overflow-hidden"
            >
              <div
                className="absolute top-4 right-6 font-mono font-bold opacity-10 leading-none select-none pointer-events-none"
                style={{ fontSize: '72px', color: 'var(--cs-ink-1000)' }}
              >
                {s.n}
              </div>
              <div className="relative">
                <Icon name={s.icon} size={40} className="text-cs-green-500 mb-6" />
                <h3 className="font-bold text-cs-ink-900 text-xl mb-3">{s.title}</h3>
                <p className="text-cs-ink-700 leading-relaxed">{s.copy}</p>
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-brand pointer-events-none"
                style={{ boxShadow: 'var(--glow-green-sm)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
