import { useEffect } from 'react';

/**
 * Chispas de la portada de fogata, dibujadas en <canvas> a pantalla
 * completa. Nacen cerca del centro-abajo (donde están las llamas),
 * suben con parpadeo y leve deriva lateral, y algunas salen disparadas
 * más rápido y brillante (como una chispa que "truena").
 */
export function useFogataChispas(canvasRef) {
  useEffect(() => {
    const prefiereMenosMovimiento =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas || prefiereMenosMovimiento) return;
    const ctx = canvas.getContext('2d');

    let ancho = 0;
    let alto = 0;

    function ajustarTamano() {
      ancho = canvas.width = window.innerWidth;
      alto = canvas.height = window.innerHeight;
    }
    ajustarTamano();
    window.addEventListener('resize', ajustarTamano);

    const COLORES = ['255, 174, 66', '255, 122, 41', '255, 214, 130', '255, 90, 30', '255, 235, 190'];
    const NUM_PARTICULAS = 85;

    function azarCentrado() {
      return (Math.random() + Math.random()) / 2;
    }

    function crearParticula(recienNacida) {
      const grande = Math.random() < 0.12;
      return {
        x: ancho * (0.32 + azarCentrado() * 0.36),
        y: recienNacida ? alto * (0.8 + Math.random() * 0.15) : alto - Math.random() * alto,
        radio: grande ? 1.6 + Math.random() * 2 : 0.6 + Math.random() * 1.4,
        velocidadY: grande ? 1.4 + Math.random() * 1.6 : 0.35 + Math.random() * 0.85,
        deriva: (Math.random() - 0.5) * (grande ? 1 : 0.5),
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        opacidad: 0.25 + Math.random() * 0.6,
        parpadeo: Math.random() * Math.PI * 2,
      };
    }

    const particulas = Array.from({ length: NUM_PARTICULAS }, () => crearParticula(false));

    let cuadro;
    let corriendo = true;

    function animar() {
      if (!corriendo) return;
      ctx.clearRect(0, 0, ancho, alto);
      particulas.forEach((p) => {
        p.y -= p.velocidadY;
        p.x += p.deriva;
        p.parpadeo += 0.09;

        if (p.y < -12) Object.assign(p, crearParticula(true));

        const brillo = p.opacidad * (0.55 + 0.45 * Math.sin(p.parpadeo));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${brillo})`;
        ctx.shadowBlur = 7;
        ctx.shadowColor = `rgba(${p.color}, ${brillo})`;
        ctx.fill();
      });
      cuadro = requestAnimationFrame(animar);
    }
    animar();

    return () => {
      corriendo = false;
      cancelAnimationFrame(cuadro);
      window.removeEventListener('resize', ajustarTamano);
    };
  }, [canvasRef]);
}
