import type { PostCopy, PostSlug } from '../domain/types'

export const postsEs: Record<PostSlug, PostCopy> = {
  'templates-from-production': {
    title: 'Las plantillas que sirven salen de producción',
    description:
      'Una plantilla solo vale la pena si codifica decisiones que sobrevivieron a un despliegue real. De dónde sale cada una de mis cinco plantillas.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Una plantilla de proyecto es un conjunto de decisiones que alguien más ya tomó por ti. Ese es todo su valor, y también todo su riesgo: si esas decisiones nunca se probaron contra un producto en operación, clonar el repositorio no te compra más que una estructura de carpetas.',
      },
      {
        type: 'paragraph',
        text: 'Mantengo cinco plantillas públicas, y cada una existe porque ya había tomado las mismas decisiones dos veces y no quería tomarlas una tercera desde cero.',
      },
      { type: 'heading', text: 'De dónde sale cada una' },
      {
        type: 'list',
        items: [
          'next-stack es la plantilla sobre la que corre este portafolio. Cada convención que define — la regla de dependencias en una dirección, el patrón de contenido tipado, los helpers de SEO, la estructura de rutas con i18n — está corriendo en público bajo mi propio nombre.',
          'react-native-expo-stack codifica el stack de React Native y Expo con el que se entrega HerbaFit, la app oficial de fitness de Herbalife para Android.',
          'fastapi-lambda-cdk-template está basada en los estándares de TalentosBackend, el backend de producción de TALENTÜ.',
          'vite-stack es el cliente de una sola página al que recurro cuando el trabajo no necesita servidor, y express-hexagonal es la contraparte en Node de la plantilla de FastAPI.',
        ],
      },
      {
        type: 'paragraph',
        text: 'La afirmación que hago es estrecha a propósito. Ninguna de estas plantillas es una extracción literal del código de un cliente, y ninguna es una reescritura de un producto. Son las convenciones a las que llegaron esos sistemas, escritas en una forma que compila.',
      },
      { type: 'heading', text: 'Qué gana quien las lee' },
      {
        type: 'paragraph',
        text: 'Significa que las partes incómodas ya están resueltas. Una plantilla escrita para publicarse suele estar completa donde es fácil y vaga donde es difícil — autenticación, internacionalización, despliegue, el límite entre enrutamiento y lógica de negocio. Una plantilla extraída de algo que se entregó está completa justo donde entregar dolió.',
      },
      {
        type: 'paragraph',
        text: 'También significa que me doy cuenta cuando una plantilla se pudre. Este sitio es un despliegue de next-stack, así que una decisión equivocada en la plantilla se vuelve mi problema antes de volverse el tuyo.',
      },
    ],
  },
  'typed-content-instead-of-markdown': {
    title: 'Contenido tipado en vez de markdown',
    description:
      'Cada palabra de este sitio es un objeto tipado de TypeScript, no un archivo markdown. Eso convierte una traducción faltante en un error de compilación.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Cada página de este portafolio se genera desde objetos tipados de TypeScript. No hay un parser de markdown en la lista de dependencias, no hay una carpeta de contenido llena de archivos con front matter, y no hay CMS.',
      },
      {
        type: 'paragraph',
        text: 'Es una decisión poco común, así que vale la pena decir qué compra.',
      },
      { type: 'heading', text: 'Una traducción faltante rompe el build' },
      {
        type: 'paragraph',
        text: 'Este sitio se entrega en inglés y español, y cada página existe en los dos. El tipo del diccionario se infiere del archivo en inglés, así que una llave que existe en inglés y no en español es un error de tipos y no una frase en inglés servida a un lector hispanohablante. La misma regla cubre los proyectos, las plantillas, la línea de tiempo de experiencia y las preguntas frecuentes.',
      },
      {
        type: 'paragraph',
        text: 'Con archivos markdown esa garantía no existe. Una traducción que olvidaste es un archivo que simplemente no está, y nada falla hasta que un lector aterriza en ella.',
      },
      { type: 'heading', text: 'Los hechos viven en un lugar, la prosa en dos' },
      {
        type: 'paragraph',
        text: 'Cada módulo de contenido separa los hechos del texto. URLs, fechas, categorías, conteos de estrellas y relaciones entre entidades viven en un archivo independiente del idioma; las frases viven en un archivo por idioma. Esa separación permite que la página en inglés y la página en español discrepen en la redacción y jamás discrepen en una URL.',
      },
      {
        type: 'paragraph',
        text: 'También significa que los datos estructurados de cada página se generan desde los mismos objetos que el texto visible, que es la única forma confiable de que el JSON-LD y la copia digan lo mismo.',
      },
      { type: 'heading', text: 'El costo' },
      {
        type: 'paragraph',
        text: 'Escribir prosa dentro de un archivo de TypeScript es menos agradable que escribir markdown, y el escapado es incómodo. Para un sitio con un conjunto fijo de páginas y un requisito bilingüe estricto, el intercambio es fácil. Para una publicación con cincuenta autores, sería la decisión equivocada.',
      },
    ],
  },
  'building-for-answer-engines': {
    title: 'Un sitio hecho para ser citado, no solo rankeado',
    description:
      'Los buscadores rankean enlaces. Los motores de respuesta extraen frases. Optimizar para lo segundo cambia cómo escribes y qué emites.',
    blocks: [
      {
        type: 'paragraph',
        text: 'La optimización clásica para buscadores intenta rankear una página en una lista de enlaces. Un motor de respuestas hace algo distinto: extrae una o dos frases y las presenta como la respuesta, a veces con cita y a veces sin ella. Escribir para el segundo caso cambia tanto el marcado como la prosa.',
      },
      { type: 'heading', text: 'Emitir entidades, no solo páginas' },
      {
        type: 'paragraph',
        text: 'Este sitio emite un solo grafo de JSON-LD conectado por página, en vez de varios bloques sueltos. Una única entidad Person está anclada a un identificador estable y referenciada desde cada otra entidad del sitio, así que un motor que resuelve "¿quién escribió este software?" sigue una referencia en vez de adivinar por proximidad.',
      },
      {
        type: 'paragraph',
        text: 'Cada bloque de datos estructurados se renderiza en el servidor y está presente en el HTML inicial, porque varios crawlers de IA no ejecutan JavaScript. Datos estructurados inyectados desde un efecto de cliente son datos estructurados que algunos lectores nunca ven.',
      },
      { type: 'heading', text: 'Escribir frases que sobrevivan citadas solas' },
      {
        type: 'list',
        items: [
          'Repetir el nombre de la entidad en vez de abrir una afirmación con un pronombre. Una frase extraída que empieza con "Él" perdió su sujeto.',
          'Decir las fechas de forma absoluta. "Desde julio de 2023" sigue siendo cierto en una caché; "recientemente" queda mal en el momento en que se guarda.',
          'Una afirmación por frase, para que se pueda citar sin arrastrar una segunda.',
          'Abrir cada sección con una definición y no con un gancho, porque la primera frase después de un encabezado es la cadena más extraída de una página.',
          'Darle a cada número una unidad, una fecha y una fuente.',
        ],
      },
      { type: 'heading', text: 'Publicar un mapa para máquinas' },
      {
        type: 'paragraph',
        text: 'Este sitio sirve un archivo llms.txt: un índice en texto plano de qué existe y dónde, generado desde el mismo contenido tipado que renderiza las páginas. Es una convención y no un estándar, y es un seguro barato — un modelo que descarga un archivo obtiene la forma de todo el sitio en vez de inferirla del HTML.',
      },
      {
        type: 'paragraph',
        text: 'La política de robots es la otra mitad. Los agentes de recuperación deciden si un sitio puede ser citado en una respuesta, y los agentes de entrenamiento deciden si entra a un modelo. Este sitio permite ambos, y lo dice de forma explícita en una lista nombrada y comentada en vez de dejar la distinción implícita.',
      },
    ],
  },
}
