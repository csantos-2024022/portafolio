import { usePortafolio } from '../context/PortafolioContext';

export default function HamburgerButton() {
  const { toggleSidebarMovil } = usePortafolio();

  return (
    <button className="boton-hamburguesa" id="botonHamburguesa" aria-label="Abrir menú" onClick={toggleSidebarMovil}>
      ☰
    </button>
  );
}
