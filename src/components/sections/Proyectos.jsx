import { useEffect, useRef, useState } from 'react';
import { usePortafolio } from '../../context/PortafolioContext';
import { proyectosTabs, proyectosPaneles, miniProyectos, descripcionesTech } from '../../data/proyectos';
import ProyectoImgWrapper from '../ProyectoImgWrapper';
import { useTiltProyectos } from '../../hooks/useTiltProyectos';
import { useHoverTarjetasProyecto } from '../../hooks/useHoverTarjetasProyecto';

function TagsProyecto({ tags }) {
  return (
    <ul className="proyecto-tags">
      {tags.map((tag) => (
        <li key={tag} data-tooltip={descripcionesTech[tag] || undefined}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function PanelProyecto({ id, panel, activo }) {
  const ref = useRef(null);

  // Reinicia la animación de apertura del panel cada vez que se activa
  // (equivale a panel.style.animation = 'none' -> '' del main.js original).
  useEffect(() => {
    if (!activo) return;
    const el = ref.current;
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  }, [activo]);

  return (
    <div
      className={`proyecto-panel${activo ? '' : ' oculto'}`}
      id={`panel${id.charAt(0).toUpperCase()}${id.slice(1)}`}
      data-panel={id}
      ref={ref}
    >
      <div className="panel-imagenes">
        <ProyectoImgWrapper
          imagenes={panel.imagenes}
          imgPrincipal={panel.imgPrincipal}
          altPrincipal={panel.altPrincipal}
        />
        {panel.video && (
          <video className="proyecto-video" controls preload="metadata" poster={panel.video.poster}>
            <source src={panel.video.src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="panel-info">
        <h3 className="proyecto-titulo">{panel.titulo}</h3>
        <p className="proyecto-descripcion">{panel.descripcion}</p>
        <TagsProyecto tags={panel.tags} />
        <a href={panel.githubUrl} target="_blank" rel="noopener noreferrer" className="boton-proyecto">
          Ver en GitHub ↗
        </a>
      </div>
    </div>
  );
}

export default function Proyectos({ activa }) {
  const { t } = usePortafolio();
  const [proyectoActivo, setProyectoActivo] = useState('banco');

  const tabsRef = useRef(null);
  const gridRef = useRef(null);

  useTiltProyectos(tabsRef, []);
  useHoverTarjetasProyecto(gridRef, []);

  // Animación en cascada de las mini-tarjetas cada vez que se entra a la sección
  useEffect(() => {
    if (!activa) return;
    const grid = gridRef.current;
    if (!grid) return;
    grid.classList.remove('animar');
    void grid.offsetWidth;
    grid.classList.add('animar');
  }, [activa]);

  return (
    <>
      <p className="saludo" data-i18n="saludo_proyectos">{t('saludo_proyectos')}</p>
      <h2 className="titulo-grande">
        <span data-i18n="titulo_proyectos_pre">{t('titulo_proyectos_pre')}</span>{' '}
        <span className="resaltado" data-i18n="titulo_proyectos_resaltado">{t('titulo_proyectos_resaltado')}</span>
      </h2>

      <hr className="divisor" />

      <p className="parrafo" data-i18n="parrafo_proyectos">{t('parrafo_proyectos')}</p>

      <div className="proyectos-tabs" ref={tabsRef}>
        {proyectosTabs.map((tab) => (
          <button
            key={tab.id}
            className={`proyecto-tab${proyectoActivo === tab.id ? ' activo' : ''}`}
            data-proyecto={tab.id}
            onClick={() => setProyectoActivo(tab.id)}
          >
            <img src={tab.imgTab} alt={tab.altTab} className="tab-img" />
            <div className="tab-overlay">
              <span className="tab-numero">{tab.numero}</span>
              <span className="tab-nombre">{tab.nombre}</span>
            </div>
          </button>
        ))}
      </div>

      {Object.entries(proyectosPaneles).map(([id, panel]) => (
        <PanelProyecto key={id} id={id} panel={panel} activo={proyectoActivo === id} />
      ))}

      <h3 className="subtitulo" style={{ marginTop: '2rem' }}>
        Mini-<span className="resaltado">proyectos</span>
      </h3>
      <p className="parrafo">Ejercicios más pequeños, pero con lógica real detrás — no son solo maquetas.</p>

      <div className="grid-proyectos" ref={gridRef}>
        {miniProyectos.map((proyecto) => (
          <div className="tarjeta-proyecto" key={proyecto.id}>
            <ProyectoImgWrapper
              imagenes={proyecto.imagenes}
              imgPrincipal={proyecto.imgPrincipal}
              altPrincipal={proyecto.altPrincipal}
            />
            <div className="proyecto-info">
              <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
              <p className="proyecto-descripcion">{proyecto.descripcion}</p>
              <TagsProyecto tags={proyecto.tags} />
              <a href={proyecto.githubUrl} target="_blank" rel="noopener noreferrer" className="boton-proyecto">
                Ver en GitHub ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
