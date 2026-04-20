import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { VideoPlayer } from './VideoPlayer';
import { useInView } from '../hooks/useInView';
import { animateCount, formatCount } from '../lib/countUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const BULLETS = [
  { icon: 'shield-check', title: 'Solidez',            copy: 'Operando desde 2017 com crescimento constante.' },
  { icon: 'award',        title: 'Autoridade',         copy: 'Referência reconhecida em conversão e vendas online.' },
  { icon: 'cpu',          title: 'Tecnologia própria', copy: 'Operação integrada à plataforma de pagamentos PagaH.' },
];

const STATS = [
  { label: 'Ecossistema anual', display: 'R$ 1 BILHÃO',    static: true },
  { label: 'Fundação',          display: '2017',           static: true },
  { label: 'Parceiros',         value: 50,  prefix: '+' },
  { label: 'Vendedores',        value: 100, prefix: '+' },
];

export function Operacao() {
  const baseUrl = import.meta.env.BASE_URL;
  const textRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const items = textRef.current.querySelectorAll('[data-reveal]');
      gsap.fromTo(items, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, textRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="operacao" className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <VideoPlayer
            src={`${baseUrl}videos/apresentacao1.mp4`}
            poster={`${baseUrl}assets/office-photo.jpeg`}
            mode="autoplay"
            ariaLabel="Vídeo institucional — conheça a CallSeller"
            className="aspect-video"
          />
        </div>

        <div ref={textRef} className="order-1 md:order-2">
          <div data-reveal className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Conheça a operação
          </div>
          <h2 data-reveal className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05] mb-6">
            A operação que faz<br />o mercado digital<br />vender mais
          </h2>
          <p data-reveal className="text-cs-ink-700 text-base md:text-lg leading-relaxed mb-8 max-w-[500px]">
            Somos especialistas em recuperação de vendas e aumento de ticket. Conectamos grandes produtores digitais aos seus clientes finais através da nossa tecnologia própria, a plataforma <b className="text-cs-ink-900">PagaH</b> — num ecossistema que movimenta mais de <b className="text-cs-ink-900">R$ 1 bilhão por ano</b>.
          </p>
          <ul className="space-y-4">
            {BULLETS.map(b => (
              <li key={b.title} data-reveal className="flex items-start gap-3">
                <Icon name={b.icon} size={24} className="text-cs-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cs-ink-900">{b.title}:</span>{' '}
                  <span className="text-cs-ink-700">{b.copy}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <StatsStrip />
    </section>
  );
}

function StatsStrip() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.3 });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="max-w-[1200px] mx-auto mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
    >
      {STATS.map((stat, i) => (
        <div key={i} className="flex flex-col gap-2">
          <StatNumber stat={stat} animate={isInView && !reduced} />
          <div className="text-xs text-cs-ink-600 uppercase tracking-[0.14em] font-bold">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function StatNumber({ stat, animate }) {
  const [text, setText] = useState(() => stat.static ? stat.display : `${stat.prefix || ''}0`);

  useEffect(() => {
    if (stat.static) {
      setText(stat.display);
      return;
    }
    if (!animate) {
      setText(`${stat.prefix || ''}${stat.value}`);
      return;
    }
    const cancel = animateCount({
      from: 0,
      to: stat.value,
      duration: 1000,
      onTick: (v) => setText(`${stat.prefix || ''}${formatCount(v, 'plain', '')}`),
    });
    return cancel;
  }, [animate, stat]);

  return (
    <div
      className="font-display font-extrabold uppercase text-cs-ink-900 leading-none"
      style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
    >
      {text}
    </div>
  );
}
