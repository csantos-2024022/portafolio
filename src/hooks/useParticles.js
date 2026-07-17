import { useEffect } from 'react';

const PARTICLES_SRC = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';

/**
 * Carga la librería particles.js (si no está ya cargada) y la
 * inicializa sobre el contenedor #particles-js, igual que en el
 * bloque "PARTÍCULAS INTERACTIVAS" de main.js.
 */
export function useParticles() {
  useEffect(() => {
    let cancelado = false;

    function inicializar() {
      if (cancelado) return;
      if (typeof window.particlesJS === 'undefined') return;

      window.particlesJS('particles-js', {
        particles: {
          number: { value: 55, density: { enable: true, value_area: 900 } },
          color: { value: '#FFFFFF' },
          shape: { type: 'circle' },
          opacity: { value: 0.25, random: true },
          size: { value: 2.5, random: true },
          line_linked: {
            enable: true,
            distance: 140,
              color: '#FFFFFF',

            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            random: true,
            out_mode: 'out',
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true,
          },
          modes: {
            grab: { distance: 160, line_linked: { opacity: 0.4 } },
            push: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    }

    if (typeof window.particlesJS !== 'undefined') {
      inicializar();
      return;
    }

    let script = document.querySelector(`script[src="${PARTICLES_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = PARTICLES_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', inicializar);

    return () => {
      cancelado = true;
      script.removeEventListener('load', inicializar);
    };
  }, []);
}
