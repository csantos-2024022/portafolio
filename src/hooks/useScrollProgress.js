import { useEffect, useRef, useState } from 'react';

/**
 * Reemplaza la sección "3. BARRA DE PROGRESO DE SCROLL" de main.js.
 * Devuelve el ref para el contenedor con scroll (#contenido) y el
 * porcentaje actual para pintar la barra.
 */
export function useScrollProgress() {
  const contenedorRef = useRef(null);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const contenido = contenedorRef.current;
    if (!contenido) return;

    function alScrollear() {
      const total = contenido.scrollHeight - contenido.clientHeight;
      const pct = total > 0 ? (contenido.scrollTop / total) * 100 : 0;
      setPorcentaje(pct);
    }

    contenido.addEventListener('scroll', alScrollear);
    return () => contenido.removeEventListener('scroll', alScrollear);
  }, []);

  return { contenedorRef, porcentaje };
}
