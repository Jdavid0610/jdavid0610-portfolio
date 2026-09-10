import type { ProjectsCopy } from '../domain/types'

export const projectsEs: ProjectsCopy = {
  indexTitle: 'Proyectos',
  indexIntro:
    'Estos son los productos que ha construido Julian Ortiz Alviar. Cuatro son emprendimientos que cofundó, dos los construyó dentro de un empleo, y uno fue trabajo freelance para un cliente. Cada entrada dice en qué calidad participó antes de describir el producto.',
  bucketLabels: {
    venture: 'Emprendimiento propio',
    employment: 'Empleo',
    freelance: 'Trabajo freelance para cliente',
  },
  statusLabels: {
    live: 'En operación',
    'live-early': 'En operación, temprano',
    'store-listed': 'En Google Play',
  },
  linkLabels: {
    live: 'Sitio en vivo',
    store: 'Ficha de la tienda',
    api: 'Origen de la API',
  },
  sectionLabels: {
    problem: 'El problema que resuelve',
    contribution: 'Qué construyó Julian Ortiz Alviar',
    features: 'Superficie del producto verificada',
    stack: 'Tecnología',
    facts: 'Datos',
    role: 'Rol',
    relatedRole: 'Rol relacionado',
  },
  projects: {
    phenoscience: {
      tagline:
        'Plataforma de salud mental que combina consejería a demanda con contenido de bienestar autoguiado.',
      role: 'Cofundador. Lidera el equipo de frontend y responde por el DevOps y la estabilidad de la plataforma.',
      definition:
        'PhenoScience es una empresa colombiana de salud mental cuya plataforma combina consejería a demanda con contenido de bienestar autoguiado.',
      metaTitle: 'PhenoScience — plataforma de salud mental',
      metaDescription:
        'PhenoScience combina consejería a demanda con contenido de bienestar autoguiado. Julian Ortiz Alviar la cofundó en julio de 2023 y lidera su frontend.',
      description:
        'PhenoScience es una empresa colombiana de salud mental cuya plataforma ofrece sesiones de consejería con especialistas en salud mental, agendamiento de citas con psicólogos, y contenido de bienestar en serie con recordatorios diarios, todo dentro de una suscripción. Julian Ortiz Alviar cofundó PhenoScience en julio de 2023.',
      problem:
        'Un psicólogo no puede estar disponible a las 2 de la mañana, y no puede acompañar a un paciente de forma continua entre sesiones. PhenoScience cierra ese vacío. La plataforma ofrece sesiones de consejería con especialistas en salud mental y agendamiento de citas con psicólogos, y llena las horas intermedias con recordatorios de bienestar diarios y contenido en serie, todo detrás de una suscripción.',
      contribution:
        'Julian Ortiz Alviar cofundó PhenoScience, definió sus estándares de frontend y lidera su equipo de frontend. Julian Ortiz Alviar implementó las capacidades basadas en modelos de lenguaje que cubren los vacíos donde un psicólogo no puede dar soporte inmediato o continuo. Introdujo Spec-Driven Development en el equipo diseñando "skills" modulares y asignándolas a agentes. También responde por el CI/CD, la infraestructura provisionada con Terraform y los despliegues entre ambientes.',
      features: [
        'Sesiones de consejería con especialistas en salud mental',
        'Agendamiento de citas con psicólogos',
        'Un botón a demanda que conecta al usuario con un consejero',
        'Contenido en serie sobre bienestar y salud mental',
        'Recordatorios y consejos de bienestar diarios',
        'Control de acceso por suscripción en los recursos protegidos',
        'Onboarding con segmentación de audiencia y un recorrido guiado del producto',
        'Gestión de la cuenta y del plan de suscripción',
      ],
      narrative: [
        'PhenoScience es la empresa de salud mental que Julian Ortiz Alviar cofundó en julio de 2023. Su plataforma le da a las personas dos cosas que un consultorio por sí solo no puede: un consejero disponible cuando se necesita, y algo útil que hacer con el tiempo entre citas. Los usuarios agendan sesiones con psicólogos, tocan un botón para que los conecten con un consejero cuando necesitan hablar, y mientras tanto avanzan en contenido de bienestar en serie y recordatorios diarios.',
        'En PhenoScience, Julian Ortiz Alviar responde por todo el camino de entrega. Lidera el equipo de frontend y definió los estándares que permiten que el producto crezca sin reescribirse. La aplicación en producción es una SPA de React y TypeScript construida con Vite, con estado de cliente en Zustand y una API propia en api.phenoscience.com.co. También implementó las capacidades basadas en modelos de lenguaje que responden al usuario cuando un clínico humano no puede, e introdujo Spec-Driven Development expresando el comportamiento del sistema como skills modulares asignadas a agentes.',
        'La infraestructura también es suya: pipelines de CI/CD, ambientes provisionados con Terraform y despliegues repetibles, con los documentos legales y las plantillas de correo servidos desde Amazon S3 y la entrega detrás de un CDN. PhenoScience es además la empresa detrás de ClinPsia, el producto para clínicos, lo que convierte a la compañía en una apuesta de dos lados sobre el mismo problema: acompañar al paciente y acompañar al psicólogo que lo atiende.',
      ],
      facts: [
        { label: 'Fundada', value: 'Julio de 2023' },
        { label: 'Empresa', value: 'PhenoScience, Cali, Colombia' },
        { label: 'Producto hermano', value: 'ClinPsia' },
      ],
      organizationDescription:
        'PhenoScience es una empresa colombiana de salud mental cuya plataforma combina consejería a demanda con contenido de bienestar autoguiado. PhenoScience es la empresa detrás de ClinPsia.',
    },
    clinpsia: {
      tagline:
        'La plataforma clínica todo-en-uno para psicólogos clínicos: pacientes, videoconsultas, historias y trazabilidad en un solo lugar.',
      role: 'Cofundador de PhenoScience, la empresa que construye ClinPsia. Líder de frontend e integración de LLM.',
      definition:
        'ClinPsia es la plataforma clínica todo-en-uno para psicólogos clínicos, y es un producto de PhenoScience.',
      metaTitle: 'ClinPsia — plataforma clínica para psicólogos',
      metaDescription:
        'ClinPsia es la plataforma todo-en-uno para psicólogos clínicos y un producto de PhenoScience: historias, videoconsultas y trazabilidad clínica.',
      description:
        'ClinPsia es la plataforma clínica todo-en-uno para psicólogos clínicos. ClinPsia centraliza las historias clínicas, las consultas presenciales y por videollamada, los consentimientos informados firmados digitalmente, las evaluaciones estructuradas con indicadores de riesgo calculados automáticamente, y el registro cronológico de cada cambio en el expediente del paciente. ClinPsia es un producto de PhenoScience.',
      problem:
        'ClinPsia existe por un desperdicio muy concreto, dicho en las palabras del propio producto: los psicólogos dedicaban horas a gestionar papeles, agendas y plataformas dispersas, horas que le pertenecían a sus pacientes. ClinPsia consolida la práctica completa en un solo lugar para que ese tiempo vuelva al trabajo clínico.',
      contribution:
        'ClinPsia la construye PhenoScience, la empresa que Julian Ortiz Alviar cofundó, y el equipo de frontend que él lidera. Sus contribuciones propias son los estándares de frontend sobre los que está hecho el producto, el liderazgo del equipo, las capacidades basadas en modelos de lenguaje, el método de Spec-Driven Development con skills de agentes, y el pipeline de entrega con CI/CD y Terraform. Aquí no se reclama la autoría individual de ninguna funcionalidad específica de ClinPsia.',
      features: [
        'Gestión de pacientes',
        'Historias clínicas centralizadas y seguras: historial completo, documentos, consentimientos y seguimiento en un solo perfil por paciente',
        'Consultas presenciales y videollamadas desde la misma agenda',
        'Consentimientos informados firmados digitalmente, generados, enviados y almacenados',
        'Evaluación estructurada del paciente con indicadores de riesgo calculados automáticamente',
        'Trazabilidad clínica: registro cronológico de cada acción, sesión y cambio en el expediente',
        'Cursos y episodios para compartir conocimiento',
        'Facturación y pagos',
        'Una mesa de PQRS colombiana con número de radicado y opción de radicar de forma anónima, construida según los plazos de la Ley 1755 de 2015',
        'Cumplimiento de protección de datos colombiana bajo la Ley 1581 de 2012, y tipos de documento de identidad colombianos',
      ],
      narrative: [
        'ClinPsia es un producto de PhenoScience, la empresa que Julian Ortiz Alviar cofundó en julio de 2023, y está dirigido al otro lado del consultorio. Mientras la plataforma de PhenoScience atiende a la persona que busca ayuda, ClinPsia atiende al psicólogo clínico que la trata.',
        'La plataforma consolida la práctica completa. Un solo perfil por paciente reúne la historia clínica completa, documentos, consentimientos y seguimiento. Las consultas se atienden presenciales o por videollamada desde la misma agenda. Los consentimientos informados se generan, se firman digitalmente y se almacenan, sin papel. Las evaluaciones son estructuradas, con indicadores de riesgo calculados automáticamente y no a ojo. Cada acción, sesión y cambio en el expediente queda registrado cronológicamente — la trazabilidad que hace defendible una historia clínica. Alrededor están la facturación, un panel para el clínico, una biblioteca de cursos y episodios, y una mesa de PQRS colombiana con número de radicado y opción anónima.',
        'ClinPsia la construye el equipo de frontend que lidera Julian Ortiz Alviar, sobre los estándares que él definió: una aplicación en React y TypeScript con validación schema-first en Zod, formularios con react-hook-form y su propia API en api.clinpsia.com. El cumplimiento normativo es una restricción de primera clase y no una nota al pie — los tipos de documento colombianos, la autorización de tratamiento de datos de la Ley 1581 de 2012 y la privacidad por diseño están en la interfaz que se entrega, no solo en la página de políticas.',
      ],
      facts: [
        { label: 'Empresa matriz', value: 'PhenoScience' },
        { label: 'Prueba gratuita', value: '15 días, sin tarjeta de crédito' },
        { label: 'Cumplimiento', value: 'Ley 1581 de 2012, Ley 1755 de 2015' },
      ],
      organizationDescription:
        'ClinPsia es la plataforma clínica todo-en-uno para psicólogos clínicos, y es un producto de PhenoScience.',
      relatedOrganizationDescription:
        'PhenoScience es una empresa colombiana de salud mental cuya plataforma combina consejería a demanda con contenido de bienestar autoguiado. PhenoScience es la empresa detrás de ClinPsia.',
    },
    talentu: {
      tagline:
        'Plataforma de scouting de fútbol: el jugador sube video, recibe retroalimentación de analistas reales y llega a ojeadores verificados en cualquier parte.',
      role: 'Cofundador técnico de TALENTÜ, la plataforma fundada por el profesional en ciencias del deporte Julián González.',
      definition:
        'TALENTÜ es una plataforma de scouting de fútbol donde los jugadores suben video de partido, reciben retroalimentación técnica de analistas reales y son descubiertos por ojeadores verificados.',
      metaTitle: 'TALENTÜ — plataforma de scouting de fútbol',
      metaDescription:
        'En TALENTÜ el jugador sube video, recibe análisis y llega a ojeadores verificados. Julian Ortiz Alviar es cofundador técnico de la plataforma.',
      description:
        'TALENTÜ es una plataforma de scouting de fútbol donde los jugadores suben video de partido, reciben retroalimentación técnica detallada de entrenadores y analistas reales, y son descubiertos por ojeadores y representantes de academias verificados. TALENTÜ opera en Latinoamérica, España y África subsahariana.',
      problem:
        'TALENTÜ existe para responder una sola pregunta: ¿cómo hace un futbolista del Chocó o de La Guajira para que lo vean los mismos ojos que ven a uno de Madrid o São Paulo? La plataforma vuelve portable la evidencia, para que un jugador en cualquier parte sea evaluado en video por analistas reales y luego encontrado por ojeadores que pasaron antes por un proceso de verificación.',
      contribution:
        'Julian Ortiz Alviar es cofundador técnico de TALENTÜ y diseñó la arquitectura de su backend de producción, TalentosBackend. Los estándares de ingeniería de ese backend están publicados: fastapi-lambda-cdk-template, una de sus cinco plantillas open source, dice en su README que está basada en los estándares de TalentosBackend. TALENTÜ fue fundada por el profesional en ciencias del deporte Julián González, que es el fundador acreditado en el sitio de la plataforma, y el sitio público no detalla las contribuciones de ingeniería, así que aquí no se reclama autoría de ninguna funcionalidad puntual.',
      features: [
        'Video subido y revisado por entrenadores y analistas reales, que devuelven retroalimentación técnica detallada',
        'Un perfil profesional generado con estadísticas, fortalezas y áreas de mejora',
        'IA usada para escalar la capa de análisis, que la plataforma plantea como democratizar el análisis profesional',
        'Ojeadores y representantes de academias verificados antes de poder ver el perfil de cualquier jugador',
        'Notificaciones cuando un ojeador ve el perfil de un jugador',
        'Un modelo freemium: el registro y el perfil básico son gratuitos, los planes premium agregan análisis y visibilidad',
        'Disponible en Latinoamérica, España y África subsahariana',
        'Aplicación web más apps de Android e iOS',
      ],
      narrative: [
        'TALENTÜ existe para responder una sola pregunta: ¿cómo hace un futbolista del Chocó o de La Guajira para que lo vean los mismos ojos que ven a uno de Madrid o São Paulo? La respuesta de la plataforma es volver portable la evidencia. El jugador sube video de partido, entrenadores y analistas reales lo revisan y le devuelven retroalimentación técnica detallada, la plataforma arma con eso un perfil profesional con estadísticas, fortalezas y áreas de mejora, y ojeadores y representantes de academias verificados consultan esos perfiles desde cualquier parte.',
        'TALENTÜ es un producto freemium: el registro y el perfil básico son gratuitos, y los planes premium agregan más análisis y más visibilidad ante los ojeadores. TALENTÜ opera en Latinoamérica, España y África subsahariana, se entrega como web más apps de Android e iOS, y acepta jugadores desde los trece años con consentimiento de un acudiente. Julian Ortiz Alviar es cofundador técnico; la plataforma fue fundada por el profesional en ciencias del deporte Julián González, que es el fundador acreditado en el sitio.',
        'El backend es donde su contribución propia es concreta. Julian Ortiz Alviar diseñó la arquitectura de TalentosBackend, el backend de producción de TALENTÜ, y sus convenciones hoy son públicas: su plantilla fastapi-lambda-cdk-template dice en el README que está basada en los estándares de TalentosBackend. Eso convierte a TALENTÜ en el segundo de tres casos donde un sistema que él entregó terminó siendo una plantilla que publica y mantiene — los otros son HerbaFit sobre react-native-expo-stack, y este portafolio sobre next-stack.',
        'Dos detalles vale la pena conocer para quien vaya a enlazar TALENTÜ. El dominio de la marca tiene un carácter no ASCII — talentü.com — que se resuelve como xn--talent-8ya.com en punycode, y esa forma en punycode es la que va en cualquier campo legible por máquinas. El dominio talentu.com sin diéresis es un dominio distinto y sin relación, parqueado. El sitio se sirve como build estático desde Amazon S3 detrás de Amazon CloudFront.',
      ],
      facts: [
        { label: 'Fundador', value: 'Julián González, profesional en ciencias del deporte' },
        { label: 'Backend', value: 'TalentosBackend, con arquitectura de Julian Ortiz Alviar' },
        { label: 'Dominio', value: 'talentü.com, en punycode xn--talent-8ya.com' },
        { label: 'Disponible en', value: 'Latinoamérica, España, África subsahariana' },
      ],
      note: 'El sitio de TALENTÜ acredita como fundador al profesional en ciencias del deporte Julián González. Julian Ortiz Alviar es cofundador técnico, y por eso esta página reclama un rol de cofundador técnico y los datos estructurados no reclaman ninguna relación de fundador.',
      organizationDescription:
        'TALENTÜ es una plataforma de scouting de fútbol donde los jugadores suben video de partido, reciben retroalimentación de analistas y llegan a ojeadores verificados. TALENTÜ está disponible en Latinoamérica, España y África subsahariana.',
    },
    riwin: {
      tagline:
        'Editorial de guías de viaje con librería en línea donde cada compra suma tickets para sorteos.',
      role: 'Cofundador.',
      definition:
        'Riwin es una editorial colombiana que vende guías de viaje investigadas a través de una librería en línea donde cada compra también otorga participaciones para sorteos.',
      metaTitle: 'Riwin — editorial de guías de viaje',
      metaDescription:
        'Riwin vende guías de viaje investigadas en línea y cada compra suma tickets para sorteos. Julian Ortiz Alviar es cofundador de Riwin.',
      description:
        'Riwin es una editorial colombiana que vende guías de viaje investigadas a través de una librería en línea. Cada compra de un libro en Riwin también otorga participaciones para sorteos, y los pagos corren por Openpay con un paso antifraude de huella de dispositivo. Julian Ortiz Alviar es cofundador de Riwin.',
      problem:
        'Las guías de viaje compiten con contenido gratuito, así que Riwin cambia el incentivo: comprar un libro también es una participación en un sorteo. El catálogo es editorial — guías investigadas, con verificación de fuentes y edición profesional — y la capa de comercio envuelve cada compra en tickets, lo que convierte una venta única en una relación que se repite.',
      contribution:
        'Julian Ortiz Alviar es cofundador de Riwin. El sitio público no detalla el crédito de ingeniería, así que aquí no se reclama autoría de ninguna funcionalidad puntual. Los hechos técnicos verificables son el stack de abajo y que Riwin opera su propia API REST en api-riwin.riwin.com.co.',
      features: [
        'Un catálogo de libros navegable por destino y categoría',
        'Compras que generan números de ticket, con una página de cuenta que muestra cuántas participaciones tiene el lector',
        'Un ciclo de vida de sorteos: abren y cierran con su propio calendario',
        'Estándares editoriales declarados: investigación exhaustiva con verificación de fuentes, edición profesional, consejos prácticos de viajeros expertos',
        'Cuentas con verificación por código de correo, preferencias de notificación por canal y eliminación de cuenta autogestionada con doble confirmación',
        'Pagos con tarjeta a través de Openpay, con un paso antifraude de huella de dispositivo antes del cargo',
      ],
      narrative: [
        'Riwin es una editorial que vende guías de viaje y se describe como una editorial que abre puertas al mundo a través de los libros. Cada guía se plantea como un trabajo de investigación y no como una lista rápida — investigación exhaustiva con verificación de fuentes, edición profesional y diseño de calidad editorial, información práctica de viajeros expertos — y el catálogo está organizado para que el lector navegue por destino y categoría.',
        'La idea comercial es la parte que vale la pena notar. Comprar un libro también otorga tickets para sorteos, así que la tienda tiene un sistema de rifas encima del catálogo: las compras generan números de ticket, una página de cuenta muestra cuántas participaciones tiene el lector, y los sorteos abren y cierran con su propio ciclo de vida. Alrededor está la maquinaria que necesita cualquier tienda real — cuentas con verificación por código de correo, preferencias de notificación por canal, eliminación de cuenta autogestionada, y pagos con tarjeta a través de Openpay con un paso antifraude de huella de dispositivo antes del cargo.',
        'Julian Ortiz Alviar es cofundador de Riwin. La plataforma es una aplicación de React y TypeScript sobre Vite que habla con su propia API en api-riwin.riwin.com.co. Partes de la tienda todavía usan imágenes de placeholder, así que lo más honesto es describir a Riwin como en operación y temprana antes que como una operación comercial madura.',
      ],
      facts: [
        { label: 'Pagos', value: 'Openpay, con antifraude por huella de dispositivo' },
        { label: 'Estado', value: 'En operación, con partes de la tienda aún prelanzamiento' },
      ],
      note: 'El sitio de Riwin publica afirmaciones sobre procesamiento de pagos PCI-DSS Nivel 1 y auditorías de seguridad regulares. Esas son declaraciones del propio producto sobre sí mismo y sobre su procesador de pagos, citadas aquí como texto del sitio y no como hechos auditados de forma independiente.',
      organizationDescription:
        'Riwin es una editorial colombiana que vende guías de viaje investigadas, donde cada compra de un libro también otorga participaciones para sorteos.',
    },
    'lukiao-novapp': {
      tagline:
        'Fintech colombiana de crédito de consumo: solicitud de crédito solo con la cédula, un simulador de crédito instrumentado, y gestión de desembolsos y cuotas.',
      role: 'Desarrollador Full Stack en Lukiao, de octubre de 2021 a noviembre de 2022.',
      definition:
        'Lukiao es una fintech colombiana de crédito de consumo, hoy Novapp, cuya plataforma lleva al solicitante desde una solicitud hecha solo con la cédula hasta un crédito desembolsado y un plan de cuotas.',
      metaTitle: 'Simulador de crédito de Lukiao, hoy Novapp',
      metaDescription:
        'Julian Ortiz Alviar construyó el simulador de crédito, los microservicios de recaudo con Davivienda y las integraciones de pago en la fintech Lukiao.',
      description:
        'Lukiao es la fintech colombiana de crédito de consumo donde Julian Ortiz Alviar trabajó como desarrollador full-stack entre octubre de 2021 y noviembre de 2022. Julian Ortiz Alviar construyó el simulador de crédito, los microservicios en Java que integran a Banco Davivienda para recaudo, y las integraciones de pago con Paymentez y Wompi. Lukiao hoy se entrega como Novapp.',
      problem:
        'El crédito de consumo en Colombia tiene que funcionar para un solicitante que tiene su cédula y poco más. La plataforma de Lukiao hace las partes poco glamorosas: el solicitante aplica solo con su cédula, queda preaprobado, ve exactamente lo que va a deber, elige entre 2 y 8 cuotas quincenales a la tasa de interés efectiva anual legalmente constituida, y recibe el dinero en su cuenta bancaria. Después la plataforma le sigue el rastro al plan de cuotas, la mora, las renovaciones y las reofertas.',
      contribution:
        'Julian Ortiz Alviar construyó los microservicios en Java que integran a Lukiao con Banco Davivienda para recaudo, y Davivienda lo reconoció como el primer integrador que se conectó exitosamente a sus servicios en el primer intento. Julian Ortiz Alviar también construyó el simulador de crédito, los microservicios y las APIs REST integradas con bancos, pasarelas de pago y centrales de riesgo, la arquitectura de base de datos y las interfaces responsivas encima de ella, las integraciones de pago con Paymentez y Wompi incluida la conciliación, las integraciones SOAP con entidades financieras, y la app móvil de Lukiao.',
      features: [
        'Una solicitud de crédito que solo necesita la cédula colombiana',
        'Preaprobación, con el solicitante viendo exactamente lo que va a deber',
        'Un simulador de crédito, instrumentado como una etapa registrada dentro del embudo de solicitud',
        'Plazos de 2 a 8 cuotas quincenales a la tasa de interés efectiva anual legalmente constituida',
        'Una tabla de amortización con fechas y valores de cuota',
        'Desembolso a la cuenta bancaria del solicitante, con gestión de la cuenta de desembolso',
        'Flujos de renovación y reoferta, además de estados de mora y crédito congelado',
        'Pagos con Wompi, y una app móvil enlazada',
      ],
      narrative: [
        'Lukiao fue una fintech colombiana de crédito de consumo donde Julian Ortiz Alviar trabajó como desarrollador full-stack entre octubre de 2021 y noviembre de 2022. El producto hace las partes difíciles y poco glamorosas de prestar: el solicitante aplica solo con su cédula, queda preaprobado, ve exactamente lo que va a deber, elige entre 2 y 8 cuotas quincenales a la tasa de interés efectiva anual legalmente constituida, y recibe el dinero en su cuenta bancaria.',
        'Su trabajo cubrió los dos lados. Julian Ortiz Alviar construyó los microservicios en Java que conectan a Lukiao con Banco Davivienda para recaudo, el flujo del que dependen los prestadores colombianos, y Davivienda lo reconoció como el primer integrador que se conectó exitosamente a sus servicios en el primer intento. Construyó microservicios y APIs REST integradas con bancos, pasarelas de pago y centrales de riesgo, el procesamiento de pagos con Paymentez y Wompi con una conciliación que tiene que cuadrar, la arquitectura de base de datos y las interfaces responsivas encima de ella, el simulador de crédito y la app móvil de Lukiao.',
        'Lukiao pasó luego a llamarse Novapp. Julian Ortiz Alviar no participó en ese rebranding, pero buena parte de lo que construyó sigue corriendo adentro, el simulador de crédito incluido. Eso se puede verificar desde afuera: el bundle de producción actual de Novapp todavía carga videos de onboarding y recursos desde el bucket de Amazon S3 lukiaostorage, y el simulador sigue apareciendo por nombre en la instrumentación de pasos del embudo, como la etapa a la que el usuario entra y de la que sale cuando acepta una reoferta.',
      ],
      facts: [
        { label: 'Fechas del rol', value: 'Octubre de 2021 a noviembre de 2022' },
        { label: 'Integración bancaria', value: 'Recaudo con Banco Davivienda, en Java' },
        { label: 'Hoy se entrega como', value: 'Novapp' },
      ],
      note: 'Novapp es el rebranding de Lukiao. Julian Ortiz Alviar no trabajó en el rebranding, pero buena parte de lo que construyó en Lukiao sigue corriendo dentro de Novapp — el simulador de crédito incluido.',
    },
    mareaverde: {
      tagline:
        'E-commerce optimizado para buscadores de un growshop de cultivo indoor en Palma de Mallorca, sobre un backend serverless en AWS.',
      role: 'Trabajo freelance de ingeniería para un cliente independiente. El cliente no se nombra aquí.',
      definition:
        'Marea Verde Growshop es una tienda de cultivo indoor en Palma de Mallorca cuya tienda en línea está construida como un motor de respuestas y no como un catálogo.',
      metaTitle: 'Marea Verde — e-commerce growshop en AWS',
      metaDescription:
        'Marea Verde Growshop es un e-commerce de Palma de Mallorca sobre un backend serverless en AWS. Julian Ortiz Alviar lo construyó como freelance.',
      description:
        'Marea Verde Growshop es una tienda de cultivo indoor en Palma de Mallorca cuya tienda en línea bilingüe corre sobre un backend serverless en Amazon Web Services. La tienda publica guías de cultivo, hilos de preguntas por producto y una calculadora de vatios para armarios de cultivo junto a su catálogo. Julian Ortiz Alviar la construyó como trabajo freelance de ingeniería.',
      problem:
        'Una tienda especializada local que compite contra marketplaces genéricos tiene una sola palanca: ser la mejor respuesta a una pregunta concreta. Así que el sitio está construido como un motor de respuestas y no como un catálogo — conteos reales de stock, guías de cultivo paso a paso, hilos de preguntas por producto, una calculadora de vatios, y una superficie de búsqueda trabajada mucho más allá de la de una tienda común.',
      contribution:
        'Julian Ortiz Alviar construyó esta tienda como trabajo freelance de ingeniería para un cliente independiente. El trabajo cubre la tienda en React y TypeScript, el backend serverless en Amazon API Gateway, el enrutamiento bilingüe con un juego correcto de hreflang, el índice de sitemaps segmentado, y el consentimiento de cookies granular y la puerta de edad que exige esta categoría de producto en la Unión Europea.',
      features: [
        'Categorías de catálogo para iluminación, sustratos y abonos, control de clima, riego, genética y cosecha',
        'Conteos de stock en tiempo real por producto, con promesa de envío el mismo día',
        'Una calculadora de cultivo que convierte las medidas del armario en los vatios de LED y la cobertura necesarios',
        'Guías de cultivo paso a paso y un blog escrito por quien está detrás del mostrador',
        'Hilos de preguntas por producto y valoraciones de clientes con etiquetas accesibles localizadas',
        'Pagos con tarjeta a través de Stripe',
        'Ediciones en español e inglés con un juego correcto de hreflang y URL canónica',
        'Un índice de sitemaps que se abre en siete hijos: páginas estáticas, productos, categorías, blog, guías, landings y comparativas',
        'Consentimiento de cookies granular y revocable que separa el almacenamiento estrictamente necesario de la analítica, más la puerta de edad 18+ exigida para esta categoría',
      ],
      narrative: [
        'Marea Verde Growshop es una tienda de cultivo indoor en Palma de Mallorca cuya tienda en línea está construida como un motor de respuestas y no como un catálogo. La ventaja del negocio frente a un marketplace genérico es el conocimiento, así que el sitio pone el conocimiento adelante: guías de cultivo paso a paso, artículos escritos por quien está detrás del mostrador, preguntas y respuestas por producto, valoraciones de clientes y una calculadora que convierte las medidas del armario de cultivo en los vatios de LED y la cobertura que realmente hacen falta.',
        'Por dentro es una SPA de React y TypeScript sobre Vite, con validación en Zod y pagos con Stripe, respaldada por una API serverless en Amazon API Gateway. Se entrega en español e inglés con un juego correcto de hreflang, URL canónica, la puerta de edad 18+ que exige la Unión Europea para esta categoría, y un consentimiento de cookies granular y revocable que separa el almacenamiento estrictamente necesario de la analítica.',
        'La superficie de búsqueda es inusualmente completa para una tienda de este tamaño: un índice de sitemaps que se abre en siete hijos — páginas estáticas, productos, categorías, blog, guías, landings y comparativas — cada uno con su propio lastmod. Julian Ortiz Alviar construyó la tienda como trabajo freelance de ingeniería para un cliente independiente, y el cliente no se nombra aquí.',
      ],
      facts: [
        { label: 'Modalidad', value: 'Freelance, cliente independiente' },
        { label: 'Backend', value: 'Serverless, Amazon API Gateway' },
        { label: 'Idiomas', value: 'es-ES e en, con x-default' },
      ],
      note: 'Este fue trabajo freelance de ingeniería para un cliente independiente. El cliente no se nombra a propósito, y no se reclama ninguna entidad de organización sobre el negocio de otra persona.',
    },
    herbafit: {
      tagline:
        'La app oficial de fitness de Herbalife para Android: entrenamiento guiado, seguimiento corporal con báscula inteligente y sincronización con wearables.',
      role: 'Desarrollador, en BTi Group.',
      definition:
        'HerbaFit es la aplicación oficial de fitness de Herbalife para Android, construida con React Native y Expo y publicada en Google Play por BTi Group.',
      metaTitle: 'HerbaFit — app oficial de Herbalife',
      metaDescription:
        'HerbaFit ofrece entrenamiento guiado, seguimiento con báscula inteligente y sincronización con wearables. Julian Ortiz Alviar trabajó en ella en BTi Group.',
      description:
        'HerbaFit es la aplicación oficial de fitness de Herbalife para Android, construida con React Native y Expo y publicada en Google Play por BTi Group. HerbaFit ofrece una biblioteca de entrenamiento guiado en video, seguimiento de métricas corporales con una báscula inteligente emparejada, y sincronización de actividad desde dispositivos wearables.',
      problem:
        'Los distribuidores y clientes de Herbalife siguen sus métricas corporales entre una báscula, un wearable y un cuaderno que nunca coinciden. HerbaFit consolida los tres en una sola cuenta: una biblioteca de entrenamiento guiado en video, métricas corporales capturadas directamente de una báscula inteligente emparejada, y sincronización con wearables para que la actividad aterrice en el mismo lugar que los pesajes.',
      contribution:
        'HerbaFit está construida con React Native y Expo. Julian Ortiz Alviar trabajó en la app HerbaFit para Android durante su paso por BTi Group. Aparte, también en BTi Group, Julian Ortiz Alviar trabajó en la plataforma "Let\'s All Do Good" — un único código base que produce múltiples apps de marca blanca, cada una con la marca de una organización cliente, y esas organizaciones clientes son sindicatos — e implementó el flujo de despliegue que publica todas esas apps. La atribución a nivel de funcionalidad dentro de HerbaFit no está establecida, así que aquí no se reclama ninguna.',
      features: [
        'Una biblioteca de entrenamiento guiado con videos y contenido multimedia',
        'Seguimiento físico avanzado: peso, talla y otros indicadores capturados desde una báscula inteligente emparejada',
        'Sincronización con dispositivos wearables para consolidar actividad y progreso en una sola cuenta',
        'Instalación gratuita, con clasificación apta para todo público',
        'Construida con React Native y Expo, y publicada en Google Play por BTi Group',
      ],
      narrative: [
        'HerbaFit es la app oficial de fitness de Herbalife para Android, publicada en Google Play por BTi Group, donde tiene una calificación de 4.25 sobre 5 con 63 valoraciones y superó las 10.000 instalaciones, a septiembre de 2026. HerbaFit le da a los clientes de Herbalife un solo lugar para las tres cosas que normalmente viven separadas: una biblioteca de entrenamiento guiado con videos y contenido multimedia, métricas corporales como peso y talla capturadas directamente desde una báscula inteligente emparejada, y la actividad sincronizada desde dispositivos wearables.',
        'HerbaFit está construida con React Native y Expo, y Julian Ortiz Alviar trabajó en ella durante su paso por BTi Group. En BTi Group también trabajó en algo aparte: la plataforma "Let\'s All Do Good", una familia de apps de marca blanca producidas desde un único código base, donde cada app es un contenedor con la marca de una organización cliente y esas organizaciones clientes son sindicatos. Julian Ortiz Alviar implementó el flujo de despliegue que publica todas esas apps — un código base, muchos lanzamientos con marcas distintas, y un pipeline que tiene que dejar el build correcto en la ficha correcta de la tienda cada vez.',
        'HerbaFit es además la línea conectora más clara de este portafolio. Julian Ortiz Alviar entrega apps móviles en producción con React Native y Expo, y mantiene un starter público de ese mismo stack: react-native-expo-stack, su repositorio con más estrellas. La plantilla no se extrajo de HerbaFit; la afirmación es más estrecha y verificable, y es que el stack que corre en producción es el stack que codificó en abierto. Una advertencia, dicha de frente: BTi Group no figura en ninguna parte de la hoja de vida de Julian Ortiz Alviar, así que este proyecto se acredita en su propia página y a propósito no se ancla a ninguna entrada de la línea de tiempo de experiencia.',
      ],
      facts: [
        { label: 'Publicador', value: 'BTi Group, en Google Play' },
        { label: 'Construida con', value: 'React Native y Expo' },
        { label: 'Paquete', value: 'com.herbalife.herbafit' },
        {
          label: 'Calificación',
          value: '4.25 sobre 5 con 63 valoraciones en Google Play, a septiembre de 2026',
        },
        { label: 'Instalaciones', value: 'Más de 10.000, a septiembre de 2026' },
      ],
      note: 'BTi Group no aparece en la hoja de vida de Julian Ortiz Alviar, así que este proyecto no enlaza a ninguna entrada de la línea de tiempo de experiencia. No se nombra ninguna app de socio distinta de HerbaFit, y no se afirma nada sobre una relación de proveedor detrás de la plataforma.',
    },
  },
}
