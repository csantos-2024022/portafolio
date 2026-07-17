import { usePortafolio } from '../context/PortafolioContext';

export default function Overlay() {
  const { sidebarAbierto, cerrarSidebarMovil } = usePortafolio();

  return (
    <div
      className={`overlay${sidebarAbierto ? ' activo' : ''}`}
      id="overlay"
      onClick={cerrarSidebarMovil}
    ></div>
  );
}
