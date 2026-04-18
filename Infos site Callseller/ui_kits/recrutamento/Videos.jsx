// Videos section — "Conheça a CallSeller". 2 apresentações institucionais + 2 depoimentos.
// If a video file isn't available yet, shows a "em breve" placeholder instead of a broken <video>.
function Videos() {
  const [active, setActive] = React.useState(null);
  const [missing, setMissing] = React.useState({});

  const vids = [
    { id: 'p1', src: '/assets/videos/apresentacao1.mp4', kind: 'Apresentação', title: 'Quem é a CallSeller',              tag: 'Institucional · 01' },
    { id: 'd1', src: '/assets/videos/depoimento1.mp4',   kind: 'Depoimento',   title: 'Na voz de quem vende com a gente',  tag: 'Vendedor · 01' },
    { id: 'p2', src: '/assets/videos/apresentacao2.mp4', kind: 'Apresentação', title: 'Nossa metodologia por dentro',      tag: 'Institucional · 02' },
    { id: 'd2', src: '/assets/videos/depoimento2.mp4',   kind: 'Depoimento',   title: 'Resultados reais, operação real',   tag: 'Vendedor · 02' },
  ];

  return (
    <section className="cs-section cs-section--videos" id="video">
      <div className="cs-section__head">
        <div className="cs-eyebrow">Conheça a operação</div>
        <h2 className="cs-section__title">Veja a CallSeller<br/>por dentro.</h2>
        <p className="cs-section__lede">
          Duas apresentações institucionais e dois depoimentos de quem já está
          no time. Sem roteiro — do jeito que a operação acontece.
        </p>
      </div>
      <div className="cs-videos">
        {vids.map(v => {
          const isMissing = missing[v.id];
          return (
            <article
              key={v.id}
              className={
                'cs-video ' +
                (v.kind === 'Apresentação' ? 'cs-video--pitch' : 'cs-video--testi') +
                (active === v.id ? ' is-playing' : '') +
                (isMissing ? ' is-missing' : '')
              }
            >
              {!isMissing && (
                <video
                  src={v.src}
                  controls={active === v.id}
                  preload="metadata"
                  playsInline
                  onPlay={() => setActive(v.id)}
                  onPause={() => setActive(a => a === v.id ? null : a)}
                  onError={() => setMissing(m => ({ ...m, [v.id]: true }))}
                />
              )}
              {isMissing && (
                <div className="cs-video__placeholder">
                  <i data-lucide="video" />
                  <div className="cs-video__ph-title">Vídeo em breve</div>
                  <div className="cs-video__ph-path">{v.src.split('/').pop()}</div>
                </div>
              )}
              {!isMissing && active !== v.id && (
                <button
                  className="cs-video__play"
                  onClick={(e) => {
                    const vid = e.currentTarget.parentElement.querySelector('video');
                    if (vid) vid.play().catch(() => {});
                  }}
                  aria-label={'Reproduzir ' + v.title}
                >
                  <span className="cs-video__icon"><i data-lucide="play" /></span>
                </button>
              )}
              <div className="cs-video__meta">
                <span className="cs-video__tag">{v.tag}{isMissing ? ' · em breve' : ''}</span>
                <h3>{v.title}</h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

Object.assign(window, { Videos });
