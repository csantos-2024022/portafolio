import { useRef } from 'react';
import { usePortadaFogata } from '../hooks/usePortadaFogata';

/**
 * Hero de "fogata" para el inicio de Sobre Mí.
 * Es un bloque NORMAL del flujo del documento (no position:fixed),
 * por eso el scroll siempre funciona: al bajar, simplemente se
 * queda atrás como cualquier otro contenido.
 *
 * El fuego se arma con dos capas:
 * 1) Resplandor con gradientes CSS animados (las "brasas" grandes).
 * 2) Chispas dibujadas en <canvas> que suben constantemente.
 */
export default function PortadaFogata() {
  const canvasRef = useRef(null);
  usePortadaFogata(canvasRef);

  return (
    <div className="portada-fogata">
      <div className="portada-fogata-resplandor" aria-hidden="true">
        <span className="brasa brasa-1"></span>
        <span className="brasa brasa-2"></span>
        <span className="brasa brasa-3"></span>
      </div>

      <canvas className="portada-fogata-canvas" ref={canvasRef} aria-hidden="true"></canvas>

      <div className="portada-fogata-vineta"></div>

      <div className="portada-fogata-texto">
        <span className="portada-fogata-kicker">Portafolio</span>
        <span className="portada-fogata-nombre">Cristian Santos</span>
      </div>

      <div className="portada-fogata-scroll">
        <span>Desliza para ver más</span>
        <span className="portada-fogata-flecha">↓</span>
      </div>
    </div>
  );
}
