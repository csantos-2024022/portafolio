import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { traducciones } from '../i18n/traducciones';

const PortafolioContext = createContext(null);

// Orden real del menú — sirve para saber si vamos "hacia adelante" o
// "hacia atrás" y así elegir de qué lado entra/sale cada sección.
const ORDEN_SECCIONES = ['about', 'educacion', 'habilidades', 'proyectos', 'contacto'];

// Frecuencias (Hz) para cada tipo de sonido — igual que en el main.js original
const FRECUENCIAS_POR_TIPO = { click: 740, abrir: 520, cerrar: 340 };

export function PortafolioProvider({ children }) {
  /* ---------------- IDIOMA ---------------- */
  const [idioma, setIdioma] = useState('es');

  const t = useCallback(
    (clave) => traducciones[idioma][clave] ?? clave,
    [idioma]
  );

  useEffect(() => {
    document.documentElement.setAttribute('lang', idioma);
  }, [idioma]);

  const cambiarIdioma = useCallback(() => {
    setIdioma((actual) => (actual === 'es' ? 'en' : 'es'));
  }, []);

  /* ---------------- TEMA CLARO/OSCURO ---------------- */
  const [temaClaro, setTemaClaro] = useState(false);

  useEffect(() => {
    if (temaClaro) {
      document.documentElement.setAttribute('data-tema', 'claro');
    } else {
      document.documentElement.removeAttribute('data-tema');
    }
  }, [temaClaro]);

  const toggleTema = useCallback(() => setTemaClaro((v) => !v), []);

  /* ---------------- SONIDO (Web Audio API) ---------------- */
  const [sonidoActivado, setSonidoActivado] = useState(true);
  const contextoAudioRef = useRef(null);

  const tocarTono = useCallback((tipo) => {
    if (!contextoAudioRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      contextoAudioRef.current = new AudioCtx();
    }
    const contexto = contextoAudioRef.current;
    const oscilador = contexto.createOscillator();
    const volumen = contexto.createGain();

    oscilador.type = 'sine';
    oscilador.frequency.value = FRECUENCIAS_POR_TIPO[tipo] || 600;

    volumen.gain.setValueAtTime(0.06, contexto.currentTime);
    volumen.gain.exponentialRampToValueAtTime(0.0001, contexto.currentTime + 0.18);

    oscilador.connect(volumen);
    volumen.connect(contexto.destination);

    oscilador.start();
    oscilador.stop(contexto.currentTime + 0.18);
  }, []);

  const reproducirSonido = useCallback(
    (tipo) => {
      if (!sonidoActivado) return;
      tocarTono(tipo);
    },
    [sonidoActivado, tocarTono]
  );

  const toggleSonido = useCallback(() => {
    setSonidoActivado((actual) => {
      const nuevo = !actual;
      if (nuevo) {
        // confirmación auditiva de que se activó (sin pasar por el gate,
        // porque el estado "sonidoActivado" todavía no se actualizó)
        tocarTono('click');
      }
      return nuevo;
    });
  }, [tocarTono]);

  /* ---------------- NAVEGACIÓN ENTRE SECCIONES ---------------- */
  const [navActivo, setNavActivo] = useState('about'); // link resaltado / píldora (inmediato)
  const [seccionActiva, setSeccionActiva] = useState('about'); // contenido mostrado (con delay)
  const [claseTransicion, setClaseTransicion] = useState('');
  const cortinaRef = useRef(null);
  const transicionEnCurso = useRef(false);

  const dispararCortina = useCallback(() => {
    const cortina = cortinaRef.current;
    if (!cortina) return;
    cortina.classList.remove('activa');
    void cortina.offsetWidth; // fuerza el reflow para poder reiniciar la animación
    cortina.classList.add('activa');
  }, []);

  const cambiarSeccion = useCallback(
    (destino) => {
      if (destino === navActivo || transicionEnCurso.current) return;

      const indiceActual = ORDEN_SECCIONES.indexOf(navActivo);
      const indiceDestino = ORDEN_SECCIONES.indexOf(destino);
      const vaHaciaAdelante = indiceDestino >= indiceActual;

      transicionEnCurso.current = true;
      dispararCortina();
      reproducirSonido('click');

      setClaseTransicion(vaHaciaAdelante ? 'sale-izquierda' : 'sale-derecha');
      setNavActivo(destino);

      setTimeout(() => {
        setSeccionActiva(destino);
        setClaseTransicion(vaHaciaAdelante ? 'entra-derecha' : 'entra-izquierda');
        transicionEnCurso.current = false;
      }, 220);

      cerrarSidebarMovil();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [navActivo, dispararCortina, reproducirSonido]
  );

  const limpiarClaseTransicion = useCallback(() => setClaseTransicion(''), []);

  /* ---------------- SIDEBAR MÓVIL / COLAPSADO ---------------- */
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [sidebarColapsado, setSidebarColapsado] = useState(false);

  function abrirSidebarMovil() {
    setSidebarAbierto(true);
  }
  function cerrarSidebarMovil() {
    setSidebarAbierto(false);
  }
  function toggleSidebarMovil() {
    setSidebarAbierto((v) => !v);
  }
  function toggleSidebarColapsado() {
    setSidebarColapsado((v) => !v);
  }

  /* ---------------- LIGHTBOX ---------------- */
  const [lightbox, setLightbox] = useState({ abierto: false, imagenes: [], indice: 0 });

  const abrirLightbox = useCallback((imagenes, indiceInicial) => {
    setLightbox({ abierto: true, imagenes, indice: indiceInicial });
    document.body.style.overflow = 'hidden';
  }, []);

  const cerrarLightbox = useCallback(() => {
    setLightbox((actual) => ({ ...actual, abierto: false }));
    document.body.style.overflow = '';
  }, []);

  const irAImagen = useCallback((indice) => {
    setLightbox((actual) => ({ ...actual, indice }));
  }, []);

  const value = {
    idioma,
    t,
    cambiarIdioma,
    temaClaro,
    toggleTema,
    sonidoActivado,
    toggleSonido,
    reproducirSonido,
    navActivo,
    seccionActiva,
    claseTransicion,
    cambiarSeccion,
    limpiarClaseTransicion,
    cortinaRef,
    sidebarAbierto,
    sidebarColapsado,
    abrirSidebarMovil,
    cerrarSidebarMovil,
    toggleSidebarMovil,
    toggleSidebarColapsado,
    lightbox,
    abrirLightbox,
    cerrarLightbox,
    irAImagen,
  };

  return <PortafolioContext.Provider value={value}>{children}</PortafolioContext.Provider>;
}

export function usePortafolio() {
  const ctx = useContext(PortafolioContext);
  if (!ctx) throw new Error('usePortafolio debe usarse dentro de <PortafolioProvider>');
  return ctx;
}
