import { useEffect, useRef } from 'react';

/**
 * Reemplaza js/nav-pill.js
 * Mueve un único bloque (.nav-pill) para que coincida en tamaño y
 * posición con el link del menú que esté activo, recalculando cuando
 * cambia la sección activa, cuando se colapsa/expande el sidebar, o
 * cuando cambia el tamaño de ventana / el idioma (cambia el ancho del texto).
 */
export function useNavPill({ ulRef, pillRef, navActivo, sidebarColapsado, idioma }) {
  const primerRender = useRef(true);

  useEffect(() => {
    const ul = ulRef.current;
    const pill = pillRef.current;
    if (!ul || !pill) return;

    function moverPillA(link) {
      if (!link) return;
      const rectUl = ul.getBoundingClientRect();
      const rectLink = link.getBoundingClientRect();

      pill.style.height = `${rectLink.height}px`;
      pill.style.transform = `translateY(${rectLink.top - rectUl.top}px)`;
      pill.classList.add('lista');
    }

    const linkActivo = ul.querySelector('.nav-link.activo');

    if (primerRender.current) {
      // Posición inicial sin animación, para que no "viaje" desde 0 al cargar
      pill.style.transition = 'none';
      moverPillA(linkActivo);
      requestAnimationFrame(() => {
        pill.style.transition = '';
      });
      primerRender.current = false;
    } else {
      // Pequeño delay para sincronizar con el cambio de clase ".activo"
      const timeout = setTimeout(() => moverPillA(linkActivo), 20);
      return () => clearTimeout(timeout);
    }
  }, [navActivo, ulRef, pillRef]);

  // Recalcular cuando se colapsa/expande el sidebar (tras la transición CSS)
  useEffect(() => {
    const ul = ulRef.current;
    const pill = pillRef.current;
    if (!ul || !pill) return;

    const timeout = setTimeout(() => {
      const linkActivo = ul.querySelector('.nav-link.activo');
      if (!linkActivo) return;
      const rectUl = ul.getBoundingClientRect();
      const rectLink = linkActivo.getBoundingClientRect();
      pill.style.height = `${rectLink.height}px`;
      pill.style.transform = `translateY(${rectLink.top - rectUl.top}px)`;
    }, 260);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarColapsado]);

  // Recalcular cuando cambia el idioma (puede cambiar el ancho del texto)
  useEffect(() => {
    const ul = ulRef.current;
    const pill = pillRef.current;
    if (!ul || !pill) return;

    const timeout = setTimeout(() => {
      const linkActivo = ul.querySelector('.nav-link.activo');
      if (!linkActivo) return;
      const rectUl = ul.getBoundingClientRect();
      const rectLink = linkActivo.getBoundingClientRect();
      pill.style.height = `${rectLink.height}px`;
      pill.style.transform = `translateY(${rectLink.top - rectUl.top}px)`;
    }, 50);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma]);

  // Recalcular en resize de ventana
  useEffect(() => {
    const ul = ulRef.current;
    const pill = pillRef.current;
    if (!ul || !pill) return;

    function alRedimensionar() {
      const linkActivo = ul.querySelector('.nav-link.activo');
      if (!linkActivo) return;
      const rectUl = ul.getBoundingClientRect();
      const rectLink = linkActivo.getBoundingClientRect();
      pill.style.height = `${rectLink.height}px`;
      pill.style.transform = `translateY(${rectLink.top - rectUl.top}px)`;
    }

    window.addEventListener('resize', alRedimensionar);
    return () => window.removeEventListener('resize', alRedimensionar);
  }, [ulRef, pillRef]);
}
