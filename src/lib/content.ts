// Todo el contenido del sitio vive acá, para que se renderice en el servidor
// y quede visible para buscadores y redes sin depender de JavaScript.

export const site = {
  name: "Impronta",
  wordmark: "impronta",
  signature: "IA y software para empresas",
  url: "https://impronta.com.uy",
  description: "Soluciones de IA y software para empresas",
};

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export const heroWords = ["IA", "Software"];

export type Objective = "Mejorar atención" | "Automatizar procesos" | "Presencia digital";

export type Product = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  objective: Objective;
  /** Frase para el selector "Quiero…" de la home. */
  intent: string;
  description: string;
  metric: { label: string; value: string; count?: { to: number; prefix: string; suffix: string } };
  features: string[];
  cta: string;
  externalSite?: { label: string; href: string };
  demos?: { name: string; href: string; video: string }[];
  /** Mensaje modelo que se precarga en el formulario de contacto. */
  template: string;
};

export const products: Product[] = [
  {
    slug: "maspeak",
    name: "Maspeak",
    short: "Maspeak",
    tagline: "Recepcionista virtual",
    objective: "Mejorar atención",
    intent: "mejorar la atención",
    description:
      "Asistente conversacional para hoteles que automatiza llamadas, mensajes y reservas.",
    metric: {
      label: "Ingresos recuperados con Maspeak",
      value: "US$338K+ / año",
      count: { to: 338, prefix: "US$", suffix: "K+ / año" },
    },
    features: ["Agente de voz", "Agente de chat", "Integración con reservas", "Handoff humano"],
    cta: "Implementar Maspeak",
    externalSite: { label: "usemaspeak.com", href: "https://usemaspeak.com/" },
    template:
      "Interés en implementación de Maspeak.\nSe busca mejorar la atención de consultas y reservas con una solución 24/7.\nSe solicita coordinación de una demo y una propuesta con tiempos de implementación.",
  },
  {
    slug: "contabilidad",
    name: "Automatización de Contabilidad Empresarial",
    short: "Contabilidad",
    tagline: "Automatiza conciliaciones",
    objective: "Automatizar procesos",
    intent: "automatizar procesos",
    description:
      "Automatización contable para reducir tareas manuales y agilizar conciliaciones.",
    metric: {
      label: "Reduce el tiempo para realizar conciliaciones",
      value: "al 0,05% del tiempo manual",
    },
    features: [
      "Conciliaciones automáticas",
      "Clasificación contable",
      "Panel de seguimiento",
    ],
    cta: "Automatizar mis procesos",
    template:
      "Interés en Automatización de Contabilidad Empresarial.\nSe busca reducir trabajo manual en conciliaciones y ordenar procesos contables.\nSe solicita una propuesta con alcance, tiempos y próximos pasos.",
  },
  {
    slug: "paginas-web",
    name: "Creación de páginas web high quality",
    short: "Páginas web",
    tagline: "Presencia digital",
    objective: "Presencia digital",
    intent: "ganar presencia digital",
    description:
      "Landing pages y sitios web de alta calidad para presencia digital y conversión.",
    metric: { label: "Visibilidad", value: "Presencia en buscadores" },
    features: ["Landing pages", "Sitios web", "Posicionamiento en buscadores", "Foco en conversión"],
    cta: "Hacer mi página web",
    demos: [
      { name: "Maspeak", href: "https://usemaspeak.com/", video: "/videos/demo-maspeak.mp4" },
      {
        name: "abraChem",
        href: "https://v0-abrachem-landing-page.vercel.app/",
        video: "/videos/demo-abrachem.mp4",
      },
    ],
    template:
      "Interés en implementación de sitio web de alta calidad.\nSe busca mejorar presencia digital y conversión de visitas en contactos.\nSe solicita una reunión para definir alcance, tiempos y presupuesto.",
  },
];

export function contactHref(p: Product) {
  const q = new URLSearchParams({ producto: p.name, objetivo: p.objective });
  return `/contacto?${q.toString()}`;
}

export const steps = [
  {
    title: "Nos contás el desafío",
    body: "Bajamos tu idea a objetivos concretos: qué querés resolver, para quién y con qué resultado esperado.",
  },
  {
    title: "Diseñamos una hoja de ruta",
    body: "Definimos qué construir primero, cómo medir impacto y qué versión te da valor real en semanas.",
  },
  {
    title: "Construimos con vos",
    body: "Integramos IA y software en tu operación con foco en adopción, no solo en tecnología.",
  },
  {
    title: "Volvete más efectivo",
    body: "Menos tareas manuales, mejor información para decidir y procesos más escalables.",
  },
];

export const clients = [
  { name: "abraChem", logo: "/clients/abrachem.png", width: 952, height: 158 },
  { name: "Radisson", logo: "/clients/radisson.png", width: 781, height: 347 },
  { name: "Nelcord", logo: "/clients/nelcord.png", width: 676, height: 171 },
  { name: "Florencia Sztern", logo: "/clients/florencia-sztern.png", width: 894, height: 674 },
];

export const faqs = [
  {
    q: "¿Cómo se inicia la contratación de un producto o proyecto?",
    a: "La solicitud se envía por el formulario de contacto; luego se define objetivo, prioridad y un plan concreto de implementación.",
  },
  {
    q: "¿Desarrollan proyectos personalizados para cada cliente?",
    a: "Sí. Diseñamos e implementamos soluciones a medida según el objetivo, los procesos y el contexto de cada empresa, integrando IA y software de forma personalizada.",
  },
  {
    q: "¿Cómo es el proceso de implementación?",
    a: "Fase 1: discovery y alcance. Fase 2: construcción y validación. Fase 3: despliegue operativo con seguimiento y mejora continua.",
  },
  {
    q: "¿En cuánto tiempo se observan resultados?",
    a: "Depende del nivel de personalización y del alcance de cada implementación. En soluciones de adopción rápida, los primeros resultados pueden verse en pocos días; en proyectos más personalizados e integrados, la implementación completa puede extenderse por varias semanas o algunos meses.",
  },
];

export type Member = {
  name: string;
  role: string;
  bio: string;
  /** Sin foto se muestran las iniciales. */
  photo?: string;
  linkedin?: string;
};

export const team: Member[] = [
  {
    name: "Guillermo Wajner",
    role: "Founder",
    bio: "Fundó Impronta para llevar IA y software a empresas que buscan resultados concretos. Lidera cada proyecto de punta a punta.",
  },
];

/** Roles que se suman al equipo; se muestran como lugares reservados en /nosotros. */
export const openRoles = [
  {
    role: "Diseño y branding",
    bio: "Va a encabezar el área de diseño y branding: identidad, marca y diseño de producto.",
  },
  {
    role: "Tecnología",
    bio: "Va a trabajar en arquitectura y desarrollo, codo a codo con Guillermo.",
  },
];

export const principles = [
  {
    title: "Pensar producto antes que tecnología",
    body: "Cada proyecto parte del problema de negocio, no de la herramienta de moda.",
  },
  {
    title: "Construir en ciclos cortos",
    body: "Iteramos rápido, medimos uso real y mejoramos con datos concretos.",
  },
  {
    title: "Calidad para escalar",
    body: "Diseñamos soluciones listas para crecer sin rehacer la base técnica.",
  },
];
