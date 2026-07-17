import { useRef } from 'react';
import { usePortafolio } from '../context/PortafolioContext';
import { useNavPill } from '../hooks/useNavPill';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

const ENLACES_NAV = [
  { id: 'about', icono: '👤', clave: 'nav_about' },
  { id: 'educacion', icono: '🎓', clave: 'nav_educacion' },
  { id: 'habilidades', icono: '🛠️', clave: 'nav_habilidades' },
  { id: 'proyectos', icono: '📁', clave: 'nav_proyectos' },
  { id: 'contacto', icono: '✉️', clave: 'nav_contacto' },
];

export default function Sidebar() {
  const {
    t,
    idioma,
    cambiarIdioma,
    temaClaro,
    toggleTema,
    sonidoActivado,
    toggleSonido,
    navActivo,
    cambiarSeccion,
    sidebarAbierto,
    sidebarColapsado,
    toggleSidebarColapsado,
  } = usePortafolio();

  const sidebarRef = useRef(null);
  const ulRef = useRef(null);
  const pillRef = useRef(null);

  useNavPill({ ulRef, pillRef, navActivo, sidebarColapsado, idioma });
  useLiquidGlass(sidebarRef);

  return (
    <aside
      className={`sidebar${sidebarAbierto ? ' abierto' : ''}${sidebarColapsado ? ' colapsado' : ''}`}
      id="sidebar"
      ref={sidebarRef}
    >
      <button
        className="boton-colapsar"
        id="botonColapsar"
        aria-label="Colapsar menú"
        onClick={toggleSidebarColapsado}
      >
        ‹
      </button>

      <div className="sidebar-perfil">
        <div className="sidebar-foto" id="fotoPerfil">
          <span className="monograma">CS</span>
        </div>
        <h1 className="sidebar-nombre">Cristian <span>Santos</span></h1>
      </div>

      <nav className="sidebar-nav">
        <ul ref={ulRef}>
          <span className="nav-pill" ref={pillRef} aria-hidden="true"></span>
          {ENLACES_NAV.map((enlace) => (
            <li key={enlace.id}>
              <a
                href={`#${enlace.id}`}
                className={`nav-link${navActivo === enlace.id ? ' activo' : ''}`}
                data-section={enlace.id}
                onClick={(e) => {
                  e.preventDefault();
                  cambiarSeccion(enlace.id);
                }}
              >
                <i className="icon">{enlace.icono}</i>{' '}
                <span className="texto-link" data-i18n={enlace.clave}>{t(enlace.clave)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-utilidades">
        <button
          className="boton-tema"
          id="botonTema"
          aria-label={temaClaro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          onClick={toggleTema}
        >
          {temaClaro ? '☀️' : '🌙'}
        </button>
        <button
          className="boton-sonido"
          id="botonSonido"
          aria-label={sonidoActivado ? 'Silenciar sonidos' : 'Activar sonidos'}
          onClick={toggleSonido}
        >
          {sonidoActivado ? '🔊' : '🔇'}
        </button>
        <button
          className="boton-idioma"
          id="botonIdioma"
          aria-label={idioma === 'es' ? 'Switch to English' : 'Cambiar a español'}
          onClick={cambiarIdioma}
        >
          🌐 {idioma === 'es' ? 'ES' : 'EN'}
        </button>
      </div>
    </aside>
  );
}
