import { usePortafolio } from '../context/PortafolioContext';

export default function ProyectoImgWrapper({ imagenes, imgPrincipal, altPrincipal }) {
  const { abrirLightbox } = usePortafolio();

  const hint = imagenes.length > 1 ? `🔍 ${imagenes.length} imágenes` : '🔍 Ver imagen';

  return (
    <div className="proyecto-img-wrapper" onClick={() => abrirLightbox(imagenes, 0)}>
      <img src={imgPrincipal} alt={altPrincipal} className="proyecto-img" />
      <span className="proyecto-img-hint">{hint}</span>
    </div>
  );
}
