import { useEffect, useRef, useState } from 'react';

/**
 * Controla el "vuelo hacia el fuego": mientras la portada está activa,
 * cada scroll/gesto suma progreso (0 → 1) que se traduce en un zoom
 * suave hacia el centro de la fogata. Al llegar a 1, la portada se
 * desvanece y el portafolio queda interactivo debajo.
 *
 * Importante: esto NO depende del scroll real de ningún contenedor
 * (por eso no se puede "trabar" como pasó antes). Es scroll virtual:
 * escuchamos rueda/touch/teclado en la ventana mientras la portada
 * está activa, y bloqueamos el scroll real hasta terminar.
 */
export function useFogataIntro() {
  const wrapperRef = useRef(null);
  const [terminado, setTerminado] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const saltarRef = useRef(() => {});

  useEffect(() => {
    if (terminado) return;

    const prefiereMenosMovimiento =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.classList.add('fogata-intro-activa');

    let objetivo = 0;
    let actual = 0;
    let animando = false;
    let cuadro;

    function pintar(p) {
      const el = wrapperRef.current;
      if (!el) return;
      // Aceleración hacia el final: al principio cuesta más, cerca del
      // final "cae" rápido hacia la luz, como una cámara acelerando.
      const zoom = 1 + p * p * 8.5;
      el.style.setProperty('--zoom', zoom.toFixed(3));
      el.style.setProperty('--brillo', p.toFixed(4));
    }

    function salir() {
      setSaliendo(true);
      setTimeout(() => setTerminado(true), 600);
    }

    function aplicar() {
      animando = true;
      actual += (objetivo - actual) * 0.1;
      if (Math.abs(objetivo - actual) > 0.0015) {
        pintar(actual);
        cuadro = requestAnimationFrame(aplicar);
      } else {
        actual = objetivo;
        pintar(actual);
        animando = false;
        if (actual >= 1) salir();
      }
    }

    function sumar(delta) {
      objetivo = Math.min(1, Math.max(0, objetivo + delta));
      if (!animando) aplicar();
    }

    saltarRef.current = () => {
      objetivo = 1;
      if (!animando) aplicar();
    };

    function alRueda(e) {
      e.preventDefault();
      sumar(e.deltaY * 0.0016);
    }

    let tocandoY = null;
    function alTocarInicio(e) {
      tocandoY = e.touches[0].clientY;
    }
    function alTocarMover(e) {
      if (tocandoY === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      sumar((tocandoY - y) * 0.0042);
      tocandoY = y;
    }
    function alTeclado(e) {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        sumar(0.16);
      }
    }

    pintar(0);

    if (prefiereMenosMovimiento) {
      // Sin animación forzada: un solo gesto (click, tecla o scroll) entra directo.
      window.addEventListener('keydown', alTeclado);
      window.addEventListener('click', saltarRef.current);
      window.addEventListener('wheel', saltarRef.current, { passive: true });
    } else {
      window.addEventListener('wheel', alRueda, { passive: false });
      window.addEventListener('touchstart', alTocarInicio, { passive: true });
      window.addEventListener('touchmove', alTocarMover, { passive: false });
      window.addEventListener('keydown', alTeclado);
    }

    return () => {
      document.body.classList.remove('fogata-intro-activa');
      cancelAnimationFrame(cuadro);
      window.removeEventListener('wheel', alRueda);
      window.removeEventListener('touchstart', alTocarInicio);
      window.removeEventListener('touchmove', alTocarMover);
      window.removeEventListener('keydown', alTeclado);
      window.removeEventListener('click', saltarRef.current);
    };
  }, [terminado]);

  return { wrapperRef, terminado, saliendo, saltar: () => saltarRef.current() };
}
