/* =========================================================
   PROYECTOS — datos de tabs, paneles y mini-proyectos
   Mismo contenido que estaba hardcodeado en index.html.
   ========================================================= */

export const proyectosTabs = [
  {
    id: 'banco',
    imgTab: '/assets/img/vistaDashboard-admin-banco.png',
    altTab: 'Bank Management',
    numero: '01',
    nombre: 'Bank Management',
  },
  {
    id: 'restaurante',
    imgTab: '/assets/img/vistaAdmin-restaurante.png',
    altTab: 'Restaurant Management',
    numero: '02',
    nombre: 'Restaurant Management',
  },
];

export const proyectosPaneles = {
  banco: {
    imagenes: [
      { src: '/assets/img/banco3.jpeg', alt: 'App banco móvil - captura 1' },
      { src: '/assets/img/Banco1.jpeg', alt: 'App banco móvil - captura 2' },
      { src: '/assets/img/banco2.jpeg', alt: 'App banco móvil - captura 3' },
    ],
    imgPrincipal: '/assets/img/Banco1.jpeg',
    altPrincipal: 'App banco móvil',
    video: {
      src: '/assets/img/videoBanco.mp4',
      poster: '/assets/img/Banco1.jpeg',
    },
    titulo: 'Bank Management System',
    descripcion:
      'App móvil para clientes del banco: gestión de cuenta con descuentos en productos por usar el banco, transferencias, depósitos y transferencias rápidas a favoritos.',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Microservicios'],
    githubUrl: 'https://github.com/jsanta-2024254/bank-management-system.git',
  },
  restaurante: {
    imagenes: [
      { src: '/assets/img/restaurante-movil-1.jpeg', alt: 'App restaurante móvil - captura 1' },
    ],
    imgPrincipal: '/assets/img/restaurante-movil-1.jpeg',
    altPrincipal: 'App restaurante móvil',
    video: null,
    titulo: 'Restaurant Management System',
    descripcion:
      'App móvil para clientes del restaurante: consulta del menú, arma tu pedido y reserva mesa desde el celular, con seguimiento simple del estado del pedido en tiempo real.',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Vercel'],
    githubUrl: 'https://github.com/ecujcuj-2024028/Restaurant-Management-System.git',
  },
};

export const miniProyectos = [
  {
    id: 'ahorcado',
    imagenes: [{ src: '/assets/img/Ahorcado2.jpeg', alt: 'Juego de Ahorcado' }],
    imgPrincipal: '/assets/img/Ahorcado1.jpeg',
    altPrincipal: 'Juego de Ahorcado',
    titulo: 'Ahorcado',
    descripcion:
      'Juego de ahorcado clásico con banco de palabras almacenado en base de datos (no hardcodeado en el código), para practicar backend con Spring Boot.',
    tags: ['Spring Boot', 'MySQL', 'Maven'],
    githubUrl: 'https://github.com/csantos-2024022/Ahorcado.git',
  },
];

// Tooltips para los tags de tecnologías (data-tooltip en el original)
export const descripcionesTech = {
  'React Native': 'Apps móviles con JavaScript',
  React: 'Interfaces web con componentes',
  'Node.js': 'Backend en JavaScript',
  PostgreSQL: 'Base de datos relacional',
  MongoDB: 'Base de datos NoSQL',
  Docker: 'Contenedores para despliegue',
  Microservicios: 'Arquitectura de servicios independientes',
  Java: 'Lenguaje orientado a objetos',
  MySQL: 'Base de datos relacional',
  JavaScript: 'Lenguaje de programación web',
  'C# (.NET)': 'Framework de Microsoft',
  Express: 'Framework web para Node.js',
  JWT: 'Autenticación con tokens',
  Zustand: 'Manejo de estado en React',
  Axios: 'Cliente HTTP para APIs',
  JavaFX: 'Interfaces gráficas con Java',
  JavaEE: 'Java para aplicaciones empresariales',
  'REST API': 'Arquitectura de comunicación entre servicios',
  Vercel: 'Plataforma de despliegue',
  Maven: 'Gestor de dependencias y build para Java',
};
