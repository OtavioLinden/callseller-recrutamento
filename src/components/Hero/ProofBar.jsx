import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { animateCount, formatCount } from '../../lib/countUp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ITEMS = [
  { template: 'HÁ + DE {n} ANOS DE OPERAÇÃO', value: 7,   animated: true },
  { template: '+{n} VENDEDORES NO BRASIL',    value: 100, animated: true },
  { template: '+R$ 7M RECUPERADOS/MÊS',       value: 7,   animated: false, staticText: '+R$ 7M RECUPERADOS/MÊS' },
];

export function ProofBar() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.4 });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-cs-ink-700 text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold"
    >
      {ITEMS.map((item, i) => (
        <ProofItem key={i} item={item} animate={isInView && !reduced} />
      ))}
    </div>
  );
}

function ProofItem({ item, animate }) {
  const [display, setDisplay] = useState(() => {
    if (!item.animated) return item.staticText;
    return item.template.replace('{n}', '0');
  });

  useEffect(() => {
    if (!item.animated) {
      setDisplay(item.staticText);
      return;
    }
    if (!animate) {
      setDisplay(item.template.replace('{n}', String(item.value)));
      return;
    }
    const cancel = animateCount({
      from: 0,
      to: item.value,
      duration: 1200,
      onTick: (v) => {
        const formatted = formatCount(v, 'plain', '');
        setDisplay(item.template.replace('{n}', formatted));
      },
    });
    return cancel;
  }, [animate, item]);

  return <span className="whitespace-nowrap">{display}</span>;
}
