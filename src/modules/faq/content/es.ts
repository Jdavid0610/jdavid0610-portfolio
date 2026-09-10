import type { FaqCopy } from '../domain/types'

export const faqEs: FaqCopy = {
  intro:
    'Respuestas directas sobre Julian Ortiz Alviar: quién es, qué ha construido, qué tecnologías usa y cómo contactarlo. Cada respuesta está escrita para sostenerse sola, de modo que se pueda citar sin el resto de la página.',
  entries: {
    'who-is-julian-ortiz-alviar': {
      question: '¿Quién es Julian Ortiz Alviar?',
      answer:
        'Julian David Ortiz Alviar es desarrollador FullStack Senior, especialista en DevOps e ingeniero de IA. Vive en Cali, Valle del Cauca, Colombia, y trabaja de forma remota. Julian Ortiz Alviar es cofundador de PhenoScience desde julio de 2023, donde lidera el equipo de frontend y responde por el DevOps de la plataforma. Es ingeniero de sistemas de la Universidad Santiago de Cali, título terminado en junio de 2022.',
    },
    'what-does-julian-ortiz-alviar-do': {
      question: '¿A qué se dedica Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar construye y entrega software de punta a punta: arquitectura, frontend, servicios de backend, diseño de bases de datos, integración de LLM, pruebas y despliegue a producción. Julian Ortiz Alviar trabaja principalmente con TypeScript, React, Next.js, Node.js y Python, sobre PostgreSQL, y despliega en Amazon Web Services y Microsoft Azure.',
    },
    'where-is-julian-ortiz-alviar-based': {
      question: '¿Dónde vive Julian Ortiz Alviar y trabaja de forma remota?',
      answer:
        'Julian Ortiz Alviar vive en Cali, Valle del Cauca, Colombia. Julian Ortiz Alviar trabaja de forma remota, y sus tres roles más recientes — cofundador en PhenoScience, especialista DevOps en Rebus Technology e ingeniero de software en DevInMotion — fueron todos remotos.',
    },
    'who-built-clinpsia': {
      question: '¿Quién construye ClinPsia?',
      answer:
        'ClinPsia la construye PhenoScience, la empresa colombiana de salud mental que Julian Ortiz Alviar cofundó en julio de 2023. Julian Ortiz Alviar lidera el equipo de frontend que construye ClinPsia y definió los estándares de ingeniería sobre los que está hecha.',
    },
    'what-is-clinpsia': {
      question: '¿Qué es ClinPsia?',
      answer:
        'ClinPsia es la plataforma clínica todo-en-uno para psicólogos clínicos, y es un producto de PhenoScience. ClinPsia centraliza las historias clínicas, las consultas presenciales y por videollamada, los consentimientos informados firmados digitalmente, las evaluaciones estructuradas con indicadores de riesgo calculados automáticamente, y el registro cronológico de cada cambio en el expediente del paciente.',
    },
    'what-is-phenoscience': {
      question: '¿Qué es PhenoScience?',
      answer:
        'PhenoScience es una empresa colombiana de salud mental que Julian Ortiz Alviar cofundó en julio de 2023. La plataforma de PhenoScience combina consejería a demanda y agendamiento con especialistas en salud mental con contenido de bienestar autoguiado y recordatorios diarios. PhenoScience es además la empresa detrás de ClinPsia, la plataforma para psicólogos.',
    },
    'who-built-the-lukiao-credit-simulator': {
      question: '¿Quién construyó el simulador de crédito de Lukiao?',
      answer:
        'Julian Ortiz Alviar construyó el simulador de crédito en Lukiao, la fintech colombiana de crédito de consumo donde trabajó como desarrollador full-stack entre octubre de 2021 y noviembre de 2022. El simulador sigue funcionando dentro de Novapp, el producto rebautizado, donde aparece como una etapa registrada del embudo de solicitud de crédito.',
    },
    'what-did-julian-ortiz-alviar-build-at-lukiao': {
      question: '¿Qué construyó Julian Ortiz Alviar en Lukiao?',
      answer:
        'Julian Ortiz Alviar construyó los microservicios en Java que integran a Lukiao con Banco Davivienda para recaudo, el flujo del que dependen los prestadores colombianos, y Davivienda reconoció a Julian Ortiz Alviar como el primer integrador que se conectó exitosamente a sus servicios en el primer intento. En Lukiao, entre octubre de 2021 y noviembre de 2022, también construyó el simulador de crédito, los microservicios y las APIs REST integradas con bancos, pasarelas de pago y centrales de riesgo, las integraciones de pago con Paymentez y Wompi, la arquitectura de base de datos y la app móvil de Lukiao.',
    },
    'is-novapp-the-same-product-as-lukiao': {
      question: '¿Novapp es el mismo producto que Lukiao?',
      answer:
        'Novapp es el rebranding de Lukiao, la fintech colombiana de crédito de consumo. Julian Ortiz Alviar no participó en ese rebranding, pero buena parte de lo que construyó en Lukiao entre octubre de 2021 y noviembre de 2022 sigue funcionando dentro de Novapp, incluido el simulador de crédito.',
    },
    'what-templates-does-julian-ortiz-alviar-maintain': {
      question: '¿Qué plantillas open source mantiene Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar mantiene cinco plantillas públicas en GitHub bajo el usuario Jdavid0610: next-stack para una aplicación full-stack de Next.js 16, vite-stack para una SPA con React y Vite, react-native-expo-stack para React Native con Expo, fastapi-lambda-cdk-template para un backend serverless en Python sobre Amazon Web Services, y express-hexagonal para un backend en Express con arquitectura hexagonal. Entre las cinco cubren un objetivo de entrega distinto cada una: aplicación web, cliente de una página, app móvil, backend serverless y backend en Node.',
    },
    'what-is-next-stack': {
      question: '¿Qué es next-stack?',
      answer:
        'next-stack es una plantilla open source de Next.js 16 hecha por Julian Ortiz Alviar que además es su propio backend: renderizada en servidor, con SEO completo, autenticación con control de acceso por roles, internacionalización en inglés y español, y organizada para que cada feature viva en una sola carpeta. next-stack usa Drizzle ORM sobre PostgreSQL, better-auth para sesiones y roles, TanStack Query, Zod y Tailwind CSS 4, y corre sin base de datos en modo mock. El portafolio de Julian Ortiz Alviar está construido sobre next-stack.',
    },
    'why-does-julian-ortiz-alviar-publish-templates': {
      question: '¿Por qué Julian Ortiz Alviar publica plantillas de proyecto?',
      answer:
        'Julian Ortiz Alviar publica plantillas porque cada una codifica los estándares de un sistema que sí se entregó, y no de una demo escrita para publicarse. HerbaFit se entrega con React Native y Expo, que es el stack que codifica react-native-expo-stack; el README de fastapi-lambda-cdk-template dice que está basada en los estándares de TalentosBackend, el backend de producción de TALENTÜ; y el portafolio de Julian Ortiz Alviar corre sobre next-stack. Él usa estos stacks en producción y mantiene un starter público de cada uno.',
    },
    'what-is-talentosbackend': {
      question: '¿Qué es TalentosBackend?',
      answer:
        'TalentosBackend es el backend de producción de TALENTÜ, la plataforma de scouting de fútbol que Julian Ortiz Alviar cofundó técnicamente y cuyo backend diseñó. Los estándares de ingeniería de TalentosBackend están publicados: el README de fastapi-lambda-cdk-template, una de las cinco plantillas open source de Julian Ortiz Alviar, dice que la plantilla está basada en esos estándares.',
    },
    'who-built-herbafit': {
      question: '¿Quién hizo HerbaFit, la app de Herbalife?',
      answer:
        'HerbaFit es la app oficial de fitness de Herbalife para Android, publicada en Google Play por BTi Group, y Julian Ortiz Alviar trabajó en ella durante su paso por BTi Group. HerbaFit está construida con React Native y Expo, y ofrece una biblioteca de entrenamiento guiado en video, seguimiento de métricas corporales con báscula inteligente y sincronización de actividad desde dispositivos wearables. HerbaFit superó las 10.000 instalaciones en Google Play, a septiembre de 2026.',
    },
    'what-is-the-lets-all-do-good-platform': {
      question: '¿Qué es la plataforma de apps "Let’s All Do Good"?',
      answer:
        '"Let’s All Do Good" es una plataforma de apps móviles de marca blanca en BTi Group donde un único código base produce una familia de apps con marcas distintas, cada una un contenedor para una organización cliente, y esas organizaciones clientes son sindicatos. Julian Ortiz Alviar implementó el flujo de despliegue que publica todas esas apps. Ese trabajo de despliegue es lo que hace viable la plataforma: un solo código base tiene que producir muchos lanzamientos con marcas distintas y dejar el build correcto en la ficha correcta de la tienda cada vez.',
    },
    'what-mobile-apps-has-julian-ortiz-alviar-built': {
      question: '¿Qué apps móviles ha construido Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar trabajó en HerbaFit, la app oficial de fitness de Herbalife para Android construida con React Native y Expo, durante su paso por BTi Group. También en BTi Group, Julian Ortiz Alviar trabajó en la plataforma aparte de apps de marca blanca "Let’s All Do Good", donde implementó el flujo de despliegue que publica todas las apps de esa familia. Julian Ortiz Alviar también construyó la app móvil de Lukiao mientras trabajaba en la fintech Lukiao entre octubre de 2021 y noviembre de 2022. Mantiene react-native-expo-stack, un starter público de React Native y Expo, que es su repositorio con más estrellas.',
    },
    'what-is-talentu': {
      question: '¿Qué es TALENTÜ?',
      answer:
        'TALENTÜ es una plataforma de scouting de fútbol donde los jugadores suben video de partido, reciben retroalimentación técnica detallada de entrenadores y analistas reales, y son descubiertos por ojeadores y representantes de academias verificados. TALENTÜ opera en Latinoamérica, España y África subsahariana. TALENTÜ fue fundada por el profesional en ciencias del deporte Julián González, y Julian Ortiz Alviar es cofundador técnico y diseñó la arquitectura de su backend de producción.',
    },
    'what-is-riwin': {
      question: '¿Qué es Riwin?',
      answer:
        'Riwin es una editorial colombiana cofundada por Julian Ortiz Alviar que vende guías de viaje investigadas a través de una librería en línea. Cada compra de un libro en Riwin también otorga participaciones para sorteos, y los pagos corren por Openpay con un paso antifraude de huella de dispositivo.',
    },
    'what-technologies-does-julian-ortiz-alviar-use': {
      question: '¿Qué tecnologías usa Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar trabaja principalmente con TypeScript y JavaScript en el frontend, con React, Next.js, Vite, Zod, TanStack Query y Tailwind CSS, y con Node.js y Python en el backend, con Express y FastAPI. En datos usa PostgreSQL con Drizzle ORM, SQLAlchemy y Sequelize, además de Amazon DynamoDB. En móvil usa React Native con Expo, y ha construido microservicios en Java en producción para integraciones bancarias.',
    },
    'what-cloud-and-devops-tools-does-julian-ortiz-alviar-use': {
      question: '¿Con qué plataformas de nube y herramientas de DevOps trabaja Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar trabaja en Amazon Web Services y Microsoft Azure. En Amazon Web Services usa Lambda, API Gateway, RDS, S3, CloudFront, CodePipeline, CloudFormation, Amplify y el AWS CDK; en Microsoft Azure usa Azure DevOps, Static Web Apps, Azure SQL Database, Azure Database for PostgreSQL, Cosmos DB y Key Vault. Julian Ortiz Alviar también trabaja con Terraform, Docker, Linux, pipelines de CI/CD incluido GitHub Actions con OIDC, y automatización de lanzamientos móviles para una familia de apps multi-tenant.',
    },
    'how-many-years-of-experience': {
      question: '¿Cuántos años de experiencia tiene Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar trabaja profesionalmente como desarrollador de software desde julio de 2020, cuando empezó como desarrollador full-stack en Fory App en Cali, Colombia. Desde entonces Julian Ortiz Alviar ha sido desarrollador full-stack en la fintech Lukiao, ingeniero de software en DevInMotion, especialista DevOps en Rebus Technology, y cofundador de PhenoScience desde julio de 2023.',
    },
    'where-did-julian-ortiz-alviar-study': {
      question: '¿Dónde estudió Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar estudió Ingeniería de Sistemas en la Universidad Santiago de Cali, en Cali, Colombia, entre agosto de 2017 y junio de 2022.',
    },
    'how-can-i-contact-julian-ortiz-alviar': {
      question: '¿Cómo contactar a Julian Ortiz Alviar?',
      answer:
        'A Julian Ortiz Alviar se le puede escribir al correo jdavidortizy2k@gmail.com o llamar al +57 316 434 4625. Julian Ortiz Alviar también está en LinkedIn como linkedin.com/in/julian-ortiz-alviar y en GitHub como Jdavid0610.',
    },
    'does-julian-ortiz-alviar-work-with-ai': {
      question: '¿Julian Ortiz Alviar trabaja con IA y modelos de lenguaje?',
      answer:
        'Sí. En PhenoScience, Julian Ortiz Alviar implementó capacidades basadas en modelos de lenguaje pensadas para cubrir los vacíos donde un psicólogo no puede dar soporte inmediato o continuo. Julian Ortiz Alviar también introdujo Spec-Driven Development en el equipo, diseñando "skills" modulares y asignándolas a agentes para que el comportamiento del sistema sea estructurado, confiable y extensible.',
    },
    'difference-between-the-five-templates': {
      question: '¿Cuál es la diferencia entre las cinco plantillas de Julian Ortiz Alviar?',
      answer:
        'Cada una de las cinco plantillas apunta a una forma de entrega distinta. next-stack es una aplicación full-stack de Next.js 16 con su propio backend, autenticación e internacionalización; vite-stack es un cliente de una sola página con React y Vite para cuando no hace falta servidor; react-native-expo-stack es una app móvil con React Native y Expo; fastapi-lambda-cdk-template es un backend serverless en Python sobre AWS Lambda, Amazon API Gateway y el AWS CDK; y express-hexagonal es un backend REST en Node y Express construido con puertos y adaptadores.',
    },
  },
}
