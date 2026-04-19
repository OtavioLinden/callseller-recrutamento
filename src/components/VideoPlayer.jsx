import { useEffect, useId, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Icon } from './Icon';

/**
 * VideoPlayer — dois modos, sempre inline (sem fullscreen).
 *
 *  - mode="autoplay": vídeo começa muted + loop quando entra na viewport.
 *    Click 1 = ativa som + rebobina. Click 2 = pausa. Click 3 = retoma.
 *    Indicador de estado (volume/pause/play) discreto no canto superior direito.
 *
 *  - mode="click": poster até o primeiro click. Click play = começa a tocar
 *    com áudio + controles nativos. Subsequentes clicks usam controles nativos.
 *
 * REGRA GLOBAL: só UM vídeo por vez pode ter áudio. Quando um VideoPlayer
 * desmuta, dispara um evento customizado `video-audio-claimed` com o ID do
 * vídeo. Os outros VideoPlayers escutam e mutam-se automaticamente.
 */

const AUDIO_EVENT = 'video-audio-claimed';

function claimAudio(id) {
  window.dispatchEvent(new CustomEvent(AUDIO_EVENT, { detail: { id } }));
}

export function VideoPlayer({
  src,
  poster,
  mode = 'click',
  ariaLabel,
  className = '',
}) {
  const uid = useId();
  const videoRef = useRef(null);
  const { ref: containerRef, isInView } = useInView({ threshold: 0.5 });
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const firstUnmuteRef = useRef(true);

  // Autoplay: play/pause ao entrar/sair da viewport
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

  // Escutar quando outro vídeo reivindicar áudio — mutar-se
  useEffect(() => {
    const onClaim = (e) => {
      if (e.detail?.id === uid) return;
      const vid = videoRef.current;
      if (!vid || vid.muted) return;
      vid.muted = true;
      setMuted(true);
    };
    window.addEventListener(AUDIO_EVENT, onClaim);
    return () => window.removeEventListener(AUDIO_EVENT, onClaim);
  }, [uid]);

  const handleVideoClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.muted) {
      // Primeiro clique: ativa som e rebobina
      vid.muted = false;
      setMuted(false);
      if (firstUnmuteRef.current) {
        try { vid.currentTime = 0; } catch {}
        firstUnmuteRef.current = false;
      }
      claimAudio(uid);
      vid.play().catch(() => {});
      setPaused(false);
    } else if (!vid.paused) {
      // Com som + tocando → pausa
      vid.pause();
      setPaused(true);
    } else {
      // Pausado → retoma
      vid.play().catch(() => {});
      setPaused(false);
    }
  };

  const startPlayback = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    vid.controls = true;
    vid.play().catch(() => {});
    claimAudio(uid);
    setMuted(false);
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
        className={`w-full h-full object-cover block ${mode === 'autoplay' ? 'cursor-pointer' : ''}`}
        muted
        {...(mode === 'autoplay' ? { loop: true, onClick: handleVideoClick } : {})}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={ariaLabel}
        src={src}
        disablePictureInPicture
        disableRemotePlayback
        x-webkit-airplay="deny"
        controlsList="nodownload noremoteplayback noplaybackrate"
      />

      {/* Overlay de play inicial — só modo click */}
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

      {/* Indicador de estado — autoplay. Discreto, mesmo handler do click-no-video. */}
      {mode === 'autoplay' && (
        <button
          type="button"
          onClick={handleVideoClick}
          aria-label={muted ? `Ativar som: ${ariaLabel}` : paused ? `Retomar: ${ariaLabel}` : `Pausar: ${ariaLabel}`}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-cs-green-500 hover:text-cs-ink-0 transition-all duration-150 ease-brand !border-0"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}
        >
          <Icon name={muted ? 'volume-x' : paused ? 'play' : 'pause'} size={18} />
        </button>
      )}
    </div>
  );
}
