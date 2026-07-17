import { useEffect, useRef, useState } from 'react';
import { usePortafolio } from '../context/PortafolioContext';

export default function Lightbox() {
  const { lightbox, cerrarLightbox, irAImagen } = usePortafolio();
  const { abierto, imagenes, indice } = lightbox;

  const [desvaneciendo, setDesvaneciendo] = useState(false);
  const [imagenMostrada, setImagenMostrada] = useState({ src: '', alt: '' });
  const indiceRef = useRef(indice);
  indiceRef.current = indice;

  // Efecto de fade al cambiar de imagen (mostrarImagen() del original)
  useEffect(() => {
    if (!abierto || imagenes.length === 0) return;
    setDesvaneciendo(true);
    const timeout = setTimeout(() => {
      setImagenMostrada(imagenes[indice]);
      setDesvaneciendo(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [indice, abierto, imagenes]);

  function anterior() {
    irAImagen((indiceRef.current - 1 + imagenes.length) % imagenes.length);
  }
  function siguiente() {
    irAImagen((indiceRef.current + 1) % imagenes.length);
  }

  // Navegación con teclado
  useEffect(() => {
    function alPresionarTecla(e) {
      if (!abierto) return;
      if (e.key === 'Escape') cerrarLightbox();
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'ArrowRight') siguiente();
    }
    document.addEventListener('keydown', alPresionarTecla);
    return () => document.removeEventListener('keydown', alPresionarTecla);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto, imagenes]);

  const hayVarias = imagenes.length > 1;

  return (
    <div className={`lightbox${abierto ? ' visible' : ''}`} id="lightbox" aria-modal="true" role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrarLightbox();
      }}
    >
      <button className="lightbox-cerrar" id="lightboxCerrar" aria-label="Cerrar" onClick={cerrarLightbox}>✕</button>
      <div className="lightbox-contenido">
        <button
          className="lightbox-flecha"
          id="lightboxAnterior"
          aria-label="Anterior"
          style={{ visibility: hayVarias ? 'visible' : 'hidden' }}
          onClick={anterior}
        >
          &#8249;
        </button>
        <img
          className={`lightbox-img${desvaneciendo ? ' desvaneciendo' : ''}`}
          id="lightboxImg"
          src={imagenMostrada.src}
          alt={imagenMostrada.alt}
        />
        <button
          className="lightbox-flecha"
          id="lightboxSiguiente"
          aria-label="Siguiente"
          style={{ visibility: hayVarias ? 'visible' : 'hidden' }}
          onClick={siguiente}
        >
          &#8250;
        </button>
      </div>
      <p className="lightbox-contador" id="lightboxContador">
        {hayVarias ? `${indice + 1} / ${imagenes.length}` : ''}
      </p>
    </div>
  );
}
