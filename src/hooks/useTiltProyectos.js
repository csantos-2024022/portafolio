import { useEffect } from 'react';

/**
 * Reemplaza js/tilt.js
 * Aplica el tilt 3D con glare a todos los elementos .proyecto-tab
 * dentro del contenedor referenciado (delegado por selector, se
 * vuelve a ejecutar si cambia la cantidad de tabs).
 */
export function useTiltProyectos(contenedorRef, deps = []) {
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const tabs = contenedor.querySelectorAll('.proyecto-tab');
    const limpiezas = [];

    tabs.forEach((tab) => {
      const img = tab.querySelector('.tab-img');

      function alMover(e) {
        const rect = tab.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotY = (x - 0.5) * 34;
        const rotX = (y - 0.5) * -34;

        const sombraX = (x - 0.5) * -30;
        const sombraY = (y - 0.5) * -30;

        tab.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
        tab.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.1) translateZ(20px)`;
        tab.style.boxShadow = `${sombraX}px ${sombraY}px 45px -12px rgba(0, 217, 200, 0.55)`;

        if (img) {
          img.style.transform = `translateZ(35px) scale(1.12) translate(${(x - 0.5) * -14}px,${(y - 0.5) * -14}px)`;
        }

        tab.style.setProperty('--glare-x', `${x * 100}%`);
        tab.style.setProperty('--glare-y', `${y * 100}%`);
      }

      function alSalir() {
        tab.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease';
        tab.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        tab.style.boxShadow = 'none';
        if (img) {
          img.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
          img.style.transform = 'translateZ(0) scale(1) translate(0,0)';
        }
      }

      tab.addEventListener('mousemove', alMover);
      tab.addEventListener('mouseleave', alSalir);
      limpiezas.push(() => {
        tab.removeEventListener('mousemove', alMover);
        tab.removeEventListener('mouseleave', alSalir);
      });
    });

    return () => limpiezas.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
