export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function formatCount(value, format, prefix = '') {
  const rounded = Math.round(value);
  switch (format) {
    case 'integer':
      return `${prefix}${rounded.toLocaleString('pt-BR')}`;
    case 'currency-millions': {
      const millions = Math.round(rounded / 1_000_000);
      return `R$ ${millions} MILHÕES`;
    }
    case 'years':
      return `${rounded} ${rounded === 1 ? 'ANO' : 'ANOS'}`;
    case 'plain':
    default:
      return `${prefix}${rounded}`;
  }
}

export function animateCount({ from = 0, to, duration = 800, onTick, onDone }) {
  const start = performance.now();
  let raf = 0;
  const step = (now) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);
    const current = from + (to - from) * eased;
    onTick(current);
    if (t < 1) {
      raf = requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}
