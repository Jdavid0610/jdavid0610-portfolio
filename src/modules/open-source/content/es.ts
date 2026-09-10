import type { OpenSourceCopy } from '../domain/types'

export const openSourceEs: OpenSourceCopy = {
  indexTitle: 'Código abierto',
  indexIntro:
    'Julian Ortiz Alviar mantiene cinco plantillas públicas en GitHub bajo el usuario Jdavid0610. No son plantillas de juguete. Cada una codifica los estándares de un sistema que sí se entregó, y Julian Ortiz Alviar las usa él mismo: next-stack es la base de este portafolio, react-native-expo-stack es el stack con el que se entrega HerbaFit, y fastapi-lambda-cdk-template codifica las convenciones del backend de producción de TALENTÜ. Entre las cinco cubren un objetivo de entrega distinto cada una: una app full-stack de Next.js, una app móvil de React Native, un cliente de una página con Vite, un backend serverless en Python y un backend en Node.',
  dogfoodLine:
    'Estás leyendo un sitio construido sobre next-stack. Si quieres saber si la plantilla funciona, estás viendo la respuesta.',
  labels: {
    avatarAlt: 'La foto de perfil que Julian Ortiz Alviar usa en GitHub',
    repository: 'Repositorio',
    demo: 'Demo en vivo',
    language: 'Lenguaje',
    stars: 'Estrellas',
    created: 'Creado',
    lastPush: 'Último push',
    license: 'Licencia',
    noLicense: 'Sin declarar',
    asOf: 'Cifras del repositorio a la fecha',
    includes: 'Qué incluye',
    maintenance: 'Mantenimiento',
    tags: 'Stack',
    relatedProject: 'El mismo stack en producción',
    poweringThisSite: 'Este sitio corre sobre ella',
  },
  templates: {
    'next-stack': {
      tagline: 'Una plantilla de Next.js 16 que además es su propio backend.',
      definition:
        'next-stack es una plantilla open source de Next.js 16 hecha por Julian Ortiz Alviar, renderizada en servidor, con SEO completo, autenticación con control de acceso por roles, internacionalización en inglés y español, y organizada para que cada feature viva en una sola carpeta.',
      metaTitle: 'next-stack — plantilla de Next.js 16',
      metaDescription:
        'next-stack es una plantilla de Next.js 16 con SSR, SEO completo, autenticación con roles e i18n, de Julian Ortiz Alviar. Este portafolio corre sobre ella.',
      description:
        'next-stack es una plantilla open source de Next.js 16 hecha por Julian Ortiz Alviar que además es su propio backend: renderizada en servidor, con SEO completo, autenticación con control de acceso por roles, internacionalización en inglés y español, y organizada para que cada feature viva en una sola carpeta. Este portafolio está construido sobre next-stack.',
      problem:
        'La mayoría de los starters de Next.js te dan enrutamiento y una hoja de estilos, y dejan la autenticación, la internacionalización, el SEO y el acceso a datos para pegarlos después de forma incompatible. next-stack entrega las cuatro cosas ya de acuerdo entre sí, más un modo mock que corre toda la aplicación sin base de datos.',
      includes: [
        'Una sola regla arquitectónica: las dependencias apuntan en una dirección, de routing a features a server, y una ruta nunca contiene lógica de negocio.',
        'Next.js 16 y React 19 sobre TypeScript, con Drizzle ORM sobre PostgreSQL 17 y better-auth para sesiones y control de acceso por roles.',
        'SEO como módulo de primera clase: URLs canónicas y un juego completo de hreflang con x-default generados desde una sola fuente de verdad, más sitemap, robots, imágenes de OpenGraph y JSON-LD.',
        'Contenido tipado como data: las páginas de documentación viven como objetos tipados, sin parser de markdown, así que una traducción faltante es un error de compilación.',
        'Toasts globales sin provider, construidos sobre estado de módulo leído con useSyncExternalStore, con los títulos guardados como llaves de mensaje resueltas al renderizar.',
        'Un modo mock que corre toda la aplicación con datos en memoria, para que quien contribuya vea el producto funcionando antes de tener Docker arriba.',
        'Vitest con Testing Library para pruebas unitarias y Playwright para pruebas end-to-end, ambos ya conectados.',
        'Documentación para dos audiencias: una sección dentro de la app para visitantes, y una guía de estructura y un cookbook para quien contribuye.',
      ],
      narrative: [
        'next-stack es la plantilla de Next.js 16 de Julian Ortiz Alviar, y es la plantilla sobre la que corre este portafolio. Su premisa es que las cuatro cosas que necesita toda aplicación real — renderizado en servidor, SEO completo, autenticación con roles y dos idiomas — deberían estar de acuerdo entre sí desde el primer día, en vez de pegarse después al costo de una reescritura. Una sola regla lo sostiene: las dependencias apuntan en una dirección, de routing a features a server, y una ruta nunca contiene lógica de negocio.',
        'El stack es actual y con opinión: Next.js 16 y React 19 sobre TypeScript, Drizzle ORM sobre PostgreSQL 17, better-auth para sesiones y control de acceso por roles, TanStack Query para estado de servidor, Zod para validación, Tailwind CSS 4 para estilos, y Vitest y Playwright ya conectados. El SEO es un módulo de primera clase y no un apéndice del head: las URLs canónicas y el juego completo de hreflang se generan desde una sola fuente de verdad, y una página que solo existe en un idioma declara solo ese idioma.',
        'Dos detalles muestran el criterio detrás. La documentación es data tipada en vez de markdown, así que una traducción al español que falte rompe el build en vez de entregarle un texto en inglés a un lector hispanohablante — el mismo patrón que usa el contenido de este portafolio. Y toda la aplicación corre sin base de datos en modo mock, lo que significa que quien la clone puede ver el producto funcionando antes de tener Docker arriba.',
      ],
      maintenance:
        'Activa. next-stack se creó el 10 de septiembre de 2026 y su último push es del 10 de septiembre de 2026, y es la base de este sitio.',
      note: 'Este portafolio es un despliegue podado de next-stack: conserva las capas de routing, i18n, SEO, JSON-LD y contenido tipado, y elimina las capas de autenticación y base de datos que no necesita, que es exactamente el borrado de una carpeta por feature para el que está diseñada la arquitectura.',
    },
    'react-native-expo-stack': {
      tagline: 'Un starter de React Native listo para producción, con módulos por dominio.',
      definition:
        'react-native-expo-stack es un starter de React Native listo para producción hecho por Julian Ortiz Alviar, construido con Expo y organizado en módulos por dominio con separación estricta de responsabilidades.',
      metaTitle: 'react-native-expo-stack — starter Expo',
      metaDescription:
        'Starter de React Native y Expo SDK 54 listo para producción, con módulos por dominio, de Julian Ortiz Alviar. TypeScript, Expo Router, Zustand y Zod.',
      description:
        'react-native-expo-stack es un starter de React Native listo para producción hecho por Julian Ortiz Alviar, construido con Expo SDK 54 y React Native 0.81, siguiendo una arquitectura modular por dominio con separación estricta de responsabilidades. Es el repositorio con más estrellas de Julian Ortiz Alviar.',
      problem:
        'Un proyecto de Expo recién creado te da una pantalla. react-native-expo-stack te da las decisiones: dónde termina la navegación y empiezan las features, dónde vive el estado de autenticación, cómo se persiste y cómo se validan los formularios.',
      includes: [
        'Expo SDK 54, React Native 0.81 y React 19 sobre TypeScript 5.9 en modo estricto.',
        'Navegación basada en archivos con Expo Router v6, donde el archivo de una ruta es delgado y renderiza una pantalla en vez de guardar lógica.',
        'Módulos de feature bajo modules/, cada uno dueño de sus propios hooks, esquemas de validación, pantallas, componentes y llamadas de servicio.',
        'Preocupaciones transversales en shared/: un cliente de Axios con interceptores, configuración de ambiente centralizada y un pequeño kit de UI.',
        'TanStack Query v5 para estado de servidor y Zustand v5 para estado de cliente, replicando a propósito las plantillas web.',
        'react-hook-form v7 con Zod v4 para formularios, a través de @hookform/resolvers.',
        'MMKV v4 para almacenamiento sincrónico, con adaptador de persistencia para Zustand y un store de autenticación persistido.',
        'NativeWind v4 para que las clases de Tailwind funcionen en React Native, y Reanimated v4 para animar por fuera del hilo de JavaScript.',
        'Grupos de rutas de sesión iniciada y no iniciada ya separados, con un guard de autenticación en el layout raíz.',
      ],
      narrative: [
        'react-native-expo-stack es el repositorio con más estrellas de Julian Ortiz Alviar, y la contraparte móvil de sus plantillas web. Responde la pregunta que un proyecto nuevo de Expo deja abierta: no "¿cuáles librerías?" sino "¿dónde va cada tipo de código?". Los archivos de navegación contienen navegación y nada más — una ruta es un archivo delgado que renderiza una pantalla — mientras cada feature es dueña de una carpeta con sus propios hooks, esquemas de validación, pantallas, componentes y llamadas a la API.',
        'Las librerías elegidas replican su stack web a propósito, para que quien se mueva entre sus proyectos web y móviles encuentre las mismas ideas: TanStack Query para estado de servidor, Zustand para estado de cliente, react-hook-form con Zod para formularios, y Axios con interceptores para HTTP. Donde lo móvil se diferencia, elige la opción rápida — MMKV para almacenamiento sincrónico con adaptador de persistencia para Zustand, NativeWind para que las clases de Tailwind funcionen en React Native, y Reanimated para animar por fuera del hilo de JavaScript.',
        'Esta plantilla también tiene su contraparte en producción. HerbaFit, la app oficial de fitness de Herbalife para Android en la que trabajó Julian Ortiz Alviar en BTi Group, está construida con React Native y Expo — el mismo stack que codifica este starter. La plantilla no se extrajo de esa app, y no se afirma tal cosa: la versión honesta y verificable es que el stack con el que entrega en producción es el stack del que mantiene un starter público.',
      ],
      maintenance:
        'Activa. react-native-expo-stack se creó el 9 de febrero de 2026 y su último push es del 27 de junio de 2026.',
    },
    'vite-stack': {
      tagline: 'Un cliente de una sola página con React 19 y Vite, para cuando no hace falta servidor.',
      definition:
        'vite-stack es un starter de aplicación de una sola página con React 19 y Vite hecho por Julian Ortiz Alviar, pensado para un cliente con autenticación que consume una API que ya existe.',
      metaTitle: 'vite-stack — starter de React 19 y Vite',
      metaDescription:
        'vite-stack es un starter SPA de React 19 y Vite de Julian Ortiz Alviar, con capa de API por operación, Tailwind CSS 4 y validación con Zod.',
      description:
        'vite-stack es un starter de aplicación de una sola página con React 19 y Vite hecho por Julian Ortiz Alviar. Fija de entrada la estructura de archivos, el patrón de enrutamiento y de guards, la convención de llamadas a la API y el patrón de formularios, para un cliente con autenticación que consume una API existente.',
      problem:
        'Hay trabajos que no necesitan servidor: un cliente con autenticación tipo dashboard que consume una API que ya existe. vite-stack es la plantilla para ese caso, y resuelve la estructura de archivos, el patrón de guards, la convención de llamadas a la API y el patrón de formularios antes de escribir la primera pantalla.',
      includes: [
        'React 19 sobre Vite con Tailwind CSS 4, React Router 7, TanStack Query 5 y Zustand 5.',
        'Una capa de API direccionada por recurso, verbo HTTP y operación — api/auth/post/login/, api/user/get/getUser/ — con los tipos de request y response en un archivo de interfaz hermano.',
        'Un único archivo queryKeys, para que cada llave de caché quede registrada en un solo lugar.',
        'Páginas autocontenidas: la carpeta de una página guarda su propio hook y su propio esquema de Zod.',
        'Una carpeta pages/template/ que queda en el repositorio como lo que uno copia para empezar la siguiente pantalla.',
        'Un guard de ruta privada, un shell de layout con sidebar, y un store de autenticación detrás de una fachada useAuth.',
        'La familia Poppins completa autoalojada, para que la aplicación no le pida fuentes a un tercero.',
        'Alias de rutas, una configuración estricta de ESLint y pnpm, más un CLAUDE.md para que las convenciones queden escritas también para agentes de IA.',
      ],
      narrative: [
        'vite-stack es la plantilla para el trabajo que no necesita servidor: un cliente de una sola página con autenticación que consume una API que ya existe. Corre React 19 sobre Vite con Tailwind CSS 4, React Router 7 para el enrutamiento, TanStack Query para estado de servidor, Zustand para estado de cliente, y react-hook-form con Zod para formularios — las mismas decisiones de las plantillas de Next.js y React Native, así que las tres se sienten como una familia.',
        'Su idea distintiva es la capa de API. En vez de una bolsa de servicios, cada llamada tiene una carpeta direccionada por recurso, verbo HTTP y operación, con sus tipos de request y response en un archivo de interfaz hermano y su llave de caché registrada en un único queryKeys. Las páginas son igual de autocontenidas: la carpeta de una página guarda su propio hook y su propio esquema de Zod, y una carpeta de plantilla queda en el repositorio como lo que uno copia para empezar la siguiente pantalla.',
        'El resto es el trabajo de base poco vistoso: un guard de ruta privada, un shell de layout con sidebar, un store de autenticación detrás de una fachada useAuth, alias de rutas, una configuración estricta de ESLint, pnpm, y la familia Poppins completa autoalojada para que la aplicación no le pida fuentes a un tercero.',
      ],
      maintenance:
        'Activa. vite-stack se creó el 25 de abril de 2025 y su último push es del 23 de julio de 2026. Es la única de las cinco con un fork.',
      note: 'El README de vite-stack sigue siendo el texto por defecto de create-vite y no describe ninguna de las convenciones anteriores. Es la mejora de mayor impacto y menor costo entre los cinco repositorios.',
    },
    'fastapi-lambda-cdk-template': {
      tagline: 'Un backend serverless en Python: FastAPI en AWS Lambda, con la infraestructura en CDK.',
      definition:
        'fastapi-lambda-cdk-template es una plantilla de backend serverless en Python hecha por Julian Ortiz Alviar, construida sobre FastAPI, AWS Lambda, Amazon API Gateway y el AWS CDK, con PostgreSQL, Amazon DynamoDB, Amazon S3, Amazon CloudFront y Amazon SQS.',
      metaTitle: 'fastapi-lambda-cdk-template — Python',
      metaDescription:
        'Plantilla de backend serverless en Python de Julian Ortiz Alviar: FastAPI en AWS Lambda con API Gateway, CDK, PostgreSQL, DynamoDB y SQS.',
      description:
        'fastapi-lambda-cdk-template es una plantilla de backend serverless en Python hecha por Julian Ortiz Alviar. Corre FastAPI en AWS Lambda detrás de Mangum y Amazon API Gateway, define su infraestructura en el AWS CDK, y reparte los datos entre PostgreSQL para lo relacional y Amazon DynamoDB para sesiones y acceso llave-valor.',
      problem:
        'Los backends serverless en Python son casi todo pegamento: empaquetado, capas, authorizers, plomería de parámetros y paridad con el desarrollo local. Esta plantilla entrega ese pegamento ya funcionando, para que un servicio nuevo arranque en la lógica de negocio.',
      includes: [
        'FastAPI detrás de Mangum, corriendo en AWS Lambda.',
        'Un Lambda Authorizer propio que valida un JWT y confirma que la sesión siga existiendo en Amazon DynamoDB.',
        'AWS CDK en Python con stacks separados por preocupación — api, s3, dynamo, sqs — y constructs reutilizables para funciones Lambda y para capas de código compartido y de dependencias.',
        'Configuración leída desde AWS Systems Manager Parameter Store en vez de un archivo versionado, con el contrato de parámetros documentado.',
        'Una capa Lambda compartida con modelos de SQLAlchemy, configuración con Pydantic, utilidades de seguridad y repositorios de DynamoDB, S3 y SQS.',
        'Un patrón repetible por Lambda: app, router, routes, services, repositories, schemas y constants.',
        'Migraciones de Alembic preconfiguradas contra los modelos compartidos.',
        'Desarrollo local unificado: un solo punto de entrada levanta todas las lambdas juntas en el puerto 8003 desde un único archivo de configuración, con documentación Swagger.',
        'CI/CD con GitHub Actions usando OIDC, así que el repositorio no guarda ningún secreto de AWS.',
        'Una colección de Bruno para local y producción, una configuración de depuración de VS Code, y una lista de renombrado documentada.',
      ],
      narrative: [
        'fastapi-lambda-cdk-template es la mitad en Python del conjunto de plantillas de Julian Ortiz Alviar, y la que muestra más directamente la parte de DevOps de su título. Es un starter de backend serverless: FastAPI corriendo en AWS Lambda detrás de Mangum y Amazon API Gateway, con la infraestructura definida en el AWS CDK, y los datos repartidos entre PostgreSQL para lo relacional y Amazon DynamoDB para sesiones y acceso llave-valor.',
        'Lo que la vuelve una plantilla y no una demo son las partes operativas. La infraestructura está partida en stacks de CDK separados para API, S3, DynamoDB y SQS, con constructs reutilizables para funciones Lambda y para las capas de código compartido y de dependencias, y cada valor de ambiente viene de AWS Systems Manager Parameter Store y no de un archivo versionado. La autorización es un Lambda Authorizer propio que valida el JWT y confirma que la sesión siga existiendo en DynamoDB. El despliegue corre por GitHub Actions con OIDC, así que el repositorio no guarda ningún secreto de AWS — el primer paso documentado del despliegue es poblar Parameter Store, no pegar llaves.',
        'El desarrollo local se trata como un requisito real: un solo punto de entrada levanta todas las lambdas juntas en el puerto 8003 desde un único archivo de configuración, con documentación Swagger y una colección de Bruno para local y producción, más una configuración de depuración de VS Code y migraciones de Alembic conectadas a los modelos compartidos. También trae una lista de renombrado, para que los primeros diez minutos de un servicio nuevo sean una copia y seis ediciones.',
        'Esta plantilla tiene un linaje de producción. Su README dice que está basada en los estándares de TalentosBackend, y TalentosBackend es el backend de producción de TALENTÜ — la plataforma de scouting de fútbol que Julian Ortiz Alviar cofundó técnicamente y cuyo backend diseñó. La plantilla es entonces las convenciones de un sistema en operación publicadas como punto de partida, y no una demo escrita para publicarse.',
      ],
      maintenance:
        'Nueva. fastapi-lambda-cdk-template se creó el 11 de mayo de 2026 y su último push es del 11 de mayo de 2026, en un solo push.',
      note: 'El README dice que la plantilla está basada en los estándares de TalentosBackend, que es el backend de producción de TALENTÜ — la plataforma de scouting de fútbol que Julian Ortiz Alviar cofundó técnicamente y cuyo backend diseñó. Los hechos de stack verificados arriba describen esta plantilla, leídos de su propio README y su manifiesto; la implementación interna del backend de producción nunca se consultó, así que la relación documentada es que la plantilla codifica las convenciones de ese backend.',
    },
    'express-hexagonal': {
      tagline: 'Un backend REST en Express y TypeScript construido con puertos y adaptadores.',
      definition:
        'express-hexagonal es una aplicación de backend hecha por Julian Ortiz Alviar con Express y TypeScript, siguiendo los principios de la arquitectura hexagonal.',
      metaTitle: 'express-hexagonal — backend en Express',
      metaDescription:
        'express-hexagonal es un backend REST en Express y TypeScript de Julian Ortiz Alviar, con arquitectura hexagonal, Sequelize y Docker.',
      description:
        'express-hexagonal es una aplicación de backend hecha por Julian Ortiz Alviar con Express y TypeScript, siguiendo los principios de la arquitectura hexagonal. Su capa de dominio define contratos y su capa de infraestructura los satisface, de modo que cambiar el motor de persistencia no toca la lógica de negocio.',
      problem:
        'express-hexagonal es la contraparte en Node de la plantilla de FastAPI: un servicio REST convencional donde la capa de dominio no sabe que está hablando con Sequelize. Es la más explícita de las cinco en términos arquitectónicos.',
      includes: [
        'Express y TypeScript, estructurados como puertos y adaptadores.',
        'Contratos de dominio bajo context/shared/domain/contracts/: un repositorio base, uno con forma de Sequelize, un puerto de encapsulación, y contratos de DTO y de fábrica de DTO.',
        'Adaptadores de infraestructura que implementan esos contratos, en una carpeta hermana.',
        'Servicios de dominio responsables del mapeo de DTOs y de la encapsulación.',
        'Una excepción tipada PropertyNotFound que vive en el dominio en vez de lanzarse como string.',
        'Dos cortes de feature de ejemplo, usuarios e inmuebles, que muestran cómo se ve una feature real sobre el esqueleto.',
        'Swagger UI conectado para que la API se documente sola.',
        'Un Dockerfile y un docker-compose, con el README documentando tanto el camino de contenedor como el ciclo local de desarrollo.',
      ],
      narrative: [
        'express-hexagonal es la más antigua de las plantillas públicas de Julian Ortiz Alviar — creada en julio de 2024, con su último push en diciembre de 2024 — y la más explícita en términos arquitectónicos. Es un backend REST en Express y TypeScript construido con el patrón de puertos y adaptadores, donde la capa de dominio define contratos y la de infraestructura los satisface, de modo que cambiar el motor de persistencia no entra a tocar la lógica de negocio.',
        'La idea completa se ve en los nombres de las carpetas. La carpeta de contratos de dominio guarda los puertos — un repositorio base, uno con forma de Sequelize, un puerto de encapsulación, y contratos de DTO y de fábrica de DTO — mientras la carpeta de infraestructura guarda los adaptadores que los implementan, y los servicios del dominio se encargan del mapeo de DTOs y de la encapsulación. Una excepción tipada PropertyNotFound vive en el dominio en vez de lanzarse como string. Dos cortes de ejemplo, usuarios e inmuebles, muestran cómo se ve una feature real sobre ese esqueleto, y Swagger UI queda conectado para que la API se documente sola.',
        'También trae la historia del despliegue: un Dockerfile y un docker-compose, con el README documentando tanto el camino de contenedor como el ciclo local de desarrollo. Su estado honesto es mantenida pero rezagada — apunta a Express 4 y fija el driver de Postgres de Sequelize en un alpha de la 7.0, y no recibe un push desde diciembre de 2024, lo que la vuelve la candidata más clara a una actualización entre las cinco.',
      ],
      maintenance:
        'Mantenida pero rezagada. express-hexagonal se creó el 12 de julio de 2024 y su último push es del 1 de diciembre de 2024, lo que la vuelve la más antigua de las cinco y la candidata más clara a una actualización de dependencias.',
    },
  },
}
