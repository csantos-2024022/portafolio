/* =========================================================
   HABILIDADES — datos de tarjetas categorizadas
   Mismo contenido que el habilidades.js original, ahora como
   datos puros que el componente <Habilidades> renderiza.
   ========================================================= */

const ICONOS_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

export const categorias = [
  {
    clave: 'cat_lenguajes',
    skills: [
      { nombre: 'Java', nivel: 'avanzado', icono: ICONOS_BASE + 'java/java-original.svg', proyecto: 'Ahorcado' },
      { nombre: 'JavaScript', nivel: 'avanzado', icono: ICONOS_BASE + 'javascript/javascript-original.svg', proyecto: 'Apps móviles (Banco y Restaurante)' },
      { nombre: 'HTML / CSS', nivel: 'avanzado', icono: ICONOS_BASE + 'html5/html5-original.svg', proyecto: 'Ahorcado' },
      { nombre: 'C# (.NET)', nivel: 'intermedio', icono: ICONOS_BASE + 'csharp/csharp-original.svg', proyecto: null },
    ],
  },
  {
    clave: 'cat_frameworks',
    skills: [
      { nombre: 'React Native', nivel: 'avanzado', icono: ICONOS_BASE + 'react/react-original.svg', proyecto: 'Apps móviles (Banco y Restaurante)' },
      { nombre: 'Node.js', nivel: 'intermedio', icono: ICONOS_BASE + 'nodejs/nodejs-original.svg', proyecto: 'Apps móviles (Banco y Restaurante)' },
      { nombre: 'Spring Boot', nivel: 'intermedio', icono: ICONOS_BASE + 'spring/spring-original.svg', proyecto: 'Ahorcado' },
      { nombre: 'JavaFX', nivel: 'avanzado', emoji: '🖥️', proyecto: null },
      { nombre: 'JavaEE', nivel: 'intermedio', emoji: '🧩', proyecto: null },
      { nombre: 'REST API', nivel: 'intermedio', emoji: '🔗', proyecto: 'Apps móviles (Banco y Restaurante)' },
    ],
  },
  {
    clave: 'cat_bases_datos',
    skills: [
      { nombre: 'MySQL', nivel: 'avanzado', icono: ICONOS_BASE + 'mysql/mysql-original.svg', proyecto: 'Ahorcado' },
      { nombre: 'PostgreSQL', nivel: 'intermedio', icono: ICONOS_BASE + 'postgresql/postgresql-original.svg', proyecto: 'Apps móviles (Banco y Restaurante)' },
      { nombre: 'MongoDB', nivel: 'intermedio', icono: ICONOS_BASE + 'mongodb/mongodb-original.svg', proyecto: 'Apps móviles (Banco y Restaurante)' },
      { nombre: 'Supabase', nivel: 'basico', icono: ICONOS_BASE + 'supabase/supabase-original.svg', proyecto: null },
    ],
    tags: ['pgAdmin'],
  },
  {
    clave: 'cat_herramientas',
    skills: [
      { nombre: 'Git', nivel: 'avanzado', icono: ICONOS_BASE + 'git/git-original.svg', proyecto: null },
      { nombre: 'GitHub', nivel: 'avanzado', icono: ICONOS_BASE + 'github/github-original.svg', invertirEnOscuro: true, proyecto: null },
      { nombre: 'Docker', nivel: 'intermedio', icono: ICONOS_BASE + 'docker/docker-original.svg', proyecto: 'Apps móviles (Banco y Restaurante)' },
      { nombre: 'Maven', nivel: 'intermedio', icono: ICONOS_BASE + 'maven/maven-original.svg', proyecto: 'Ahorcado' },
      { nombre: 'Postman', nivel: 'intermedio', icono: ICONOS_BASE + 'postman/postman-original.svg', proyecto: null },
      { nombre: 'VS Code', nivel: 'avanzado', icono: ICONOS_BASE + 'vscode/vscode-original.svg', proyecto: null },
    ],
    tags: ['Scrum', 'Agile', 'CI/CD', 'Vercel'],
  },
];

// ⚠️ AJUSTA ESTO: poné acá lo que estés estudiando ahora mismo por tu cuenta.
export const aprendiendo = [
  { nombre: 'TypeScript', emoji: '📘' },
  { nombre: 'Spring Boot', emoji: '🌱' },
];

export function nivelATotal(nivel) {
  const totales = { avanzado: 3, intermedio: 2, basico: 1 };
  return totales[nivel] || 1;
}
