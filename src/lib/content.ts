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
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export const heroWords = ["IA", "Software"];

export type Objective =
  | "Construir marca"
  | "Software a medida"
  | "Automatizar procesos"
  | "Presencia digital";

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  objective: Objective;
  /** Frase para el selector "Quiero…" de la home. */
  intent: string;
  description: string;
  /** Resultado que se lleva el cliente (cualitativo). */
  outcome: string;
  features: string[];
  cta: string;
  /** Mensaje modelo que se precarga en el formulario de contacto. */
  template: string;
};

export const services: Service[] = [
  {
    slug: "branding",
    name: "Branding y diseño audiovisual",
    short: "Branding",
    tagline: "Identidad de marca",
    objective: "Construir marca",
    intent: "construir mi marca",
    description:
      "Identidad visual, guía de marca y contenido audiovisual para que tu empresa se vea igual de bien en cada canal.",
    outcome: "Una marca coherente en cada pieza",
    features: ["Identidad visual", "Guía de marca", "Contenido audiovisual", "Piezas para redes"],
    cta: "Construir mi marca",
    template:
      "Interés en Branding y diseño audiovisual.\nSe busca construir o renovar la identidad de marca y su contenido audiovisual.\nSe solicita una reunión para definir alcance, tiempos y presupuesto.",
  },
  {
    slug: "software-interno",
    name: "Software de uso interno",
    short: "Software interno",
    tagline: "Herramientas a medida",
    objective: "Software a medida",
    intent: "tener software a medida",
    description:
      "Sistemas y herramientas internas hechas para tu equipo: lo que hoy vive en planillas y mails, en un solo lugar.",
    outcome: "Una herramienta hecha para tu forma de trabajar",
    features: ["Paneles y reportes", "Gestión de datos", "Integración con tus sistemas", "Accesos por rol"],
    cta: "Desarrollar mi software",
    template:
      "Interés en Software de uso interno.\nSe busca una herramienta a medida para ordenar procesos y datos del equipo.\nSe solicita una propuesta con alcance, tiempos y próximos pasos.",
  },
  {
    slug: "automatizaciones",
    name: "Automatización de procesos",
    short: "Automatizaciones",
    tagline: "Procesos más rápidos",
    objective: "Automatizar procesos",
    intent: "automatizar procesos",
    description:
      "Diseñamos y desarrollamos automatismos con IA y software para acelerar tareas repetitivas y reducir errores.",
    outcome: "Menos tareas manuales y menos errores",
    features: ["Relevamiento de procesos", "Flujos automáticos", "IA aplicada", "Integración entre herramientas"],
    cta: "Automatizar mis procesos",
    template:
      "Interés en Automatización de procesos.\nSe busca reducir tareas manuales y acelerar procesos repetitivos.\nSe solicita una propuesta con alcance, tiempos y próximos pasos.",
  },
  {
    slug: "paginas-web",
    name: "Diseño y desarrollo web",
    short: "Páginas web",
    tagline: "Presencia digital",
    objective: "Presencia digital",
    intent: "ganar presencia digital",
    description:
      "Landing pages, sitios institucionales y e-commerce, diseñados para convertir visitas en clientes.",
    outcome: "Un sitio que convierte visitas en clientes",
    features: ["Landing pages", "Sitios web", "E-commerce", "Posicionamiento en buscadores"],
    cta: "Hacer mi página web",
    template:
      "Interés en Diseño y desarrollo web.\nSe busca una landing, sitio o e-commerce para mejorar la presencia digital y la conversión.\nSe solicita una reunión para definir alcance, tiempos y presupuesto.",
  },
];

export function contactHref(s: Service) {
  const q = new URLSearchParams({ servicio: s.name, objetivo: s.objective });
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

export type Client = { name: string; logo: string; width: number; height: number };

/**
 * Logos para la sección "Empresas con las que trabajamos" del inicio.
 * Vacía, la sección no se muestra. Cada logo va en /public/clients.
 */
export const clients: Client[] = [];

export const faqs = [
  {
    q: "¿Cómo se inicia la contratación de un servicio o proyecto?",
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
  {
    name: "Nombre Apellido",
    role: "Dirección de Diseño y Branding",
    bio: "Encabeza el área de diseño y branding: identidad visual, guía de marca y contenido audiovisual de cada proyecto.",
  },
  {
    name: "Nombre Apellido",
    role: "Desarrollo de software",
    bio: "Construye software interno y automatizaciones junto a Guillermo, con foco en arquitectura, calidad y escalabilidad.",
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
