/* =========================================================
   TRADUCCIONES (Español / Inglés)
   Cada texto del sitio tiene un identificador único (la clave,
   ej. "saludo_about"). Para cada idioma, ese identificador
   apunta al texto correspondiente. Los componentes leen este
   objeto (via el hook useIdioma) para saber qué mostrar según
   el idioma activo.

   Para agregar un texto nuevo: ponle una clave aquí en AMBOS
   idiomas, y en el componente usa t('esa-clave').
   ========================================================= */

export const traducciones = {

  es: {
    // ---- Menú del sidebar ----
    nav_about: 'Sobre mí',
    nav_educacion: 'Educación',
    nav_habilidades: 'Habilidades',
    nav_proyectos: 'Proyectos',
    nav_contacto: 'Contacto',

    // ---- Sección: Sobre mí ----
    saludo_about: '👋 Hola, bienvenido a mi portafolio',
    titulo_about_pre: 'Soy',
    titulo_about_post: ', Desarrollador de software',
    frase_identidad: '"Código limpio, datos claros."',
    boton_cv: '⬇️ Descargar CV (PDF)',
    subtitulo_sobre_mi: 'Un poco',
    subtitulo_sobre_mi_resaltado: 'sobre mí',
    parrafo_sobre_mi: 'Soy estudiante de Perito Técnico en Computación en Fundación Kinal, con interés en el desarrollo de software y el análisis de datos. Me gusta resolver problemas a través del código y seguir aprendiendo nuevas tecnologías para mejorar como desarrollador.',
    subtitulo_datos: 'Datos',
    subtitulo_datos_resaltado: 'generales',
    dato_nombre: 'Nombre:',
    dato_nombre_valor: 'Cristian Enrique Santos Martínez',
    dato_edad: 'Edad:',
    dato_edad_valor: '18 años',
    dato_formacion: 'Formación:',
    dato_formacion_valor: '2 años formándome como desarrollador en Kinal',
    dato_estudiando: 'Estudiando actualmente:',
    dato_estudiando_valor: 'Sí',
    contador_texto: 'días formándome como desarrollador',

    subtitulo_idiomas: 'Idiomas',
    dato_idioma_es: 'Español:',
    dato_idioma_es_valor: 'Nativo',
    dato_idioma_en: 'Inglés:',
    dato_idioma_en_valor: 'Nivel intermedio-alto (conversacional y técnico), sin certificación formal aún',

    // ---- Sección: Educación ----
    saludo_educacion: '🎓 Mi formación',
    titulo_educacion_pre: 'Educación y',
    titulo_educacion_resaltado: 'experiencia',
    subtitulo_educacion: 'Educación',
    timeline_titulo: 'Perito Técnico en Computación',
    timeline_lugar: 'Fundación Kinal, Guatemala',
    timeline_descripcion: 'Formación técnica enfocada en desarrollo de software, bases de datos y buenas prácticas de programación.',
    subtitulo_experiencia: 'Experiencia',
    parrafo_experiencia: 'Como parte de mi formación en Fundación Kinal, realizaré 400 horas de prácticas profesionales supervisadas al finalizar mis estudios. Actualizaré este espacio con el detalle de la empresa, el rol y los proyectos en los que participe una vez completadas.',

    // ---- Sección: Habilidades ----
    saludo_habilidades: '🛠️ Mis herramientas',
    titulo_habilidades_pre: 'Habilidades',
    titulo_habilidades_resaltado: 'técnicas',
    parrafo_habilidades: 'Estos son los lenguajes, frameworks y herramientas con los que he trabajado durante mi formación.',

    cat_lenguajes: 'Lenguajes',
    cat_frameworks: 'Frameworks y librerías',
    cat_bases_datos: 'Bases de datos',
    cat_herramientas: 'Herramientas',

    nivel_avanzado: 'Avanzado',
    nivel_intermedio: 'Intermedio',
    nivel_basico: 'Básico',
    texto_usado_en: 'Usado en:',

    subtitulo_aprendiendo: '📚 Actualmente aprendiendo',
    parrafo_aprendiendo: 'Tecnologías que estoy estudiando por mi cuenta ahora mismo, fuera del pénsum de Kinal.',

    // ---- Sección: Proyectos ----
    saludo_proyectos: '📁 Mi trabajo',
    titulo_proyectos_pre: 'Mis',
    titulo_proyectos_resaltado: 'proyectos',
    parrafo_proyectos: 'Aquí encontrarás algunos de los proyectos que he desarrollado durante mi formación. Puedes ver el código completo en cada repositorio de GitHub.',
    proyecto_titulo_ejemplo: 'Nombre del proyecto',
    proyecto_descripcion_ejemplo: 'Breve descripción de qué hace el proyecto y qué problema resuelve.',
    proyecto_boton: 'Ver en GitHub ↗',

    // ---- Sección: Contacto ----
    saludo_contacto: '✉️ Hablemos',
    titulo_contacto_pre: 'Ponte en',
    titulo_contacto_resaltado: 'contacto',
    parrafo_contacto: '¿Tienes un proyecto en mente o una oportunidad laboral? Escríbeme y te responderé lo antes posible.',
    form_label_nombre: 'Nombre',
    form_placeholder_nombre: 'Tu nombre',
    form_label_email: 'Correo',
    form_placeholder_email: 'tu@correo.com',
    form_label_mensaje: 'Mensaje',
    form_placeholder_mensaje: 'Escribe tu mensaje...',
    form_boton_enviar: 'Enviar mensaje',
    form_boton_enviando: 'Enviando...',
    form_exito: '✅ ¡Mensaje enviado! Te responderé pronto.',
    form_error: '❌ Hubo un error al enviar. Intenta de nuevo o escríbeme directo por correo.',
    red_correo: '📧 Correo',
    red_github: '💻 GitHub',
    red_linkedin: '💼 LinkedIn',
    red_computrabajo: '🧑\u200d💼 CompuTrabajo',
    contacto_info_titulo: 'Contáctame directamente',
    contacto_disponible: 'Disponible para nuevas oportunidades',
  },

  en: {
    // ---- Sidebar menu ----
    nav_about: 'About me',
    nav_educacion: 'Education',
    nav_habilidades: 'Skills',
    nav_proyectos: 'Projects',
    nav_contacto: 'Contact',

    // ---- Section: About me ----
    saludo_about: "👋 Hi, welcome to my portfolio",
    titulo_about_pre: "I'm",
    titulo_about_post: ', Software Developer',
    frase_identidad: '"Clean code, clear data."',
    boton_cv: '⬇️ Download CV (PDF)',
    subtitulo_sobre_mi: 'A little bit',
    subtitulo_sobre_mi_resaltado: 'about me',
    parrafo_sobre_mi: "I'm a Computer Technician student at Fundación Kinal, interested in software development and data analysis. I enjoy solving problems through code and continuously learning new technologies to grow as a developer.",
    subtitulo_datos: 'General',
    subtitulo_datos_resaltado: 'information',
    dato_nombre: 'Name:',
    dato_nombre_valor: 'Cristian Enrique Santos Martínez',
    dato_edad: 'Age:',
    dato_edad_valor: '18 years old',
    dato_formacion: 'Background:',
    dato_formacion_valor: '2 years training as a developer at Kinal',
    dato_estudiando: 'Currently studying:',
    dato_estudiando_valor: 'Yes',
    contador_texto: 'days training as a developer',

    subtitulo_idiomas: 'Languages',
    dato_idioma_es: 'Spanish:',
    dato_idioma_es_valor: 'Native',
    dato_idioma_en: 'English:',
    dato_idioma_en_valor: 'Upper-intermediate level (conversational and technical), no formal certification yet',

    // ---- Section: Education ----
    saludo_educacion: '🎓 My background',
    titulo_educacion_pre: 'Education and',
    titulo_educacion_resaltado: 'experience',
    subtitulo_educacion: 'Education',
    timeline_titulo: 'Computer Technician',
    timeline_lugar: 'Fundación Kinal, Guatemala',
    timeline_descripcion: 'Technical training focused on software development, databases, and good programming practices.',
    subtitulo_experiencia: 'Experience',
    parrafo_experiencia: "As part of my training at Fundación Kinal, I will complete 400 hours of supervised professional internship after finishing my studies. I'll update this space with the company, role, and projects I worked on once it's completed.",

    // ---- Section: Skills ----
    saludo_habilidades: '🛠️ My tools',
    titulo_habilidades_pre: 'Technical',
    titulo_habilidades_resaltado: 'skills',
    parrafo_habilidades: "These are the languages, frameworks, and tools I've worked with during my training.",

    cat_lenguajes: 'Languages',
    cat_frameworks: 'Frameworks & libraries',
    cat_bases_datos: 'Databases',
    cat_herramientas: 'Tools',

    nivel_avanzado: 'Advanced',
    nivel_intermedio: 'Intermediate',
    nivel_basico: 'Basic',
    texto_usado_en: 'Used in:',

    subtitulo_aprendiendo: '📚 Currently learning',
    parrafo_aprendiendo: "Technologies I'm studying on my own right now, outside of Kinal's curriculum.",

    // ---- Section: Projects ----
    saludo_proyectos: '📁 My work',
    titulo_proyectos_pre: 'My',
    titulo_proyectos_resaltado: 'projects',
    parrafo_proyectos: "Here you'll find some of the projects I've developed during my training. You can view the full code in each GitHub repository.",
    proyecto_titulo_ejemplo: 'Project name',
    proyecto_descripcion_ejemplo: 'Brief description of what the project does and what problem it solves.',
    proyecto_boton: 'View on GitHub ↗',

    // ---- Section: Contact ----
    saludo_contacto: "✉️ Let's talk",
    titulo_contacto_pre: 'Get in',
    titulo_contacto_resaltado: 'touch',
    parrafo_contacto: 'Have a project in mind or a job opportunity? Write to me and I will get back to you as soon as possible.',
    form_label_nombre: 'Name',
    form_placeholder_nombre: 'Your name',
    form_label_email: 'Email',
    form_placeholder_email: 'you@email.com',
    form_label_mensaje: 'Message',
    form_placeholder_mensaje: 'Write your message...',
    form_boton_enviar: 'Send message',
    form_boton_enviando: 'Sending...',
    form_exito: '✅ Message sent! I will reply soon.',
    form_error: '❌ There was an error sending it. Please try again or email me directly.',
    red_correo: '📧 Email',
    red_github: '💻 GitHub',
    red_linkedin: '💼 LinkedIn',
    red_computrabajo: '🧑\u200d💼 CompuTrabajo',
    contacto_info_titulo: 'Contact me directly',
    contacto_disponible: 'Available for new opportunities',
  },

};