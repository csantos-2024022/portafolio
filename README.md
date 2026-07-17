# Portafolio — migrado a React + Vite

Migración 1:1 del portafolio original (HTML + CSS + JS vanilla) a React
+ Vite. El diseño, los estilos y el comportamiento son exactamente los
mismos; lo único que cambió es *cómo* está construido internamente.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (por defecto `http://localhost:5173`).

Para generar la build de producción:

```bash
npm run build
npm run preview
```

## Qué se conservó tal cual

- **Todo el CSS original**, sin tocar una sola línea, en `src/styles/`.
  Se importa en el mismo orden en que estaba enlazado en el `<head>`
  del `index.html` original (ver `src/styles/index.js`).
- **Todas las imágenes y el video**, en `public/assets/img/`, con los
  mismos nombres de archivo y las mismas rutas (`/assets/img/...`),
  incluyendo cualquier inconsistencia de mayúsculas/minúsculas que ya
  existiera en el proyecto original.
- El texto, las traducciones ES/EN, los datos de habilidades y de
  proyectos son exactamente los mismos que estaban hardcodeados en
  `index.html` / `js/traducciones.js` / `js/habilidades.js`.
- `agua-sidebar.css`, `galeria.css` y `js/galeria.js` **no** se
  migraron porque el `index.html` original tampoco los enlazaba (eran
  archivos "huérfanos" del proyecto). El overlay de "modo código
  fuente" se conservó igual de inerte que en el original (no tiene
  ningún botón que lo abra).

## Cómo se organizó

```
src/
  main.jsx                     Punto de entrada
  App.jsx                      Monta el Provider y el layout
  context/
    PortafolioContext.jsx      Reemplaza TODAS las variables globales
                                de main.js: idioma, tema, sonido,
                                navegación entre secciones, lightbox,
                                sidebar móvil/colapsado
  hooks/                       Un hook por cada pieza de JS "imperativo"
    useNavPill.js                 js/nav-pill.js
    useLiquidGlass.js             js/liquid-glass.js
    useTiltProyectos.js           js/tilt.js
    useHoverTarjetasProyecto.js   main.js (hover 3D en tarjetas)
    useCustomCursor.js            js/intro.js (cursor magnético)
    useScrollProgress.js          main.js (barra de progreso)
    useParticles.js               particles.js + su config
  components/
    Sidebar.jsx, Contenido.jsx, Seccion.jsx, Lightbox.jsx,
    IntroLoader.jsx, Aurora.jsx, HamburgerButton.jsx, Overlay.jsx,
    SourceCodeOverlay.jsx, ProyectoImgWrapper.jsx
    sections/
      SobreMi.jsx, Educacion.jsx, Habilidades.jsx, Proyectos.jsx,
      Contacto.jsx
  data/
    habilidades.js              (antes: js/habilidades.js)
    proyectos.js                (antes: hardcodeado en index.html)
  i18n/
    traducciones.js             (antes: js/traducciones.js)
  styles/                       Todo el CSS original, sin modificar
```

## Sobre la manipulación del DOM

Toda la manipulación directa del DOM del proyecto original
(`document.getElementById`, `querySelectorAll`, `classList.add/remove`
disparados manualmente, `addEventListener` sueltos, etc.) fue
reemplazada por:

- **Estado de React** (`useState`) para todo lo que es "dato" real:
  idioma activo, tema, sonido activado/desactivado, sección activa,
  pestaña de proyecto seleccionada, estado del formulario, etc.
- **`useRef` + `useEffect`** para lo que sigue siendo, por naturaleza,
  una animación CSS orquestada imperativamente (la cortina de
  transición, la cascada de aparición de elementos, el tilt 3D, el
  brillo que sigue al mouse, la píldora deslizante del menú, el
  cursor personalizado). Esto es exactamente para lo que `useRef`
  existe: dar acceso controlado al nodo real del DOM sin salirse del
  modelo de React.
- **Context** (`PortafolioContext`) para compartir ese estado entre
  componentes que antes se comunicaban a través de variables globales
  del archivo `main.js`.

No queda ningún `document.querySelector` global ni manipulación de
clases "a mano" fuera de un `useEffect`/`useRef`.
