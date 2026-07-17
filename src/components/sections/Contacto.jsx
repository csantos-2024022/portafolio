import { useRef, useState } from 'react';
import { usePortafolio } from '../../context/PortafolioContext';

const FORM_ACTION = 'https://formspree.io/f/xdaryqlk';

const REDES = [
  { icono: '📧', href: 'mailto:cristian.santosmmm@gmail.com', clave: 'red_correo', externo: false },
  { icono: '💻', href: 'https://github.com/csantos-2024022', clave: 'red_github', externo: true },
  { icono: '💼', href: 'https://www.linkedin.com/in/cristian-santos-704b63418/', clave: 'red_linkedin', externo: true },
];

export default function Contacto() {
  const { t } = usePortafolio();
  const formRef = useRef(null);

  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState({ mensaje: '', color: '' });

  async function alEnviar(evento) {
    evento.preventDefault();

    setEnviando(true);
    setEstado({ mensaje: '', color: '' });

    try {
      const datos = new FormData(formRef.current);

      const respuesta = await fetch(FORM_ACTION, {
        method: 'POST',
        body: datos,
        headers: { Accept: 'application/json' },
      });

      if (respuesta.ok) {
        setEstado({ mensaje: t('form_exito'), color: '#5DCAA5' });
        formRef.current.reset();
      } else {
        throw new Error('Respuesta no exitosa');
      }
    } catch (error) {
      setEstado({ mensaje: t('form_error'), color: '#E24B4A' });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <p className="saludo" data-i18n="saludo_contacto">{t('saludo_contacto')}</p>
      <h2 className="titulo-grande">
        <span data-i18n="titulo_contacto_pre">{t('titulo_contacto_pre')}</span>{' '}
        <span className="resaltado" data-i18n="titulo_contacto_resaltado">{t('titulo_contacto_resaltado')}</span>
      </h2>

      <hr className="divisor" />

      <p className="parrafo" data-i18n="parrafo_contacto">{t('parrafo_contacto')}</p>

      <div className="contacto-layout">
        {/* ---- Columna izquierda: formulario ---- */}
        <div className="contacto-form-card">
          <form className="form-contacto" id="formContacto" action={FORM_ACTION} method="POST" ref={formRef} onSubmit={alEnviar}>
            <label htmlFor="nombre" data-i18n="form_label_nombre">{t('form_label_nombre')}</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              placeholder={t('form_placeholder_nombre')}
              data-i18n-placeholder="form_placeholder_nombre"
            />

            <label htmlFor="email" data-i18n="form_label_email">{t('form_label_email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('form_placeholder_email')}
              data-i18n-placeholder="form_placeholder_email"
            />

            <label htmlFor="mensaje" data-i18n="form_label_mensaje">{t('form_label_mensaje')}</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              required
              placeholder={t('form_placeholder_mensaje')}
              data-i18n-placeholder="form_placeholder_mensaje"
            ></textarea>

            <button type="submit" className="boton-enviar" disabled={enviando}>
              {enviando ? t('form_boton_enviando') : t('form_boton_enviar')}
            </button>

            <p className="form-estado" id="formEstado" style={{ color: estado.color }}>{estado.mensaje}</p>
          </form>
        </div>

        {/* ---- Columna derecha: contacto directo + redes ---- */}
        <div className="contacto-info-col">
          <div className="contacto-info-card">
            <div className="contacto-disponibilidad" style={{ marginBottom: '1.25rem' }}>
              <span className="punto-disponible"></span>
              <span data-i18n="contacto_disponible">{t('contacto_disponible')}</span>
            </div>

            <p className="contacto-info-titulo" data-i18n="contacto_info_titulo">{t('contacto_info_titulo')}</p>

            <div className="redes-contacto">
              {REDES.map((red) => (
                <a
                  key={red.clave}
                  href={red.href}
                  target={red.externo ? '_blank' : undefined}
                  rel={red.externo ? 'noopener noreferrer' : undefined}
                  className="red-link"
                  data-i18n={red.clave}
                >
                  <span className="red-link-icono">{red.icono}</span>
                  {t(red.clave).replace(/^\S+\s/, '')}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}