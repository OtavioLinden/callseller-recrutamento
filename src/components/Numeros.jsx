import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { animateCount, formatCount } from '../lib/countUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const METRICS = [
  { kind: 'static',    display: '+7 ANOS',                         label: 'No mercado digital de alta performance' },
  { kind: 'static',    display: '+R$ 7M',                         label: 'Recuperados mensalmente' },
  { kind: 'animated',  value: 50,  prefix: '+',   suffix: '',     label: 'Parceiros impactados pela nossa tecnologia' },
  { kind: 'animated',  value: 100, prefix: '+',   suffix: '',     label: 'Vendedores atuando em todo o Brasil' },
];

export function Numeros() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.3 });
  const reduced = usePrefersReducedMotion();

  return (
    <section id="numeros" className="relative py-20 md:py-40 px-4 md:px-6 overflow-hidden">
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-brand ${isInView ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(31,181,38,0.15), transparent 60%)',
        }}
      />

      <div ref={ref} className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Por trás dos números
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            A CallSeller em números
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 text-center">
          {METRICS.map((m, i) => (
            <Metric key={i} metric={m} animate={isInView && !reduced} delay={i * 300} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ metric, animate, delay }) {
  const [display, setDisplay] = useState(() => {
    if (metric.kind === 'static') return metric.display;
    return `${metric.prefix}0`;
  });

  useEffect(() => {
    if (metric.kind === 'static') {
      setDisplay(metric.display);
      return;
    }
    if (!animate) {
      setDisplay(`${metric.prefix}${metric.value}`);
      return;
    }
    const timer = setTimeout(() => {
      animateCount({
        from: 0,
        to: metric.value,
        duration: 1200,
        onTick: (v) => setDisplay(`${metric.prefix}${formatCount(v, 'plain', '')}`),
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [animate, metric, delay]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="font-display font-extrabold uppercase text-cs-ink-900 leading-[0.9] break-words"
        style={{
          fontSize: 'clamp(36px, 5.5vw, 88px)',
          letterSpacing: '-0.015em',
          textShadow: '0 0 40px rgba(31,181,38,0.35)',
        }}
      >
        {display}
      </div>
      <div className="text-xs md:text-sm text-cs-ink-600 uppercase tracking-[0.14em] font-semibold max-w-[220px]">
        {metric.label}
      </div>
    </div>
  );
}
