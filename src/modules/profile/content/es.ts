import type { ProfileCopy } from '../domain/types'

export const profileEs: ProfileCopy = {
  headline: 'Desarrollador FullStack Senior · Especialista DevOps · Ingeniero de IA',
  titles: ['Desarrollador FullStack Senior', 'Especialista DevOps', 'Ingeniero de IA'],
  oneLineBio:
    'Desarrollador FullStack Senior, especialista en DevOps e ingeniero de IA, basado en Cali, Colombia.',
  heroBio: [
    'Julian David Ortiz Alviar es desarrollador FullStack Senior, especialista en DevOps e ingeniero de IA. Vive en Cali, Colombia, y trabaja de forma remota.',
    'Julian Ortiz Alviar construye productos de punta a punta — arquitectura, frontend, backend, base de datos y despliegue — con TypeScript, React, Next.js, Node.js y Python sobre Amazon Web Services y Microsoft Azure.',
    'Desde julio de 2023 Julian Ortiz Alviar es cofundador de PhenoScience, donde lidera el equipo de frontend e integra capacidades de modelos de lenguaje en productos de salud mental.',
  ],
  longBio: [
    'Julian David Ortiz Alviar es desarrollador FullStack Senior, especialista en DevOps e ingeniero de IA, y vive en Cali, Valle del Cauca, Colombia. Julian Ortiz Alviar diseña, construye y despliega aplicaciones web escalables y software con inteligencia artificial, trabajando con TypeScript, React, Next.js, Node.js, Python y Java, y con PostgreSQL y MongoDB por detrás.',
    'Su trabajo cubre todo el camino: arquitectura y desarrollo frontend, servicios de backend, diseño de bases de datos, integración de LLM, pruebas y despliegue a producción. En infraestructura se mueve en entornos cloud-native: pipelines de CI/CD, contenedores, Linux, Terraform, Amazon Web Services y Microsoft Azure, además de monitoreo, seguridad y optimización de rendimiento.',
    'Julian Ortiz Alviar es cofundador de PhenoScience desde julio de 2023. Antes fue especialista en DevOps en Rebus Technology, ingeniero de software en DevInMotion y desarrollador full-stack en la fintech Lukiao.',
  ],
  positioning: {
    statement:
      'Una sola persona que lleva un producto de la arquitectura a producción — y de un modelo a una funcionalidad.',
    pillars: [
      {
        title: 'Productos en producción',
        description:
          'PhenoScience y ClinPsia están en operación en la salud mental colombiana, la plataforma de crédito de Lukiao sigue corriendo dentro de Novapp, y HerbaFit superó las 10.000 instalaciones en Google Play.',
      },
      {
        title: 'Profundidad en infraestructura',
        description:
          'Amazon Web Services y Microsoft Azure, ambientes provisionados con Terraform, pipelines de CI/CD que hacen cumplir los estándares, y backends serverless definidos en AWS CDK.',
      },
      {
        title: 'Estándares de ingeniería reutilizables',
        description:
          'Cinco plantillas públicas, una por objetivo de entrega, y cada una codifica los estándares de un sistema que él sí entregó. HerbaFit corre sobre el stack de react-native-expo-stack, el backend de producción de TALENTÜ aportó los estándares de fastapi-lambda-cdk-template, y el sitio que estás leyendo está construido sobre next-stack.',
      },
    ],
  },
  heroFacts: [
    { value: '2020', label: 'entregando desde' },
    { value: '7', label: 'productos entregados' },
    { value: '5', label: 'plantillas públicas' },
  ],
  stats: [
    { value: '2023', label: 'Cofundador, PhenoScience' },
    { value: '10k+', label: 'Instalaciones, HerbaFit' },
    { value: '1.º', label: 'Integración Davivienda al primer intento' },
    { value: '5', label: 'Plantillas open source' },
  ],
  location: 'Cali, Valle del Cauca, Colombia',
  workMode: 'Remoto, en cualquier parte del mundo',
  education: {
    degree: 'Ingeniería de Sistemas',
    institution: 'Universidad Santiago de Cali',
    summary:
      'Julian Ortiz Alviar estudió Ingeniería de Sistemas en la Universidad Santiago de Cali, en Cali, Colombia, entre agosto de 2017 y junio de 2022.',
  },
  languages: ['Español (nativo)', 'Inglés'],
  categoryLabels: {
    frontend: 'Frontend',
    backend: 'Backend y APIs',
    cloud: 'Cloud y DevOps',
    ai: 'IA y LLM',
    data: 'Bases de datos y datos',
    languages: 'Lenguajes',
    practices: 'Prácticas y arquitectura',
  },
  tierLabels: {
    core: 'Núcleo',
    strong: 'Sólido',
    working: 'En uso',
    listed: 'También en mi CV',
  },
  tierNote:
    'Núcleo significa usado en producción en más de un proyecto y verificable desde afuera. Sólido significa nombrado con especificidad en la hoja de vida y corroborado por al menos un artefacto público. En uso significa aplicado en trabajo real, sin verificación externa disponible.',
  alsoListedNote:
    'Estas etiquetas aparecen en la hoja de vida de Julian Ortiz Alviar pero no tienen un artefacto público detrás, así que se listan aquí en vez de presentarse como fortalezas.',
  contactIntro:
    'Julian Ortiz Alviar trabaja de forma remota desde Cali, Colombia, y lee cada mensaje. El correo es la vía más rápida.',
  contactLabels: {
    email: 'Correo',
    phone: 'Teléfono',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    company: 'Empresa',
    location: 'Ubicación',
  },
}
