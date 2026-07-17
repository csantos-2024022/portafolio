import { usePortafolio } from '../../context/PortafolioContext';

export default function Educacion() {
  const { t } = usePortafolio();

  return (
    <>
      <p className="saludo" data-i18n="saludo_educacion">{t('saludo_educacion')}</p>
      <h2 className="titulo-grande">
        <span data-i18n="titulo_educacion_pre">{t('titulo_educacion_pre')}</span>{' '}
        <span className="resaltado" data-i18n="titulo_educacion_resaltado">{t('titulo_educacion_resaltado')}</span>
      </h2>

      <hr className="divisor" />

      <h3 className="subtitulo" data-i18n="subtitulo_educacion">{t('subtitulo_educacion')}</h3>

      <div className="tarjeta-timeline">
        <span className="timeline-fecha">2024 — 2026</span>
        <h4 className="timeline-titulo" data-i18n="timeline_titulo">{t('timeline_titulo')}</h4>
        <p className="timeline-lugar" data-i18n="timeline_lugar">{t('timeline_lugar')}</p>
        <p className="parrafo" data-i18n="timeline_descripcion">{t('timeline_descripcion')}</p>
      </div>

      <h3 className="subtitulo" data-i18n="subtitulo_experiencia">{t('subtitulo_experiencia')}</h3>

      <p className="parrafo" data-i18n="parrafo_experiencia">{t('parrafo_experiencia')}</p>
    </>
  );
}
