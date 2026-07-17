import { useEffect } from 'react';

/**
 * Reemplaza la parte de "CURSOR MAGNÉTICO PERSONALIZADO" de js/intro.js.
 * Crea un punto rígido + un anillo que sigue con un pequeño retraso (lerp)
 * y crece al pasar sobre elementos clicables. Se desactiva en touch.
 */
export function useCustomCursor() {
  useEffect(() => {
    const tienePunteroFino = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!tienePunteroFino) return;

    const punto = document.createElement('div');
    punto.className = 'cursor-punto';
    const anillo = document.createElement('div');
    anillo.className = 'cursor-anillo';
    document.body.appendChild(punto);
    document.body.appendChild(anillo);
    document.body.classList.add('cursor-activo');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let anilloX = mouseX;
    let anilloY = mouseY;
    let idAnimacion;

    function alMoverMouse(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      punto.style.transform = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
    }

    function animarAnillo() {
      anilloX += (mouseX - anilloX) * 0.16;
      anilloY += (mouseY - anilloY) * 0.16;
      anillo.style.transform = `translate(${anilloX}px,${anilloY}px) translate(-50%,-50%)`;
      idAnimacion = requestAnimationFrame(animarAnillo);
    }
    animarAnillo();

    const elementosInteractivos = 'a, button, .proyecto-tab, .nav-link, input, textarea, .tab-img, .proyecto-img-wrapper';

    function alPasarPorEncima(e) {
      if (e.target.closest && e.target.closest(elementosInteractivos)) {
        anillo.classList.add('cursor-hover');
      }
    }
    function alSalirDeEncima(e) {
      if (e.target.closest && e.target.closest(elementosInteractivos)) {
        anillo.classList.remove('cursor-hover');
      }
    }

    window.addEventListener('mousemove', alMoverMouse);
    document.addEventListener('mouseover', alPasarPorEncima);
    document.addEventListener('mouseout', alSalirDeEncima);

    return () => {
      cancelAnimationFrame(idAnimacion);
      window.removeEventListener('mousemove', alMoverMouse);
      document.removeEventListener('mouseover', alPasarPorEncima);
      document.removeEventListener('mouseout', alSalirDeEncima);
      document.body.classList.remove('cursor-activo');
      punto.remove();
      anillo.remove();
    };
  }, []);
}
