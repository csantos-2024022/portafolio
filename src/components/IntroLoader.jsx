import { useEffect, useRef, useState } from 'react';

const YA_VISTA_KEY = 'introPortafolioVista';

const LINEAS = [
  { texto: 'iniciando build de portafolio...', ok: false, espera: 480 },
  { texto: 'cargando perfil: Cristian Enrique Santos Martínez', ok: false, espera: 550 },
  { texto: 'compilando proyectos (2 encontrados)...', ok: false, espera: 600 },
  { texto: 'conectando con github.com/csantos-2024022', ok: false, espera: 500 },
  { texto: 'optimizando código limpio, datos claros...', ok: false, espera: 550 },
  { texto: 'build completado ✓', ok: true, espera: 400 },
];

function tonoSuave(frecuencia) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!tonoSuave._ctx) tonoSuave._ctx = new Ctx();
    const ctx = tonoSuave._ctx;
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frecuencia;
    vol.gain.setValueAtTime(0.045, ctx.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(vol);
    vol.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    /* si el navegador bloquea audio sin interacción, seguimos sin sonido */
  }
}

/**
 * Reemplaza js/intro.js (la parte de la terminal de boot).
 * Se ejecuta una sola vez por sesión (sessionStorage), igual que el original.
 */
export default function IntroLoader() {
  const visibleRef = useRef(!sessionStorage.getItem(YA_VISTA_KEY));
  const visible = visibleRef.current;
  const [lineasMostradas, setLineasMostradas] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [cerrando, setCerrando] = useState(false);
  const [oculto, setOculto] = useState(false);
  const terminadaRef = useRef(false);
  const cerrarRef = useRef(() => {});

  useEffect(() => {
    if (!visible) return;

    document.body.classList.add('intro-activa');

    let indice = 0;
    let timeoutId;

    function cerrar() {
      if (terminadaRef.current) return;
      terminadaRef.current = true;
      sessionStorage.setItem(YA_VISTA_KEY, '1');
      setCerrando(true);
      document.body.classList.remove('intro-activa');
      setTimeout(() => setOculto(true), 950);
    }

    function siguienteLinea() {
      if (indice >= LINEAS.length) {
        timeoutId = setTimeout(cerrar, 550);
        return;
      }

      const datos = LINEAS[indice];
      setLineasMostradas((actual) => [...actual, datos]);
      tonoSuave(560 + indice * 30);

      const pct = Math.round(((indice + 1) / LINEAS.length) * 100);
      setPorcentaje(pct);

      indice++;
      timeoutId = setTimeout(siguienteLinea, datos.espera);
    }

    timeoutId = setTimeout(siguienteLinea, 350);

    // Exponemos "cerrar" para el botón de saltar
    cerrarRef.current = cerrar;

    return () => {
      clearTimeout(timeoutId);
      document.body.classList.remove('intro-activa');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible || oculto) return null;

  return (
    <div className={`loader-intro${cerrando ? ' cerrando' : ''}`} id="loaderIntro">
      <div className="loader-terminal">
        <div className="loader-terminal-bar">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
          <span className="loader-terminal-titulo">cristian@portafolio:~</span>
        </div>
        <div className="loader-terminal-body" id="loaderLineas">
          {lineasMostradas.map((linea, i) => {
            const esUltima = i === lineasMostradas.length - 1;
            return (
              <div className="loader-linea" key={i}>
                <span className="prompt">$</span>
                {linea.ok ? (
                  <span className="ok">{linea.texto}</span>
                ) : (
                  <>
                    {linea.texto}
                    {esUltima && <span className="loader-cursor"></span>}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="loader-barra-wrap">
          <div className="loader-barra">
            <div className="loader-barra-fill" id="loaderBarraFill" style={{ width: `${porcentaje}%` }}></div>
          </div>
          <span className="loader-porcentaje" id="loaderPorcentaje">{porcentaje}%</span>
        </div>
      </div>
      <button className="loader-skip" id="loaderSkip" type="button" onClick={() => cerrarRef.current()}>
        Saltar intro →
      </button>
    </div>
  );
}
