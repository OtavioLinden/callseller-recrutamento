import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { VideoPlayer } from './VideoPlayer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const BULLETS = [
  { icon: 'zap',        title: 'Agilidade',           copy: 'Foco em contato eficiente e execução diária.' },
  { icon: 'settings',   title: 'Domínio da operação', copy: 'Você aprenderá com perfeição a plataforma PagaH e os produtos.' },
  { icon: 'headphones', title: 'Suporte real',        copy: 'Avaliação constante e feedbacks em tempo real pro seu desenvolvimento.' },
];

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

export function Treinamento() {
  const baseUrl = import.meta.env.BASE_URL;
  const headlineRef = useRef(null);
  const contentRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const words = headlineRef.current.querySelectorAll('[data-word]');
      gsap.fromTo(words, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0,
        duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.fromTo(
        contentRef.current.querySelectorAll('[data-bullet]'),
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0,
          duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="treinamento" className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Metodologia de treinamento
          </div>
          <h2
            ref={headlineRef}
            className="font-display font-extrabold uppercase text-cs-ink-900 leading-[1.05]"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
          >
            <span className="block">{splitWords('Esqueça teorias intermináveis.', reduced)}</span>
            <span className="block text-cs-green-400 mt-2">{splitWords('Nós acreditamos no "fazer".', reduced)}</span>
          </h2>
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center">
          <VideoPlayer
            src={`${baseUrl}videos/apresentacao2.mp4`}
            poster={`${baseUrl}assets/recrutamento-radial.png`}
            mode="autoplay"
            ariaLabel="Vídeo — metodologia e estrutura de trabalho"
            className="aspect-video"
          />

          <ul className="space-y-6">
            {BULLETS.map(b => (
              <li key={b.title} data-bullet className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-cs-ink-100 border border-white/5 flex items-center justify-center"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
                >
                  <Icon name={b.icon} size={22} className="text-cs-green-500" />
                </span>
                <div>
                  <h3 className="font-bold text-cs-ink-900 text-lg mb-1">{b.title}</h3>
                  <p className="text-cs-ink-700 leading-relaxed">{b.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-20 md:mt-24">
          <p
            className="font-display font-extrabold uppercase text-cs-ink-900 inline-block"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              letterSpacing: '-0.015em',
              textShadow: '0 0 40px rgba(31,181,38,0.35)',
            }}
          >
            Nenhuma aula vence a prática
          </p>
        </div>
      </div>
    </section>
  );
}
