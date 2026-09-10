import type { ExperienceCopy } from '../domain/types'

export const experienceEs: ExperienceCopy = {
  overlapNote:
    'Estos roles se traslapan a propósito. Julian Ortiz Alviar cofundó PhenoScience en julio de 2023 mientras seguía empleado en Rebus Technology y DevInMotion, y entró a Lukiao en octubre de 2021 mientras terminaba en Fory App en noviembre de 2021. Las barras están dibujadas a escala para que la simultaneidad se vea en vez de quedar aplanada.',
  presentLabel: 'Actualidad',
  remoteLabel: 'Remoto',
  bucketLabels: {
    venture: 'Emprendimiento propio',
    employment: 'Empleo',
  },
  roles: {
    'phenoscience-cofounder': {
      title: 'Cofundador',
      location: 'Remoto, desde Cali, Colombia',
      summary:
        'PhenoScience es una empresa colombiana de salud mental que Julian Ortiz Alviar cofundó en julio de 2023 y donde lidera el equipo de frontend y responde por la entrega de la plataforma.',
      achievements: [
        'Cofundó PhenoScience y lidera el equipo de frontend, estableciendo los estándares que permiten que el producto escale en vez de reescribirse.',
        'Implementó capacidades basadas en modelos de lenguaje para cubrir los vacíos donde un psicólogo no puede dar soporte inmediato o continuo, convirtiendo el tiempo de espera en atención aprovechable.',
        'Introdujo Spec-Driven Development diseñando "skills" modulares y asignándolas a agentes, con lo que el comportamiento del sistema quedó más estructurado, más confiable y más fácil de extender.',
        'Se encarga de la estabilidad de la plataforma y del DevOps de punta a punta: pipelines de CI/CD, infraestructura provisionada con Terraform y despliegues repetibles entre ambientes, además de responsabilidades administrativas clave como fundador.',
      ],
    },
    'rebus-technology-devops': {
      title: 'Especialista DevOps',
      location: 'Remoto',
      summary:
        'Rebus Technology es la empresa donde Julian Ortiz Alviar trabajó como especialista DevOps entre octubre de 2023 y julio de 2025, diseñando y operando su infraestructura en Azure y AWS.',
      achievements: [
        'Diseñó, implementó y mantuvo aplicaciones web y móviles escalables con Azure DevOps, Azure Static Web Apps y AWS Amplify.',
        'Diseñó y administró la infraestructura de Azure — gestión de accesos, flujos de despliegue y estándares de ingeniería — para que la confiabilidad y la calidad del código las garantizara el pipeline y no solo la revisión manual.',
        'Construyó sobre una superficie amplia de Amazon Web Services y Microsoft Azure para lograr arquitecturas seguras, escalables y eficientes en costos: AWS Lambda, Amazon RDS, Amazon CloudFront y AWS CodePipeline, con Azure SQL Database, Azure Database for PostgreSQL, Azure Cosmos DB y Azure Key Vault.',
        'Sostuvo la calidad del frontend con pruebas exhaustivas y trabajó directamente con soporte y equipos de ingeniería multifuncionales para diagnosticar incidentes en producción y entregar correcciones confiables.',
      ],
    },
    'devinmotion-software-engineer': {
      title: 'Ingeniero de Software',
      location: 'Remoto',
      summary:
        'DevInMotion S.A.S es la empresa donde Julian Ortiz Alviar trabajó como ingeniero de software entre febrero y noviembre de 2023, construyendo integraciones con terceros y el monitoreo alrededor de ellas.',
      achievements: [
        'Diseñó y desarrolló nuevas integraciones con plataformas de terceros multinacionales, aplicando principios arquitectónicos estrictos para que cada integración se mantuviera escalable, confiable y mantenible.',
        'Desarrolló monitoreo y alertamiento que detecta y maneja errores de forma proactiva en flujos críticos de la plataforma, incluidos procesos de clientes y de producto, mejorando la observabilidad y la confiabilidad operativa.',
      ],
    },
    'lukiao-fullstack': {
      title: 'Desarrollador Full Stack',
      location: 'Cali, Valle del Cauca, Colombia',
      summary:
        'Lukiao es la fintech colombiana de crédito de consumo donde Julian Ortiz Alviar trabajó como desarrollador full-stack entre octubre de 2021 y noviembre de 2022, construyendo su simulador de crédito y sus integraciones bancarias.',
      achievements: [
        'Construyó los microservicios en Java que integran a Lukiao con Banco Davivienda para recaudo. Davivienda reconoció a Julian Ortiz Alviar como el primer integrador que se conectó exitosamente a sus servicios en el primer intento.',
        'Construyó y mantuvo soluciones full-stack para la fintech Lukiao, desarrollando microservicios y APIs REST integradas con bancos, pasarelas de pago y centrales de riesgo.',
        'Diseñó la arquitectura de base de datos y, sobre ella, las interfaces responsivas de cara al usuario, con la misma atención a la usabilidad y a la calidad visual.',
        'Implementó y operó integraciones de pago con Paymentez y Wompi, asegurando precios correctos, procesamiento confiable de transacciones y conciliación exitosa de pagos.',
        'Construyó el simulador de crédito, que hoy sigue funcionando dentro de Novapp, el producto rebautizado.',
      ],
    },
    'fory-app-fullstack': {
      title: 'Desarrollador Full Stack',
      location: 'Cali, Valle del Cauca, Colombia',
      summary:
        'Fory App es la empresa donde Julian Ortiz Alviar trabajó como desarrollador full-stack entre julio de 2020 y noviembre de 2021, construyendo las aplicaciones web con las que sus empresas aliadas medían su propio desempeño.',
      achievements: [
        'Desarrolló y mantuvo las aplicaciones web con las que las empresas aliadas de Fory App monitorean y analizan su desempeño de negocio.',
        'Construyó las interfaces responsivas y la funcionalidad de backend detrás de ellas: seguimiento de desempeño, gestión de datos e integración con flujos de negocio externos.',
      ],
    },
  },
}
