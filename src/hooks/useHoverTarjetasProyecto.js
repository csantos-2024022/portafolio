import { useEffect } from 'react';

/**
 * Reemplaza la sección "5. HOVER 3D EN TARJETAS" de main.js,
 * aplicada a las .tarjeta-proyecto (mini-proyectos).
 */
export function useHoverTarjetasProyecto(contenedorRef, deps = []) {
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const tarjetas = contenedor.querySelectorAll('.tarjeta-proyecto');
    const limpiezas = [];

    tarjetas.forEach((tarjeta) => {
      function alMover(e) {
        const rect = tarjeta.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        tarjeta.style.transition = 'transform 0.08s ease';
        tarjeta.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
      }

      function alSalir() {
        tarjeta.style.transition = 'transform 0.4s ease';
        tarjeta.style.transform = 'perspective(1200px) rotateY(0) rotateX(0) scale(1)';
      }

      tarjeta.addEventListener('mousemove', alMover);
      tarjeta.addEventListener('mouseleave', alSalir);
      limpiezas.push(() => {
        tarjeta.removeEventListener('mousemove', alMover);
        tarjeta.removeEventListener('mouseleave', alSalir);
      });
    });

    return () => limpiezas.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
