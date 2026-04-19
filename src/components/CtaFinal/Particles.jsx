/**
 * SpotlightRings — substitui as partículas Three.js.
 * Fundo da seção CTA-final: spotlight radial pulsando + 3 anéis concêntricos
 * se expandindo em loop (metáfora de sinal/batimento — encaixa com call center).
 * Tudo CSS puro.
 */
export function Particles() {
  return (
    <div className="cs-ctafinal-bg absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="cs-ctafinal-spotlight" />
      <div className="cs-ctafinal-ring cs-ctafinal-ring--1" />
      <div className="cs-ctafinal-ring cs-ctafinal-ring--2" />
      <div className="cs-ctafinal-ring cs-ctafinal-ring--3" />
    </div>
  );
}
