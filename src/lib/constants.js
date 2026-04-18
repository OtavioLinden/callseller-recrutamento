const WHATSAPP_NUMBER = '555198282431';
const WHATSAPP_MESSAGE = 'Olá! Vi o site da CallSeller e tenho interesse em entrar pro time de vendas. Podem me passar os próximos passos?';

export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const NAV_LINKS = [
  { href: '#operacao', label: 'Operação' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#selecao', label: 'Processo' },
  { href: '#faq', label: 'FAQ' },
];
