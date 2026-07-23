import { usePortafolio } from '../../context/PortafolioContext';
import { categorias, aprendiendo, nivelATotal } from '../../data/habilidades';

function BarraNivel({ nivel }) {
  const llenos = nivelATotal(nivel);
  return (
    <span className="nivel-barras">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`nivel-barra${i <= llenos ? ' llena' : ''}`}></span>
      ))}
    </span>
  );
}

function TarjetaSkill({ skill, t }) {
  const claseIcono = `skill-icono${skill.invertirEnOscuro ? ' skill-icono-invertible' : ''}`;

  return (
    <div className="tarjeta-skill">
      {skill.icono ? (
        <img
          src={skill.icono}
          alt=""
          className={claseIcono}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="skill-icono skill-icono-emoji">{skill.emoji}</span>
      )}
      <div className="skill-info">
        <p className="skill-nombre">{skill.nombre}</p>
        <div className="skill-nivel">
          <BarraNivel nivel={skill.nivel} />
          <span className="nivel-texto">{t(`nivel_${skill.nivel}`)}</span>
        </div>
        {skill.proyecto && (
          <p className="skill-proyecto">
            {t('texto_usado_en')} <strong>{skill.proyecto}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default function Habilidades() {
  const { t } = usePortafolio();

  return (
    <>
      <p className="saludo" data-i18n="saludo_habilidades">{t('saludo_habilidades')}</p>
      <h2 className="titulo-grande">
        <span data-i18n="titulo_habilidades_pre">{t('titulo_habilidades_pre')}</span>{' '}
        <span className="resaltado" data-i18n="titulo_habilidades_resaltado">{t('titulo_habilidades_resaltado')}</span>
      </h2>

      <hr className="divisor" />

      <p className="parrafo" data-i18n="parrafo_habilidades">{t('parrafo_habilidades')}</p>

      <div id="habilidadesContenedor" className="habilidades-contenedor">
        {categorias.map((categoria) => (
          <div className="categoria-habilidades" key={categoria.clave}>
            <h3 className="categoria-titulo">{t(categoria.clave)}</h3>
            <div className="grid-skills">
              {categoria.skills.map((skill) => (
                <TarjetaSkill skill={skill} t={t} key={skill.nombre} />
              ))}
            </div>
            {categoria.tags && categoria.tags.length > 0 && (
              <div className="tags-relacionados">
                {categoria.tags.map((tag) => (
                  <span className="tag-relacionado" key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="bloque-aprendiendo">
          <h3 className="categoria-titulo">{t('subtitulo_aprendiendo')}</h3>
          <p className="parrafo-aprendiendo">{t('parrafo_aprendiendo')}</p>
          <div className="grid-aprendiendo">
            {aprendiendo.map((item) => (
              <div className="chip-aprendiendo" key={item.nombre}>
                <span>{item.emoji}</span>
                {item.nombre}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
