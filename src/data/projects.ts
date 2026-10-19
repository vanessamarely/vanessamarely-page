// Catálogo curado de repositorios: proyectos open source y código usado en charlas y talleres.
// El orden en el sitio es por última actualización (pushed_at), leída de la API de GitHub en el build
// (src/lib/github.ts). Un repo que GitHub no devuelve (p. ej. privado) no se muestra hasta que sea público.
//
// category: "open-source" (proyectos para la comunidad, abiertos a contribuciones)
//           "tool"        (herramientas y apps)
//           "talk"        (código y demos usados en charlas y talleres)

export type ProjectCategory = "open-source" | "tool" | "talk";

export type Project = {
  repo: string; // nombre en github.com/vanessamarely
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  demo?: string;
  docs?: string;
  talk?: string; // charla o taller donde se usó
  pendingPublic?: boolean; // privado por ahora: solo se muestra cuando GitHub lo devuelve como público
};

export const projects: Project[] = [
  // ---------- Charlas y talleres ----------
  {
    repo: "fluid-generative-ui",
    title: "Fast AI, Fluid UI",
    description: "Dos apps para la charla sobre UI generada por IA sin layout shifts ni latencia: performance, salidas estructuradas y WebMCP.",
    category: "talk",
    tags: ["IA", "Performance", "WebMCP"],
    talk: "DevFest Santo Domingo 2026",
  },
  {
    repo: "webmcp-action",
    title: "WebMCP in Action",
    description: "Demo de WebMCP, el estándar propuesto para que una página exponga sus funciones como herramientas a los agentes de IA.",
    category: "talk",
    tags: ["WebMCP", "IA"],
    demo: "https://web-two-xi-71.vercel.app",
    talk: "DevFest Quito 2026",
  },
  {
    repo: "presentacin-interact",
    pendingPublic: true,
    title: "Presentación interactiva",
    description: "Presentación web interactiva usada en charla técnica, con participación del público en tiempo real.",
    category: "talk",
    tags: ["Web", "IA"],
  },
  {
    repo: "agentic-web-starter",
    title: "Agentic Web Starter · codelabs GoFest",
    description:
      "Monorepo con todos los codelabs de GoFest Bogotá: cliente offline-first con Gemini Nano, orquestador multi-agente con Gemini Flash y una app de presentación tipo codelab.",
    category: "talk",
    tags: ["Gemini", "Agentes", "Codelab"],
    talk: "GoFest Bogotá 2026",
  },
  {
    repo: "multi-agent-workflow",
    title: "AI Travel Planner (Google ADK)",
    description: "Planificador de viajes full-stack con Google Agent Development Kit en TypeScript: agentes en paralelo y en secuencia.",
    category: "talk",
    tags: ["Gemini ADK", "React", "Node.js"],
    docs: "https://vanessamarely.github.io/multi-agent-workflow/slides/",
    talk: "Build with AI · GDG Quito 2026",
  },
  {
    repo: "travel-planner-multiagent",
    title: "Travel Planner multi-agente",
    description: "Versión con la API de Gemini y patrones de orquestación inspirados en ADK (ParallelAgent + SequentialAgent).",
    category: "talk",
    tags: ["Gemini", "Agentes"],
    demo: "https://travel-planner-multiagent.vercel.app",
    talk: "Build with AI · GDG Quito 2026",
  },
  {
    repo: "contextual-ai-panel",
    title: "Panel de ayuda contextual con Built-in AI",
    description: "Panel que resume la página y genera FAQs con las APIs Summarizer y Prompt del navegador, más View Transitions y Anchor Positioning.",
    category: "talk",
    tags: ["Built-in AI", "CSS"],
    demo: "https://contextual-ai-panel.vercel.app",
    talk: "Build with AI · GDG Santa Cruz 2026",
  },
  {
    repo: "build-with-ai-santa-cruz",
    title: "Build with AI Santa Cruz (slides)",
    description: "Presentación web del taller sobre Built-in AI y estándares modernos de CSS.",
    category: "talk",
    tags: ["Slides", "Built-in AI"],
    demo: "https://vanessamarely.github.io/build-with-ai-santa-cruz/",
    talk: "Build with AI · GDG Santa Cruz 2026",
  },
  {
    repo: "web-mcp-debugging",
    title: "Web MCP & Debugging (slides)",
    description: "Presentación web de 22 diapositivas sobre Web MCP y debugging moderno con IA.",
    category: "talk",
    tags: ["Slides", "MCP"],
    demo: "https://vanessamarely.github.io/web-mcp-debugging/",
    talk: "GDG Barranquilla 2026",
  },
  {
    repo: "webmcp-debugging-pre",
    pendingPublic: true,
    title: "WebMCP & Debugging: demo",
    description: "Demo de la charla sobre WebMCP y debugging con Chrome DevTools asistido por IA.",
    category: "talk",
    tags: ["WebMCP", "DevTools"],
  },
  {
    repo: "self-diagnosing-saas",
    pendingPublic: true,
    title: "Self-diagnosing SaaS",
    description: "App de ejemplo que se diagnostica a sí misma con herramientas de IA y DevTools.",
    category: "talk",
    tags: ["IA", "DevTools"],
  },
  {
    repo: "hypercart-lab",
    title: "HyperCart Lab",
    description: "E-commerce en React con problemas de rendimiento activables para practicar debugging con Chrome DevTools.",
    category: "talk",
    tags: ["DevTools", "Performance", "React"],
    demo: "https://hypercart-lab.vercel.app",
    talk: "Web MCP & Debugging · GDG Barranquilla 2026",
  },
  {
    repo: "hypercart-lab-chrome",
    title: "HyperCart Lab · Chrome",
    description: "Variante de HyperCart Lab para demos en vivo de Core Web Vitals en Chrome DevTools durante conferencias.",
    category: "talk",
    tags: ["DevTools", "Core Web Vitals"],
  },
  {
    repo: "chrome-devtools-work",
    title: "DevTools + IA en Acción",
    description: "App creada con GitHub Spark para practicar Chrome DevTools y sus nuevas funciones con IA.",
    category: "talk",
    tags: ["DevTools", "GitHub Spark", "IA"],
    demo: "https://chrome-devtools-work.vercel.app",
    talk: "MedellinJS 2025",
  },
  {
    repo: "github-workshop-guid",
    title: "Guía práctica de GitHub y Copilot",
    description: "Repositorios, ramas, pull requests, issues, workflows y GitHub Copilot explicados con ejercicios.",
    category: "talk",
    tags: ["GitHub", "GitHub Copilot"],
    demo: "https://github-workshop-guid.vercel.app",
    talk: "Mentoría Invima & Google AI Hackathon · GoFest Bogotá 2026",
  },
  {
    repo: "taller-github-copilot",
    title: "Taller de GitHub Copilot",
    description: "Módulos paso a paso para potenciar tu productividad con IA generativa: del autocompletado a los agentes.",
    category: "talk",
    tags: ["GitHub Copilot"],
  },
  {
    repo: "angular-kanban-workshop",
    title: "Kanban Board en Angular",
    description: "Workshop para crear un tablero Kanban repasando componentes, directivas, módulos, servicios, routing y CDK.",
    category: "talk",
    tags: ["Angular", "CDK"],
    talk: "ngConf Honduras 2021",
  },

  // ---------- Open source & comunidad ----------
  {
    repo: "recursos-frontend",
    title: "Recursos Frontend",
    description:
      "Guía colaborativa con recursos para aprender Frontend: cursos, documentación, herramientas, comunidades y más. Abierta a contribuciones.",
    category: "open-source",
    tags: ["Frontend", "Comunidad", "Astro"],
    demo: "https://vanessamarely.github.io/recursos-frontend/",
  },
  {
    repo: "profile-generator",
    title: "README Profile Generator",
    description: "Crea READMEs para tu perfil de GitHub con una interfaz drag & drop y vista previa en tiempo real, sin escribir Markdown.",
    category: "open-source",
    tags: ["GitHub", "TypeScript"],
    demo: "https://profile-generator-umber.vercel.app",
  },
  {
    repo: "ai-playbook-reposito",
    title: "AI Playbook",
    description: "Guía de referencia y paquete de ejemplo para estructurar agentes, skills, prompts, comandos y políticas en un repositorio.",
    category: "open-source",
    tags: ["IA", "Agentes"],
    demo: "https://ai-playbook-reposito.vercel.app",
  },
  {
    repo: "vscode-checksemantic",
    title: "Semantic HTML Checker",
    description: "Extensión de VS Code que detecta y ayuda a corregir problemas de semántica y accesibilidad en HTML según WCAG 2.2.",
    category: "open-source",
    tags: ["VS Code", "Accesibilidad"],
  },
  {
    repo: "metamorfosis-angular",
    title: "Metamorfosis de Angular",
    description:
      "Guía de talleres por niveles (oruga, crisálida, mariposa) para quienes empiezan con Angular. Participó en Hacktoberfest.",
    category: "open-source",
    tags: ["Angular", "Talleres", "Hacktoberfest"],
    talk: "She Codes Angular · 2020",
  },
  {
    repo: "angular-challenges",
    title: "Angular Challenges",
    description: "Gitbook con conceptos de Angular y retos prácticos en mini apps para aprender haciendo.",
    category: "open-source",
    tags: ["Angular", "Gitbook"],
  },

  // ---------- Herramientas ----------
  {
    repo: "job-tracker",
    title: "Job Tracker",
    description:
      "App para gestionar postulaciones (Next.js + Drizzle) que sirve como referencia de una configuración avanzada de GitHub Copilot: agentes, prompts, skills y specs.",
    category: "tool",
    tags: ["GitHub Copilot", "Next.js"],
  },
  {
    repo: "token-calculator-pro",
    title: "Token Calculator",
    description: "Estimador de tokens para prompts y respuestas de modelos de IA.",
    category: "tool",
    tags: ["IA", "LLM"],
    demo: "https://token-calculator-pro.vercel.app",
  },
  {
    repo: "bloom-journal-studio",
    pendingPublic: true,
    title: "Bloom Journal Studio",
    description: "Estudio digital para crear páginas de journaling.",
    category: "tool",
    tags: ["Journaling", "Diseño"],
  },
  {
    repo: "buddy-writer",
    title: "Buddy Writer",
    description: "App para escribir y mantener al día documentación técnica.",
    category: "tool",
    tags: ["React", "Documentación"],
    demo: "https://buddy-writer.vercel.app",
  },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  "open-source": "Open source",
  tool: "Herramientas",
  talk: "Charlas y talleres",
};

/** Projects to show, most recently updated first. Repos GitHub does not return (private) are hidden. */
export function visibleProjects(stats: Map<string, { pushedAt: string }>): Project[] {
  const known = stats.size > 0;
  return projects
    .filter((p) => (known ? stats.has(p.repo) : !p.pendingPublic))
    .sort((a, b) => (stats.get(b.repo)?.pushedAt ?? "").localeCompare(stats.get(a.repo)?.pushedAt ?? ""));
}
