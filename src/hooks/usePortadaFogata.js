import { useEffect } from 'react';

/**
 * Anima las chispas del hero de fogata en un <canvas>.
 * - Nace en la parte baja, cerca del centro (como saliendo del fuego),
 *   sube con leve deriva lateral y parpadeo, y se recicla al salir arriba.
 * - Se ajusta al tamaño de SU PROPIO contenedor (no de la ventana),
 *   porque ahora vive dentro del panel de contenido, no a pantalla completa.
 * - Se pausa (con IntersectionObserver) cuando no está en pantalla, para
 *   no gastar batería/CPU mientras el usuario lee el resto de la página.
 * - Respeta prefers-reduced-motion: si el usuario lo pide, no anima nada.
 */
export function usePortadaFogata(canvasRef) {
  useEffect(() => {
    const prefiereMenosMovimiento =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas || prefiereMenosMovimiento) return;
    const ctx = canvas.getContext('2d');

    let ancho = 0;
    let alto = 0;

    function ajustarTamano() {
      const rect = canvas.getBoundingClientRect();
      ancho = canvas.width = Math.max(1, Math.round(rect.width));
      alto = canvas.height = Math.max(1, Math.round(rect.height));
    }
    ajustarTamano();

    const resizeObserver = new ResizeObserver(ajustarTamano);
    resizeObserver.observe(canvas);

    const COLORES = ['255, 174, 66', '255, 122, 41', '255, 214, 130', '255, 90, 30'];
    const NUM_PARTICULAS = 55;

    // Suma de dos aleatorios: agrupa las chispas hacia el centro horizontal,
    // como si salieran realmente de un punto de fuego (y no de toda la pantalla).
    function azarCentrado() {
      return (Math.random() + Math.random()) / 2;
    }

    function crearParticula(recienNacida) {
      return {
        x: ancho * (0.28 + azarCentrado() * 0.44),
        y: recienNacida ? alto * (0.78 + Math.random() * 0.2) : Math.random() * alto,
        radio: 0.6 + Math.random() * 1.8,
        velocidadY: 0.3 + Math.random() * 0.9,
        deriva: (Math.random() - 0.5) * 0.5,
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        opacidad: 0.2 + Math.random() * 0.55,
        parpadeo: Math.random() * Math.PI * 2,
      };
    }

    const particulas = Array.from({ length: NUM_PARTICULAS }, () => crearParticula(false));

    let cuadro;
    let corriendo = true;
    let enPantalla = true;

    function animar() {
      if (!corriendo) return;
      if (enPantalla) {
        ctx.clearRect(0, 0, ancho, alto);
        particulas.forEach((p) => {
          p.y -= p.velocidadY;
          p.x += p.deriva;
          p.parpadeo += 0.09;

          if (p.y < -10) Object.assign(p, crearParticula(true));

          const brillo = p.opacidad * (0.55 + 0.45 * Math.sin(p.parpadeo));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${brillo})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${p.color}, ${brillo})`;
          ctx.fill();
        });
      }
      cuadro = requestAnimationFrame(animar);
    }
    animar();

    const observadorVisibilidad = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          enPantalla = entrada.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observadorVisibilidad.observe(canvas);

    return () => {
      corriendo = false;
      cancelAnimationFrame(cuadro);
      resizeObserver.disconnect();
      observadorVisibilidad.disconnect();
    };
  }, [canvasRef]);
}
