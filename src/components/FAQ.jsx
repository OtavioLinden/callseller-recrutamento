import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

const FAQS = [
  {
    q: 'Preciso ter experiência em vendas pra me candidatar?',
    a: 'Não. Nós fornecemos o treinamento necessário pra você dominar nossa plataforma e metodologia, desde que você tenha o perfil e a vontade de aprender.',
  },
  {
    q: 'Como funciona o trabalho Home Office?',
    a: 'Você trabalha de onde quiser, precisando apenas de um computador, internet estável e um headset. Toda a comunicação e suporte são feitos de forma online.',
  },
  {
    q: 'Como sou acompanhado no dia a dia?',
    a: 'Nossos líderes de vendas acompanham a operação em tempo real, fornecendo feedbacks constantes e suporte pra que você atinja seus resultados.',
  },
  {
    q: 'Qual o próximo passo após enviar meu contato?',
    a: 'Nossa equipe de recrutamento avalia todos os perfis. Se o seu perfil estiver alinhado com o que buscamos, entraremos em contato pras próximas etapas.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Dúvidas
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors duration-200 ease-brand overflow-hidden ${
                  isOpen
                    ? 'border-cs-green-500/40 bg-cs-ink-100'
                    : 'border-white/5 bg-cs-ink-50 hover:border-white/10'
                }`}
                style={isOpen ? { boxShadow: 'var(--glow-green-sm)' } : undefined}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left !border-0"
                >
                  <span className="font-bold text-cs-ink-900 text-lg">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                    className="flex-shrink-0 text-cs-green-500"
                  >
                    <Icon name="plus" size={24} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-cs-ink-700 leading-loose">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
