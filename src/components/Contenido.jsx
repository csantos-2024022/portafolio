import { usePortafolio } from '../context/PortafolioContext';
import { useScrollProgress } from '../hooks/useScrollProgress';
import Seccion from './Seccion';
import SobreMi from './sections/SobreMi';
import Educacion from './sections/Educacion';
import Habilidades from './sections/Habilidades';
import Proyectos from './sections/Proyectos';
import Contacto from './sections/Contacto';

export default function Contenido() {
  const { seccionActiva, claseTransicion, limpiarClaseTransicion, cortinaRef } = usePortafolio();
  const { contenedorRef, porcentaje } = useScrollProgress();

  return (
    <main className="contenido" id="contenido" ref={contenedorRef}>
      <div className="cortina" id="cortina" ref={cortinaRef} aria-hidden="true"></div>
      <div className="barra-progreso" style={{ width: `${porcentaje}%` }}></div>

      <Seccion
        id="about"
        activa={seccionActiva === 'about'}
        clase={seccionActiva === 'about' ? claseTransicion : ''}
        onEntranceEnd={limpiarClaseTransicion}
      >
        <SobreMi />
      </Seccion>

      <Seccion
        id="educacion"
        activa={seccionActiva === 'educacion'}
        clase={seccionActiva === 'educacion' ? claseTransicion : ''}
        onEntranceEnd={limpiarClaseTransicion}
      >
        <Educacion />
      </Seccion>

      <Seccion
        id="habilidades"
        activa={seccionActiva === 'habilidades'}
        clase={seccionActiva === 'habilidades' ? claseTransicion : ''}
        onEntranceEnd={limpiarClaseTransicion}
      >
        <Habilidades />
      </Seccion>

      <Seccion
        id="proyectos"
        activa={seccionActiva === 'proyectos'}
        clase={seccionActiva === 'proyectos' ? claseTransicion : ''}
        onEntranceEnd={limpiarClaseTransicion}
      >
        <Proyectos activa={seccionActiva === 'proyectos'} />
      </Seccion>

      <Seccion
        id="contacto"
        activa={seccionActiva === 'contacto'}
        clase={seccionActiva === 'contacto' ? claseTransicion : ''}
        onEntranceEnd={limpiarClaseTransicion}
      >
        <Contacto />
      </Seccion>
    </main>
  );
}
