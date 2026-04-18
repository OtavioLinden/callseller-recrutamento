import * as LucideIcons from 'lucide-react';

export function Icon({ name, size = 24, className = '', ...rest }) {
  const pascal = name
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const Cmp = LucideIcons[pascal];
  if (!Cmp) {
    if (typeof console !== 'undefined') {
      console.warn(`[Icon] Unknown lucide icon: ${name} (resolved as ${pascal})`);
    }
    return null;
  }
  return (
    <Cmp
      size={size}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
}
