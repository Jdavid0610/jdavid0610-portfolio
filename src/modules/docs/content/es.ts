import type { DocsContent } from '../domain/types'

export const docsEs: DocsContent = {
  title: 'Documentación',
  intro:
    'Qué es este despliegue, cómo se comporta y cómo está construido. Todo lo que se describe aquí está funcionando en este sitio ahora mismo: puedes probarlo.',
  pages: [
    {
      slug: 'overview',
      title: 'Qué es esto',
      summary: 'Una plantilla de Next.js que además es su propio backend.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Es un punto de partida para aplicaciones que necesitan aparecer en buscadores y saber quiénes son sus usuarios: un sitio público y un producto detrás de un inicio de sesión, en un solo repositorio y con las mismas convenciones.',
        },
        {
          type: 'paragraph',
          text: 'No hay un servicio de API aparte. El acceso a datos, las reglas de negocio y la autorización viven junto a las páginas que los usan, y el navegador habla con el servidor mediante Server Actions y unos pocos route handlers.',
        },
        { type: 'heading', text: 'Qué incluye' },
        {
          type: 'checklist',
          items: [
            {
              label: 'Renderizado en servidor',
              detail: 'Las páginas públicas son HTML primero: rastreables y rápidas con la caché fría.',
            },
            {
              label: 'SEO completo',
              detail:
                'URLs canónicas, hreflang, sitemap, robots, imágenes para redes y JSON-LD, generados desde una sola fuente.',
            },
            {
              label: 'Autenticación',
              detail: 'Correo y contraseña, sesiones, OAuth opcional y control de acceso por rol.',
            },
            {
              label: 'Dos idiomas',
              detail: 'Inglés y español, en la URL, tanto en la interfaz como en el contenido.',
            },
            {
              label: 'Una función de referencia',
              detail: 'Publicaciones: crear, editar, publicar, eliminar, buscar y paginar.',
            },
            {
              label: 'Un backend simulado',
              detail: 'La aplicación completa funciona con datos en memoria, sin base de datos.',
            },
          ],
        },
        { type: 'heading', text: 'Pruébalo' },
        {
          type: 'paragraph',
          text: 'Existen dos cuentas en este despliegue. Con el backend simulado sirve cualquier contraseña; si no, usa la que aparece aquí.',
        },
        {
          type: 'table',
          head: ['Correo', 'Contraseña', 'Rol'],
          rows: [
            ['admin@example.com', 'password123', 'administrador'],
            ['user@example.com', 'password123', 'usuario'],
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          text: 'Esto es una demostración. No pongas nada real aquí, y cambia estas credenciales antes de usar la plantilla para algo serio.',
        },
        { type: 'heading', text: 'Estado en vivo' },
        {
          type: 'paragraph',
          text: 'Lo que está haciendo este despliegue en el momento en que lees esto:',
        },
        { type: 'runtime' },
      ],
    },
    {
      slug: 'behavior',
      title: 'Cómo se comporta',
      summary: 'Rutas, redirecciones y qué páginas se cachean.',
      blocks: [
        { type: 'heading', text: 'Cada URL lleva un idioma' },
        {
          type: 'paragraph',
          text: 'Entrar a la raíz del sitio te lleva a un idioma que puedes leer. La elección viene de una cookie si ya elegiste antes; si no, de la cabecera Accept-Language de tu navegador; si no, inglés.',
        },
        {
          type: 'code',
          caption: 'Pruébalo en la barra de direcciones',
          code: '/            → redirige a /en o /es\n/en/blog     → el blog en inglés\n/es/blog     → la misma página en español\n/es/dashboard → redirige al inicio de sesión si no has entrado',
        },
        {
          type: 'paragraph',
          text: 'Cambiar de idioma con el control de la cabecera te deja en la misma página que estabas leyendo, y recuerda tu elección.',
        },
        { type: 'heading', text: 'Con sesión y sin sesión' },
        {
          type: 'paragraph',
          text: 'Pedir una página privada sin haber entrado te lleva al inicio de sesión con un retorno, y al entrar aterrizas donde ibas. Pedir el inicio de sesión cuando ya entraste te lleva al panel.',
        },
        {
          type: 'table',
          head: ['Área', 'Quién la ve', 'Indexada'],
          rows: [
            ['Inicio, blog, documentación', 'Cualquiera', 'Sí'],
            ['Iniciar sesión, crear cuenta', 'Visitantes sin sesión', 'No'],
            ['Panel, publicaciones, ajustes', 'Usuarios con sesión', 'No'],
            ['Administración', 'Solo administradores', 'No'],
          ],
        },
        {
          type: 'note',
          tone: 'info',
          text: 'Quien no es administrador y abre la página de administración recibe una explicación clara, no una pantalla de error. Ocultar el enlace no es lo que protege los datos: lo hace la comprobación junto a los datos.',
        },
        { type: 'heading', text: 'Qué se cachea y qué no' },
        {
          type: 'paragraph',
          text: 'Las páginas públicas se generan por adelantado y se refrescan como mucho cada hora, así que son rápidas y baratas de servir. Publicar una entrada refresca de inmediato las páginas afectadas, sin esperar la hora.',
        },
        {
          type: 'table',
          head: ['Página', 'Renderizado'],
          rows: [
            ['Inicio, blog, documentación', 'Pregenerada por idioma, revalidada cada hora'],
            ['Entrada del blog', 'Pregenerada; las nuevas se generan al pedirlas y se cachean'],
            ['Panel, publicaciones, ajustes, administración', 'Generada en cada petición'],
            ['Sitemap, robots, imágenes sociales', 'Generados'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Como las páginas públicas nunca leen tu sesión, la zona de cuenta de la cabecera aparece un instante después de la página. Ese es el intercambio: una página que se puede cachear para todos no puede además personalizarse en el servidor.',
        },
      ],
    },
    {
      slug: 'content',
      title: 'Contenido e idiomas',
      summary: 'Cómo encajan las publicaciones, las traducciones y la visibilidad en buscadores.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Traducir la interfaz es la mitad fácil. La difícil es el contenido, y esta plantilla asume que una publicación está escrita en un idioma en lugar de fingir que una misma fila sirve para los dos.',
        },
        { type: 'heading', text: 'Cómo funciona una traducción' },
        {
          type: 'list',
          items: [
            'Cada publicación pertenece exactamente a un idioma.',
            'Las traducciones de una misma publicación comparten el slug, y eso es lo que las empareja.',
            'El blog solo muestra las publicaciones escritas en el idioma que estás leyendo.',
            'Una publicación que solo existe en inglés responde «no encontrada» en una URL en español, en lugar de mostrar texto en inglés bajo una dirección en español.',
          ],
        },
        {
          type: 'note',
          tone: 'info',
          text: 'A los buscadores se les anuncia una traducción solo cuando existe de verdad. Anunciar una traducción que responde «no encontrada» es peor que no decir nada.',
        },
        { type: 'heading', text: 'Qué reciben los buscadores' },
        {
          type: 'list',
          items: [
            'Una dirección canónica por página y por idioma.',
            'Enlaces hreflang entre los idiomas en los que la página existe de verdad, más un idioma por defecto.',
            'Un sitemap con cada página pública en cada idioma que tiene.',
            'Datos estructurados que describen el sitio, cada artículo y sus migas de pan.',
            'Una imagen de vista previa generada por idioma.',
            'Las páginas privadas excluidas de la indexación, en la propia página y en robots.',
          ],
        },
        {
          type: 'code',
          caption: 'Visible en el código fuente de cualquier entrada',
          code: '<link rel="canonical"  href="…/es/blog/…" />\n<link rel="alternate" hreflang="en-US" href="…/en/blog/…" />\n<link rel="alternate" hreflang="es-CO" href="…/es/blog/…" />\n<script type="application/ld+json">{ "@type": "Article", … }</script>',
        },
      ],
    },
    {
      slug: 'architecture',
      title: 'Cómo está construido',
      summary: 'Cuatro carpetas y una regla sobre hacia dónde apuntan.',
      blocks: [
        {
          type: 'paragraph',
          text: 'El código está organizado para que cada función sea una carpeta que podrías borrar, y para que cambiar una URL nunca implique tocar la lógica de negocio.',
        },
        {
          type: 'layers',
          caption: 'Las dependencias apuntan en un solo sentido',
          layers: [
            { folder: 'app/', label: 'Solo rutas: direcciones, metadatos de página, layouts.' },
            {
              folder: 'modules/',
              label: 'Una carpeta por función: sus reglas, su acceso a datos, sus pantallas.',
            },
            { folder: 'server/', label: 'Base de datos, sesiones, configuración.' },
          ],
          shared: {
            folder: 'shared/',
            label: 'Sistema de diseño, idiomas, ayudas de SEO.',
            note: 'Disponible para todas las capas de arriba, y no conoce ninguna de ellas.',
          },
          rule: 'Cada capa puede usar las de abajo, nunca las de arriba. Eso es lo que permite borrar una función como una sola carpeta, y por eso cambiar una URL nunca implica tocar la lógica de negocio.',
        },
        {
          type: 'table',
          head: ['Carpeta', 'Contiene', 'Nunca contiene'],
          rows: [
            ['app/', 'rutas, metadatos de página, layouts', 'lógica de negocio ni consultas'],
            ['modules/', 'una función: reglas, datos, hooks, interfaz', 'infraestructura'],
            ['server/', 'base de datos, sesiones, configuración', 'nada propio de una función'],
            ['shared/', 'botones, campos, traducciones, ayudas de SEO', 'nada propio de una función'],
          ],
        },
        { type: 'heading', text: 'La lógica y la apariencia son archivos distintos' },
        {
          type: 'paragraph',
          text: 'Cada pieza interactiva se divide en tres: la página consulta en el servidor, un hook guarda el comportamiento y un componente lo dibuja. El componente no decide nada, y por eso se puede rediseñar sin miedo.',
        },
        {
          type: 'code',
          caption: 'La forma de cada función',
          code: 'page.tsx        consulta en el servidor y pasa valores simples\n  ui/x-form.tsx   solo marcado: entran props, salen elementos\n    hooks/use-x-form.ts   estado, envío, errores de validación',
        },
        { type: 'heading', text: 'Qué pasa cuando envías un formulario' },
        {
          type: 'code',
          code: 'el formulario se envía a un Server Action\n  → las mismas reglas de validación del navegador se repiten en el servidor\n  → se comprueba la sesión\n  → las reglas de negocio y la propiedad se comprueban junto a los datos\n  → se refrescan las páginas afectadas\n  → los errores vuelven pegados al campo que los causó',
        },
        {
          type: 'note',
          tone: 'info',
          text: 'Los formularios funcionan sin JavaScript, porque se envían al servidor como siempre se han enviado. JavaScript los hace más agradables, no funcionales.',
        },
      ],
    },
    {
      slug: 'security',
      title: 'Cuentas y accesos',
      summary: 'Dónde ocurren las comprobaciones reales y dónde solo lo parecen.',
      blocks: [
        {
          type: 'paragraph',
          text: 'El acceso se controla en tres lugares, y solo uno de ellos es seguridad de verdad. Ser explícito sobre cuál es cuál es justamente el punto.',
        },
        {
          type: 'table',
          head: ['Capa', 'Qué hace', '¿Es seguridad?'],
          rows: [
            [
              'Proxy de la petición',
              'Ve una cookie de sesión y redirige, para que no veas parpadear una página privada',
              'No: una cookie solo demuestra que hay una cookie',
            ],
            [
              'Guardia de la página',
              'Verifica la sesión una vez por petición antes de renderizar el área privada',
              'Sí',
            ],
            [
              'Junto a los datos',
              'Vuelve a comprobar la sesión y de quién es la fila, en cada lectura y escritura',
              'Sí, y es la que importa',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'La tercera capa existe porque un guardia de página no protege el envío de un formulario, y un botón oculto no protege una fila de la base de datos. Editar la publicación de otra persona lo rechaza el servicio aunque llegues a la URL directamente.',
        },
        { type: 'heading', text: 'Roles' },
        {
          type: 'list',
          items: [
            'Todo el mundo se registra como usuario normal.',
            'El rol lo asigna el servidor y no se puede elegir al registrarse.',
            'Los administradores ven la lista de cuentas y pueden editar cualquier publicación.',
          ],
        },
        {
          type: 'note',
          tone: 'warn',
          text: 'La verificación de correo y el restablecimiento de contraseña están desactivados a propósito, para que la plantilla funcione sin configurar un proveedor de correo. Actívalos antes de que lleguen usuarios reales.',
        },
      ],
    },
    {
      slug: 'running-it',
      title: 'Ejecutarlo tú',
      summary: 'Dos comandos con base de datos, uno sin ella.',
      blocks: [
        { type: 'heading', text: 'Sin base de datos' },
        {
          type: 'paragraph',
          text: 'La aplicación completa puede funcionar con datos en memoria. Nada que instalar ni configurar: útil para un primer vistazo, para trabajo de diseño y para las pruebas.',
        },
        { type: 'code', code: 'pnpm install\npnpm dev:mock' },
        {
          type: 'paragraph',
          text: 'Entra con cualquier contraseña. Crear, editar y eliminar funcionan; los datos vuelven al inicio cuando reinicias el servidor.',
        },
        { type: 'heading', text: 'Con base de datos' },
        {
          type: 'code',
          code: 'cp .env.example .env\npnpm db:up        # PostgreSQL en Docker\npnpm db:migrate\npnpm db:seed\npnpm dev',
        },
        { type: 'heading', text: 'Ver los estados difíciles de atrapar' },
        {
          type: 'paragraph',
          text: 'Los estados de carga y de error suelen ser invisibles en una máquina local rápida, así que se pueden encender a propósito:',
        },
        {
          type: 'code',
          code: 'MOCK_LATENCY_MS=600 pnpm dev:mock     # todos los indicadores de carga, visibles\nMOCK_FAIL=posts.create pnpm dev:mock  # todas las rutas de error, a demanda',
        },
        {
          type: 'note',
          tone: 'warn',
          text: 'Una compilación de producción se niega a arrancar con el backend simulado activo salvo que se permita explícitamente, para que una demo no llegue en silencio a usuarios reales.',
        },
        { type: 'heading', text: 'Comprobar un despliegue' },
        {
          type: 'list',
          items: [
            '/api/health indica si la base de datos responde, o si está simulada.',
            '/sitemap.xml lista cada página pública en cada idioma.',
            '/robots.txt mantiene a los rastreadores fuera de las áreas privadas.',
          ],
        },
      ],
    },
  ],
}
