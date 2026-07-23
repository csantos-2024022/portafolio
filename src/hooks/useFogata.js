import { useEffect } from 'react';

/**
 * Reemplaza js/fogata.js
 * - Reproduce el video de la fogata SOLO cuando el bloque hero está visible.
 * - Si el usuario prefiere menos movimiento, nunca reproduce (se queda en el poster).
 * - Atenúa el brillo cuando el usuario baja a leer el resto de la sección.
 */
export function useFogata(contenedorRef, videoRef) {
  useEffect(() => {
    const contenedor = contenedorRef.current;
    const video = videoRef.current;
    if (!contenedor || !video) return;

    const prefiereMenosMovimiento =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefiereMenosMovimiento) {
      // No reproducimos nada: el <video> muestra su poster (frame fijo) y listo.
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            const promesa = video.play();
            if (promesa && promesa.catch) {
              promesa.catch(() => {
                /* el navegador bloqueó el autoplay, no pasa nada */
              });
            }
            contenedor.classList.remove('fogata-atenuada');
          } else {
            video.pause();
            contenedor.classList.add('fogata-atenuada');
          }
        });
      },
      { threshold: 0.15 }
    );

    observador.observe(contenedor);

    // Si el usuario baja a leer el bento grid de datos, atenuamos igual aunque
    // el hero técnicamente siga parcialmente visible arriba.
    const panelConScroll = document.querySelector('.contenido');
    function alScrollear() {
      const limite = contenedor.getBoundingClientRect().bottom;
      if (limite < 80) {
        contenedor.classList.add('fogata-atenuada');
      }
    }
    if (panelConScroll) {
      panelConScroll.addEventListener('scroll', alScrollear);
    }

    return () => {
      observador.disconnect();
      if (panelConScroll) {
        panelConScroll.removeEventListener('scroll', alScrollear);
      }
    };
  }, [contenedorRef, videoRef]);
}
