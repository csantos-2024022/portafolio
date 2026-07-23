/* Hoja de estilos propia */
import './styles.css';
/* Transiciones: deslizamiento direccional + cortina de escaneo */
import './transiciones.css';
/* Intro cinemática + cursor personalizado */
import './intro.css';
/* Tilt 3D con glare para los tabs de proyectos */
import './tilt.css';
/* Píldora deslizante del menú */
import './nav-pill.css';
/* Liquid Glass: sidebar, botones y píldora estilo vidrio líquido */
import './liquid-glass.css';
/* Tarjetas categorizadas de habilidades */
import './habilidades.css';
/* Rediseño de Sobre mí: chips, bento grid, tarjetas de idiomas */
import './sobre-mi.css';
/* Portada de fogata a pantalla completa */
import './fogata-intro.css';

/* Nota: agua-sidebar.css y galeria.css existen en el proyecto original
   pero NO estaban enlazados en el <head> del index.html (ni su galeria.js
   estaba incluido al final del body), así que se dejan sin importar aquí
   para no alterar el diseño ni el comportamiento actual del sitio. */

/* Fix estructural (no de diseño): evita que el <div id="root"> de
   Vite/React rompa el layout flex de dos columnas que define body
   en styles.css. Ver comentario dentro del archivo. */
import './root-fix.css';
/* Rediseño moderno de la sección Contacto */
import './contacto.css';