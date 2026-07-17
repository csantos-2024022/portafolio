// Nota: en el proyecto original este overlay ya no tiene ningún botón que
// lo abra (el disparador fue eliminado del HTML), así que se conserva tal
// cual: presente en el DOM pero inactivo, igual que en el sitio original.
export default function SourceCodeOverlay() {
  return (
    <div className="overlay-codigo" id="overlayCodigo">
      <button className="cerrar-codigo" id="cerrarCodigo" aria-label="Cerrar modo código fuente">✕</button>
      <pre className="bloque-codigo">
        <code>
          <span className="cf-keyword">const</span> <span className="cf-var">desarrollador</span> = {'{'}
          {'\n'}  <span className="cf-prop">nombre</span>: <span className="cf-string">'Cristian Enrique Santos Martínez'</span>,
          {'\n'}  <span className="cf-prop">rol</span>: <span className="cf-string">'Desarrollador de software'</span>,
          {'\n'}  <span className="cf-prop">formacion</span>: <span className="cf-string">'Perito Técnico en Computación — Fundación Kinal'</span>,
          {'\n'}  <span className="cf-prop">skills</span>: [<span className="cf-string">'Java'</span>, <span className="cf-string">'JavaScript'</span>, <span className="cf-string">'React'</span>, <span className="cf-string">'C#'</span>, <span className="cf-string">'SQL'</span>],
          {'\n'}  <span className="cf-prop">intereses</span>: [<span className="cf-string">'análisis de datos'</span>, <span className="cf-string">'desarrollo web'</span>],
          {'\n'}
          {'\n'}  <span className="cf-comment">// siempre aprendiendo algo nuevo</span>
          {'\n'}  <span className="cf-func">seguirCreciendo</span>() {'{'}
          {'\n'}    <span className="cf-keyword">return</span> <span className="cf-string">'código limpio, datos claros'</span>;
          {'\n'}  {'}'}
          {'\n'}{'}'};
          {'\n'}
          {'\n'}<span className="cf-comment">// gracias por revisar mi portafolio 👋</span>
          {'\n'}<span className="cf-var">desarrollador</span>.<span className="cf-func">seguirCreciendo</span>();
        </code>
      </pre>
    </div>
  );
}
