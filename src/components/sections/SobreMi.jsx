import { useEffect, useRef, useState } from 'react';
import { usePortafolio } from '../../context/PortafolioContext';

const FECHA_INICIO = new Date('2024-01-15'); // ajusta este día si lo recuerdas exacto

export default function SobreMi() {
  const { t } = usePortafolio();

  /* --------- Efecto "typing" en el título (una sola vez al montar) --------- */
  const tituloRef = useRef(null);
  const [claseTyping, setClaseTyping] = useState('typing-en-progreso');

  useEffect(() => {
    const el = tituloRef.current;
    if (!el) return;
    function alTerminar() {
      setClaseTyping('typing-listo');
    }
    el.addEventListener('animationend', alTerminar, { once: true });
    return () => el.removeEventListener('animationend', alTerminar);
  }, []);

  /* --------- Contador de días formándome como desarrollador --------- */
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const hoy = new Date();
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diasTotales = Math.floor((hoy - FECHA_INICIO) / milisegundosPorDia);

    let contadorActual = 0;
    const incremento = Math.ceil(diasTotales / 60);

    const intervalo = setInterval(() => {
      contadorActual += incremento;
      if (contadorActual >= diasTotales) {
        contadorActual = diasTotales;
        clearInterval(intervalo);
      }
      setContador(contadorActual);
    }, 20);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <p className="saludo" data-i18n="saludo_about">{t('saludo_about')}</p>
      <h2 className={`titulo-grande ${claseTyping}`} id="tituloTyping" ref={tituloRef}>
        <span data-i18n="titulo_about_pre">{t('titulo_about_pre')}</span>{' '}
        <span className="resaltado">Cristian Santos</span>
        <span data-i18n="titulo_about_post">{t('titulo_about_post')}</span>
      </h2>
      <p className="frase-identidad" data-i18n="frase_identidad">{t('frase_identidad')}</p>

      <div className="contacto-rapido">
        <a href="mailto:cristian.santosmmm@gmail.com" className="chip-contacto">📧 cristian.santosmmm@gmail.com</a>
        <a href="https://github.com/csantos-2024022" target="_blank" rel="noopener" className="chip-contacto">
          💻 github.com/csantos-2024022
        </a>
      </div>

      <hr className="divisor" />

      <h3 className="subtitulo">
        <span data-i18n="subtitulo_sobre_mi">{t('subtitulo_sobre_mi')}</span>{' '}
        <span className="resaltado" data-i18n="subtitulo_sobre_mi_resaltado">{t('subtitulo_sobre_mi_resaltado')}</span>
      </h3>
      <p className="parrafo" data-i18n="parrafo_sobre_mi">{t('parrafo_sobre_mi')}</p>

      <h3 className="subtitulo">
        <span data-i18n="subtitulo_datos">{t('subtitulo_datos')}</span>{' '}
        <span className="resaltado" data-i18n="subtitulo_datos_resaltado">{t('subtitulo_datos_resaltado')}</span>
      </h3>
      <div className="bento-datos">
        <div className="bento-item">
          <span className="bento-icono">🧑</span>
          <div className="bento-texto">
            <strong data-i18n="dato_nombre">{t('dato_nombre')}</strong>
            <span data-i18n="dato_nombre_valor">{t('dato_nombre_valor')}</span>
          </div>
        </div>
        <div className="bento-item">
          <span className="bento-icono">🎂</span>
          <div className="bento-texto">
            <strong data-i18n="dato_edad">{t('dato_edad')}</strong>
            <span data-i18n="dato_edad_valor">{t('dato_edad_valor')}</span>
          </div>
        </div>
        <div className="bento-item">
          <span className="bento-icono">🎓</span>
          <div className="bento-texto">
            <strong data-i18n="dato_formacion">{t('dato_formacion')}</strong>
            <span data-i18n="dato_formacion_valor">{t('dato_formacion_valor')}</span>
          </div>
        </div>
        <div className="bento-item">
          <span className="bento-icono">📘</span>
          <div className="bento-texto">
            <strong data-i18n="dato_estudiando">{t('dato_estudiando')}</strong>
            <span data-i18n="dato_estudiando_valor">{t('dato_estudiando_valor')}</span>
          </div>
        </div>
      </div>

      <h3 className="subtitulo" data-i18n="subtitulo_idiomas">{t('subtitulo_idiomas')}</h3>
      <div className="grid-idiomas">
        <div className="tarjeta-idioma">
          <div className="idioma-encabezado">
            <span className="idioma-bandera">🇬🇹</span>
            <strong data-i18n="dato_idioma_es">{t('dato_idioma_es')}</strong>
            <span className="nivel-barras">
              <span className="nivel-barra llena"></span>
              <span className="nivel-barra llena"></span>
              <span className="nivel-barra llena"></span>
            </span>
          </div>
          <p className="idioma-detalle" data-i18n="dato_idioma_es_valor">{t('dato_idioma_es_valor')}</p>
        </div>
        <div className="tarjeta-idioma">
          <div className="idioma-encabezado">
            <span className="idioma-bandera">🇺🇸</span>
            <strong data-i18n="dato_idioma_en">{t('dato_idioma_en')}</strong>
            <span className="nivel-barras">
              <span className="nivel-barra llena"></span>
              <span className="nivel-barra llena"></span>
              <span className="nivel-barra"></span>
            </span>
          </div>
          <p className="idioma-detalle" data-i18n="dato_idioma_en_valor">{t('dato_idioma_en_valor')}</p>
        </div>
      </div>

      
    </>
  );
}
