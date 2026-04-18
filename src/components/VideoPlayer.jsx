import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Icon } from './Icon';

/**
 * VideoPlayer — dois modos, inline sempre (sem fullscreen).
 *  - mode="autoplay": video começa muted + loop quando entra na viewport.
 *    Botão verde "Clique pra ouvir" (speaker) no canto — click toggle mute/unmute.
 *  - mode="click": poster até o click; click começa a tocar inline com controls + audio.
 */
export function VideoPlayer({
  src,
  poster,
  mode = 'click',
  ariaLabel,
  className = '',
}) {
  const videoRef = useRef(null);
  const { ref: containerRef, isInView } = useInView({ threshold: 0.5 });
  const [started, setStarted] = useState(false);   // modo click: vídeo já foi iniciado?
  const [muted, setMuted] = useState(true);        // modo autoplay: audio mutado?

  useEffect(() => {
    if (mode !== 'autoplay') return;
    const vid = videoRef.current;
    if (!vid) return;
    if (isInView) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [mode, isInView]);

  // Toggle mute/unmute no modo autoplay
  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const nowMuted = !muted;
    vid.muted = nowMuted;
    setMuted(nowMuted);
    // Se desmutar, garante que está tocando (caso pausado por algum motivo)
    if (!nowMuted) {
      vid.play().catch(() => {});
    }
  };

  // Start inline playback (modo click)
  const startPlayback = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    vid.controls = true;
    vid.play().catch(() => {});
    setStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-black ${className}`}
      style={{ boxShadow: 'inset 0 0 0 1px var(--cs-green-500)' }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover block"
        muted
        {...(mode === 'autoplay' ? { loop: true } : {})}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={ariaLabel}
        src={src}
      />

      {mode === 'click' && !started && (
        <button
          type="button"
          onClick={startPlayback}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/0 transition-colors duration-200 ease-brand group cs-scanline"
          aria-label={`Reproduzir ${ariaLabel}`}
        >
          <span
            className="flex items-center justify-center w-20 h-20 rounded-full bg-cs-green-500 group-hover:scale-105 transition-transform duration-200 ease-brand"
            style={{ boxShadow: 'var(--glow-green-md)' }}
          >
            <Icon name="play" size={32} className="text-cs-ink-0 ml-1" />
          </span>
        </button>
      )}

      {mode === 'autoplay' && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-4 right-4 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-cs-green-500 text-cs-ink-0 font-bold text-xs uppercase tracking-[0.14em] hover:bg-cs-green-400 hover:scale-[1.03] transition-all duration-150 ease-brand !border-0"
          style={{ boxShadow: 'var(--glow-green-sm)' }}
          aria-label={muted ? `Clique pra ouvir: ${ariaLabel}` : `Silenciar: ${ariaLabel}`}
        >
          <Icon name={muted ? 'volume-x' : 'volume-2'} size={16} className="text-cs-ink-0" />
          <span>{muted ? 'Clique pra ouvir' : 'Silenciar'}</span>
        </button>
      )}
    </div>
  );
}
