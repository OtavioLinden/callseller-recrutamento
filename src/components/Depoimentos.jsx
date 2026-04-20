import { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';

export function Depoimentos() {
  const baseUrl = import.meta.env.BASE_URL;
  const videos = [
    { id: 'd1', src: `${baseUrl}videos/depoimento1.mp4`, tag: 'Vendedor CallSeller', name: 'Ramon' },
    { id: 'd2', src: `${baseUrl}videos/depoimento2.mp4`, tag: 'Vendedor CallSeller', name: 'Marcos' },
  ];

  const [activeId] = useState(null);

  return (
    <section id="depoimentos" className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Quem vende com a gente
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            Resultados reais<br />Operação real
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map(v => (
            <div
              key={v.id}
              className={`transition-opacity duration-300 ease-brand ${
                activeId && activeId !== v.id ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="aspect-[9/16] max-h-[600px] mx-auto w-full max-w-[340px]">
                <VideoPlayer
                  src={v.src}
                  mode="click"
                  ariaLabel={v.tag}
                  className="h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em]">{v.tag}</div>
                <div className="text-cs-ink-800 font-medium mt-1">{v.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
