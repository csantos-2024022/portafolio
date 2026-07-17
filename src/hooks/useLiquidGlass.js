import { useEffect } from 'react';

/**
 * Reemplaza js/liquid-glass.js
 * 1) Brillo especular del sidebar que sigue al mouse.
 * 2) Squish táctil en los botones de utilidades del sidebar.
 * 3) Brillo reactivo en las tarjetas de skills (delegado en document,
 *    así funciona aunque las tarjetas se vuelvan a renderizar).
 */
export function useLiquidGlass(sidebarRef) {
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const tienePunteroFino = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    function alMoverEnSidebar(e) {
      const rect = sidebar.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      sidebar.style.setProperty('--luz-x', `${x}%`);
      sidebar.style.setProperty('--luz-y', `${y}%`);
    }

    function alSalirDeSidebar() {
      sidebar.style.setProperty('--luz-x', '25%');
      sidebar.style.setProperty('--luz-y', '5%');
    }

    function alMoverEnDocumento(e) {
      const tarjeta = e.target.closest ? e.target.closest('.tarjeta-skill') : null;
      if (!tarjeta) return;
      const rect = tarjeta.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tarjeta.style.setProperty('--brillo-x', `${x}%`);
      tarjeta.style.setProperty('--brillo-y', `${y}%`);
    }

    if (tienePunteroFino) {
      sidebar.addEventListener('mousemove', alMoverEnSidebar);
      sidebar.addEventListener('mouseleave', alSalirDeSidebar);
      document.addEventListener('mousemove', alMoverEnDocumento);
    }

    const elementosLiquidos = sidebar.querySelectorAll(
      '.boton-colapsar, .boton-tema, .boton-sonido, .boton-idioma'
    );

    const presionar = (e) => e.currentTarget.classList.add('presionado');
    const soltar = (e) => e.currentTarget.classList.remove('presionado');

    elementosLiquidos.forEach((el) => {
      el.addEventListener('mousedown', presionar);
      el.addEventListener('mouseup', soltar);
      el.addEventListener('mouseleave', soltar);
      el.addEventListener('touchstart', presionar, { passive: true });
      el.addEventListener('touchend', soltar);
    });

    return () => {
      if (tienePunteroFino) {
        sidebar.removeEventListener('mousemove', alMoverEnSidebar);
        sidebar.removeEventListener('mouseleave', alSalirDeSidebar);
        document.removeEventListener('mousemove', alMoverEnDocumento);
      }
      elementosLiquidos.forEach((el) => {
        el.removeEventListener('mousedown', presionar);
        el.removeEventListener('mouseup', soltar);
        el.removeEventListener('mouseleave', soltar);
        el.removeEventListener('touchstart', presionar);
        el.removeEventListener('touchend', soltar);
      });
    };
  }, [sidebarRef]);
}
