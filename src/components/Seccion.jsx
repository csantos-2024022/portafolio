import { useEffect, useRef } from 'react';

/**
 * Envuelve cada sección de contenido. Reemplaza la manipulación directa
 * de clases en main.js (animarEntradaSeccion, salida y entrada) usando un
 * ref hacia el <section> real y useEffect para orquestar las animaciones
 * CSS existentes (no se inventa ningún estilo nuevo).
 */
export default function Seccion({ id, activa, clase, onEntranceEnd, children }) {
  const ref = useRef(null);

  // Animación en cascada de los hijos directos al activarse la sección
  // (equivale a animarEntradaSeccion() del main.js original).
  useEffect(() => {
    if (!activa) return;
    const el = ref.current;
    if (!el) return;

    Array.from(el.children).forEach((hijo, indice) => {
      hijo.classList.remove('revelar');
      hijo.style.animationDelay = `${indice * 0.07}s`;
      void hijo.offsetWidth; // fuerza el reflow para poder reiniciar la animación
      hijo.classList.add('revelar');
    });
  }, [activa]);

  // Al terminar la animación de entrada, limpiamos la clase (deja el
  // elemento "limpio", igual que el listener { once: true } del original).
  useEffect(() => {
    const el = ref.current;
    if (!el || !clase || !clase.startsWith('entra')) return;

    function alTerminar() {
      onEntranceEnd?.();
    }
    el.addEventListener('animationend', alTerminar, { once: true });
    return () => el.removeEventListener('animationend', alTerminar);
  }, [clase, onEntranceEnd]);

  return (
    <section
      id={id}
      ref={ref}
      className={`seccion${activa ? ' activa' : ''}${clase ? ` ${clase}` : ''}`}
    >
      {children}
    </section>
  );
}
