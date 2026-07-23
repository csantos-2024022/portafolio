import { useRef } from 'react';
import { useFogataIntro } from '../hooks/useFogataIntro';
import { useFogataChispas } from '../hooks/useFogataChispas';

/**
 * Portada de entrada del portafolio: una fogata a pantalla completa.
 * Al hacer scroll (o swipe / flecha abajo), la cámara se acerca al
 * fuego hasta "entrar" en la luz y revelar el portafolio.
 *
 * No es un video: el fuego se arma con varias capas de "llamas" en
 * CSS (gradientes con forma orgánica que titilan a distinto ritmo,
 * mezcladas en modo "screen" para que se vean como luz real) más
 * chispas animadas en canvas por encima.
 */
export default function FogataIntro() {
  const { wrapperRef, terminado, saliendo, saltar } = useFogataIntro();
  const canvasRef = useRef(null);
  useFogataChispas(canvasRef);

  if (terminado) return null;

  return (
    <div
      className={`fogata-intro${saliendo ? ' fogata-intro-saliendo' : ''}`}
      ref={wrapperRef}
      role="region"
      aria-label="Portada del portafolio, desliza hacia abajo para entrar"
    >
      <div className="fogata-intro-escena">
        <div className="fogata-intro-resplandor-ambiente" aria-hidden="true"></div>

        <div className="fogata-intro-fuego" aria-hidden="true">
          <span className="tronco tronco-1"></span>
          <span className="tronco tronco-2"></span>
          <span className="tronco tronco-3"></span>

          <span className="brasero"></span>

          <span className="llama llama-base"></span>
          <span className="llama llama-1"></span>
          <span className="llama llama-2"></span>
          <span className="llama llama-3"></span>
          <span className="llama llama-4"></span>
          <span className="llama llama-5"></span>
          <span className="llama llama-nucleo"></span>
        </div>

        <canvas className="fogata-intro-canvas" ref={canvasRef}></canvas>
      </div>

      <div className="fogata-intro-vineta" aria-hidden="true"></div>
      <div className="fogata-intro-flash" aria-hidden="true"></div>

      <div className="fogata-intro-texto">
        <span className="fogata-intro-kicker">Portafolio</span>
        <span className="fogata-intro-nombre">Cristian Santos</span>
        <span className="fogata-intro-frase">"Código limpio, datos claros."</span>
      </div>

      <button type="button" className="fogata-intro-scroll" onClick={saltar}>
        <span>Desliza para entrar</span>
        <span className="fogata-intro-flecha">↓</span>
      </button>
    </div>
  );
}
