// Charlas, talleres, paneles, mentorías y transmisiones en vivo.
// Fuente principal: Advocu (fecha, formato presencial/virtual y ciudad de cada actividad),
// complementada con GitHub Stars, el gist de comunidad (2018–2019) y el canal de YouTube.
//
// Para agregar una charla: añade una línea `t(fecha, tipo, título, evento, tags, [recursos], dónde)`.
// Recursos: slides(url) · video(idYouTube | url) · event(url) · post(url) · repo(nombre) · demo(url)
//
// Dónde: la clave de la ciudad en src/data/places.ts si fue presencial, u `on` si fue virtual.
// Solo las presenciales aparecen en el mapa. Las transmisiones en vivo (tipo "live") cuentan como online.

import type { PlaceKey } from "./places";
import type { Lang } from "../i18n";

export type TalkKind = "charla" | "taller" | "panel" | "mentoría" | "live";
export type ResourceType = "slides" | "video" | "event" | "post" | "repo" | "demo" | "codelab";
export type Resource = { type: ResourceType; url: string; label?: string }; // label replaces the default button text

export type Talk = {
  title: string;
  event: string;
  date: string; // YYYY-MM-DD
  kind: TalkKind;
  tags: string[];
  resources: Resource[];
  where?: PlaceKey | "online";
};

const slides = (url: string): Resource => ({ type: "slides", url });
const video = (idOrUrl: string): Resource => ({
  type: "video",
  url: idOrUrl.startsWith("http") ? idOrUrl : `https://www.youtube.com/watch?v=${idOrUrl}`,
});
const event = (url: string): Resource => ({ type: "event", url });
const post = (url: string): Resource => ({ type: "post", url });
const repo = (name: string): Resource => ({ type: "repo", url: `https://github.com/vanessamarely/${name}` });
const demo = (url: string): Resource => ({ type: "demo", url });
const codelab = (url: string): Resource => ({ type: "codelab", url });

// GoFest Bogotá 2026 (August): every session shares the agentic-web-starter repo, its codelab and the demos app.
// Each session has its own deck on the codelab site; demos open on their tab (#nano, #flash, #gemma).
// Codelab sections have their own links (#<section-id>); the button opens and names the session's section.
const gofestSite = "https://agentic-web-starter-codelab.web.app";
const gofestDemos = "https://agentic-web-starter-client.web.app";
const gofest = (deck?: string, tab = "", section?: { id: string; name: string }): Resource[] => [
  ...(deck ? [slides(`${gofestSite}/${deck}`)] : []),
  section
    ? { type: "codelab", url: `${gofestSite}/#${section.id}`, label: `Codelab · ${section.name}` }
    : codelab(gofestSite),
  demo(`${gofestDemos}/${tab}`),
  repo("agentic-web-starter"),
  event("https://gofest.com.co/"),
];

const t = (
  date: string,
  kind: TalkKind,
  title: string,
  eventName: string,
  tags: string[],
  resources: Resource[] = [],
  where?: PlaceKey | "online",
): Talk => ({ date, kind, title, event: eventName, tags, resources, where });

const on = "online" as const;

const gdg = (slug: string) => event(`https://gdg.community.dev/events/details/${slug}/`);

export const talks: Talk[] = [
  // ---------- 2026 ----------
  t("2026-10-24", "charla", "Web performance en la era de la UI generativa", "DevFest Guatemala City", ["Performance", "IA", "Core Web Vitals"], [
    slides("https://web-performance-gen-ui-slides.web.app/"),
    repo("web-performance-gen-ui"),
    demo("https://web-performance-gen-ui-demo.web.app"),
    gdg("google-gdg-cloud-guatemala-presents-devfest-guatemala-city-2026-1/cohost-gdg-guatemala"),
  ], "guatemala"),
  t("2026-10-10", "charla", "Fast AI, Fluid UI", "DevFest Santo Domingo", ["IA", "Performance", "WebMCP", "DevTools"], [
    slides("https://fluid-generative-ui-slides.web.app"),
    repo("fluid-generative-ui"),
    demo("https://fluid-generative-ui-demo.web.app"),
    gdg("google-gdg-santo-domingo-presents-devfest-santo-domingo-2026"),
  ], "santodomingo"),
  t("2026-10-07", "live", "IA fuera del mundo de tecnología", "YouTube Live", ["IA"], [video("Y2aR76Yuheo")]),
  t("2026-09-26", "charla", "WebMCP in Action", "DevFest Quito", ["WebMCP", "IA"], [
    slides("https://web-two-xi-71.vercel.app/slides/"),
    repo("webmcp-action"),
    demo("https://web-two-xi-71.vercel.app"),
    gdg("google-gdg-quito-presents-devfest-2026-innovating-together"),
  ], "quito"),
  t("2026-09-21", "live", "Cómo destacar y conseguir tu primer empleo como desarrollador", "YouTube Live", ["Carrera"], [video("buh8YUnFC9c")]),
  t("2026-09-14", "live", "3D, WebXR y Web3: la nueva era", "YouTube Live", ["WebXR", "3D"], [video("jlL55PsHCo4")]),
  t("2026-08-28", "charla", "Effective Prompting & Workflows with Gemini", "GoFest Bogotá", ["Gemini", "Prompting"], gofest(), "bogota"),
  t("2026-08-27", "charla", "Orchestrating Multi-Agent Workflows with Gemini Flash", "GoFest Bogotá", ["Agentes", "Gemini"], gofest("slides-orquestacion.html", "#flash", { id: "orquestando-multiagentes", name: "Orchestrating Multi-Agent Workflows" }), "bogota"),
  t("2026-08-27", "charla", "Interactive Web Apps with Gemini Nano & WebMCP", "GoFest Bogotá", ["Gemini Nano", "WebMCP"], gofest("slides-demo-1.html", "#nano", { id: "demo-1-nano", name: "Demo 1 · Gemini Nano + WebMCP" }), "bogota"),
  t("2026-08-26", "charla", "Local Agents with Gemma, Gemini Nano and WebMCP", "GoFest Bogotá", ["Gemma", "Gemini Nano", "WebMCP"], gofest("slides-agentes-locales.html", "#gemma", { id: "agentes-locales-webmcp", name: "Local Agents with Gemma" }), "bogota"),
  t("2026-08-26", "charla", "Building Agentic Apps with Gemini Flash and Nano", "GoFest Bogotá", ["IA", "Gemini", "Agentes"], gofest("slides.html"), "bogota"),
  t("2026-08-26", "mentoría", "Mentoría técnica: Invima & Google AI Hackathon", "GoFest Bogotá", ["IA", "Hackathon"], gofest(), "bogota"),
  t("2026-08-21", "charla", "Rapid Web Prototyping & Interactive Visuals with Google AI Studio", "GoFest Bogotá", ["AI Studio"], gofest(), "bogota"),
  t("2026-08-04", "live", "Software Factories y agentes de IA", "YouTube Live", ["IA", "Agentes"], [video("Wr51o9bK26M")]),
  t("2026-07-25", "charla", "Guía práctica de GitHub y GitHub Copilot", "Hackathon Colsubsidio · GDG Bogotá", ["GitHub", "GitHub Copilot"], [
    slides("https://github-workshop-guid.vercel.app/"),
    repo("github-workshop-guid"),
    gdg("google-gdg-bogota-presents-hackathon-impulsando-la-innovacion-con-colsubsidio-oportunidades-y-desafios"),
  ], "bogota"),
  t("2026-07-26", "charla", "GitHub Copilot: harness, loop engineering y agentes", "30X AI Devs", ["GitHub Copilot", "IA"], [video("P63s1uQkcCI")], on),
  t("2026-06-27", "charla", "Building Multi-Agent Workflows in the Web", "Build with AI · GDG Quito", ["IA", "Gemini ADK", "Node.js"], [
    slides("https://vanessamarely.github.io/multi-agent-workflow/slides/"),
    repo("multi-agent-workflow"),
    repo("travel-planner-multiagent"),
    demo("https://travel-planner-multiagent.vercel.app"),
    gdg("google-gdg-quito-presents-build-with-ai-epn"),
  ], "quito"),
  t("2026-05-30", "taller", "Construye un panel de ayuda contextual con IA", "Build with AI · GDG Santa Cruz", ["Built-in AI", "View Transitions", "CSS"], [
    slides("https://vanessamarely.github.io/build-with-ai-santa-cruz/"),
    repo("contextual-ai-panel"),
    demo("https://contextual-ai-panel.vercel.app"),
    gdg("google-gdg-santa-cruz-presents-hackathon-build-with-ai-crea-con-ia-en-santa-cruz"),
  ], "santacruz"),
  t("2026-05-23", "taller", "Web MCP and Debugging", "BarranquIA · GDG Barranquilla", ["DevTools", "MCP", "Core Web Vitals"], [
    slides("https://vanessamarely.github.io/web-mcp-debugging/"),
    repo("hypercart-lab"),
    demo("https://hypercart-lab.vercel.app"),
    gdg("google-gdg-barranquilla-presents-hackaton-barranqui-ia-build-with-ai"),
  ], "barranquilla"),
  t("2026-04-16", "live", "Web MCP", "YouTube Live", ["WebMCP"], [video("3_t9I00HksQ")]),
  t("2026-03-06", "charla", "AI in DevTools", "IWD Medellín · PionerasDev", ["DevTools", "IA"], [
    slides("https://www.canva.com/design/DAHDNtBV5Qg/KQ-bxJbmtwLE05xC2qweMA/view"),
    post("https://www.linkedin.com/pulse/break-pattern-iwd-medell%C3%ADn-2026-pionerasdev-rxeme/"),
  ], "medellin"),
  t("2026-03-05", "charla", "Web MCP y Debugging", "IWD · GDG Quito", ["DevTools", "MCP"], [gdg("google-gdg-quito-presents-iwd-by-gdg-quito")], on),
  t("2026-03-05", "live", "Spec-Driven Development (SDD)", "YouTube Live", ["IA", "SDD"], [video("xeDYyS9SWE4")]),
  t("2026-02-11", "charla", "While It Compiles: AI DevTools & Debugging", "YouTube Live", ["DevTools", "IA"], [video("https://www.youtube.com/live/MxhnumkBOEA")], on),
  t("2026-01-31", "charla", "Del editor al deploy: cómo la IA está cambiando el desarrollo web", "YouTube Live", ["IA", "Web"], [video("JwlcjlrsFXI")], on),

  // ---------- 2025 ----------
  t("2025-12-06", "charla", "Chrome DevTools With AI", "DevFest Bogotá", ["DevTools", "IA"], [
    slides("https://www.canva.com/design/DAG6aXrsY60/pA7LRRF0XGQM2Colv0sejA/view"),
    gdg("google-gdg-bogota-presents-devfest-bogota-2025/cohost-gdg-cloud-bogota"),
  ], "chia"),
  t("2025-11-29", "charla", "Chrome DevTools With AI", "DevFest Lima", ["DevTools", "IA"], [
    slides("https://www.canva.com/design/DAG5wIYoZog/-b5QUIEFVDquT1B4om6row/view"),
    gdg("google-gdg-callao-presents-devfest-lima-2025-community-edition"),
  ], "lima"),
  t("2025-11-22", "taller", "Build Your Portfolio with GitHub Copilot", "Break the Code · N-iX", ["GitHub Copilot", "GitHub Pages", "Codespaces"], [
    event("https://events.n-ix.com/break-the-code/"),
  ], "medellin"),
  t("2025-10-31", "charla", "Debugging Performance in a Galaxy Far, Far Away", "JSConf México", ["Performance", "DevTools", "JavaScript"], [
    slides("https://www.canva.com/design/DAGz2phzQIg/z7QUMLgtDDbHLhigWvWABw/view"),
    event("https://jsconfmx.org/speaker/x2fBU"),
  ], "guadalajara"),
  t("2025-10-31", "charla", "Debugging Performance", "Charla online", ["Performance", "DevTools"], [
    video("https://www.youtube.com/live/f24P1LfpBvM?t=19597"),
  ], on),
  t("2025-10-17", "taller", "Angular Fundamentals", "Sesión virtual", ["Angular"], [
    slides("https://www.canva.com/design/DAGfmf6I8lc/Gfl8u3OWNeZClC8rC2H2wQ/view"),
    repo("angular-cf-taller"),
    demo("https://angular-cf-taller.vercel.app"),
  ], on),
  t("2025-10-11", "taller", "DevTools + AI in Action", "MedellinJS · UPB", ["DevTools", "GitHub Spark", "IA"], [
    slides("https://www.canva.com/design/DAG1KUC0n_g/wIEPplcjRvVfBWbVA78b_Q/view"),
    repo("dev-tools-workshop"),
    event("https://www.meetup.com/medellinjs/events/311361059/"),
  ], "medellin"),
  t("2025-08-05", "panel", "Frontend status", "Código Facilito", ["Frontend"], [video("5cPktTcbHPY")], on),
  t("2025-08-02", "taller", "Workshop GitHub Copilot: crea un sitio web con IA", "Git Together Medellín", ["GitHub Copilot"], [
    event("https://www.meetup.com/gittogether-medellin/events/308372314/"),
  ], "medellin"),
  t("2025-07-23", "charla", "AI Beyond the Editor: Tools for the Full Software Development Lifecycle", "Código Facilito · Conf IA", ["IA", "DevOps"], [
    event("https://codigofacilito.com/conf-ia"),
  ], on),
  t("2025-06-07", "taller", "Building a Web Application with GitHub Copilot", "Git Together Medellín", ["GitHub Copilot", "VS Code"], [
    event("https://www.meetup.com/gittogether-medellin/events/308134048/"),
  ], "medellin"),
  t("2025-05-27", "live", "Así fue Google I/O 2025: mi experiencia como GDE", "YouTube", ["Google I/O"], [video("b2xRWM0_SQs")]),
  t("2025-04-30", "charla", "From Component to Conversation with AI", "React.js Medellín", ["React", "IA"], [
    event("https://www.meetup.com/react-js-medellin/events/307458705/"),
  ], "medellin"),
  t("2025-03-26", "charla", "Build your smart Agent with JavaScript", "MedellinJS", ["Agentes", "Gemini", "JavaScript"], [
    slides("https://www.canva.com/design/DAGi1sUGjjE/sDPnK9scApIKocd-mHxy6w/view"),
    repo("agent-js"),
    post("https://www.linkedin.com/feed/update/urn:li:activity:7312665281007374337/"),
  ], "medellin"),
  t("2025-03-15", "charla", "The Web Evolves: master the latest innovations", "IWD · GDG Hermosillo", ["HTML", "CSS", "Web"], [
    slides("https://www.canva.com/design/DAGhYnSvzBo/Vp1Vo-rna0BexPUMtfqRDQ/view"),
    gdg("google-gdg-hermosillo-presents-iwd-hermosillo"),
  ], "hermosillo"),
  t("2025-03-08", "taller", "SPA con Server-Side Rendering y Deferred Blocks", "Taller online", ["Angular", "SSR"], [
    slides("https://www.canva.com/design/DAGg0XETqjA/JfKqkvRKMAOPogf8U0-wSw/view"),
    repo("app-deffer-rick-morty"),
  ], on),
  t("2025-03-06", "live", "CafeCode: refactorizando mi carrera, de nanopartículas a la comunidad", "YouTube Live", ["Carrera"], [video("2gGzm7iNtsw")]),
  t("2025-02-25", "panel", "AI for Web Devs: Tools, Productivity, and Real-Life Experiences", "Panel online", ["IA", "GitHub Copilot"], [
    video("https://www.youtube.com/live/KyySpD_-jZ0"),
  ], on),
  t("2025-02-13", "live", "The Phoenix Project: lecciones de DevOps en la vida real", "YouTube Live", ["DevOps", "Libros"], [video("nyXdPmiGF-U")]),
  t("2025-01-10", "taller", "Cómo usar IA en el desarrollo Frontend", "Código Facilito · Futuro del Frontend", ["IA", "Frontend"], [
    slides("https://www.canva.com/design/DAGbwSmR3t8/BDJearJ8eRdsz5SuuEqEuQ/view"),
    event("https://codigofacilito.com/cursos/futuro-del-frontend"),
  ], on),

  // ---------- 2024 ----------
  t("2024-12-07", "charla", "JavaScript para una web accesible: una receta para la inclusión", "JSConf Chile", ["Accesibilidad", "JavaScript"], [
    slides("https://www.canva.com/design/DAGTxtgnUds/VwvpyhZ0I99LTOoKVK64-A/view"),
    event("https://jsconf.cl/"),
  ], "santiago"),
  t("2024-10-25", "charla", "Derribando barreras con JavaScript", "CityJS Medellín", ["Accesibilidad", "JavaScript"], [
    slides("https://www.canva.com/design/DAGRmJAIjBg/O6CvdNLMc6_DPmUKAOiaHw/view"),
    repo("demo-accessibility"),
    event("https://medellin.cityjsconf.org/"),
  ], "medellin"),
  t("2024-10-24", "charla", "Novedades de la Web que transformarán tu desarrollo", "DevFest Tabasco · GDG Villahermosa", ["HTML", "CSS", "Google I/O"], [
    slides("https://www.canva.com/design/DAGYjWrHZNM/5xytCKU8WGzZKLLbRUtqEw/view"),
    repo("web-news"),
    gdg("google-gdg-villahermosa-presents-devfest-2024-tabasco"),
  ], on),
  t("2024-10-12", "charla", "Construyendo el futuro: desarrollo web impulsado por IA", "Google LATAM Summit 2024", ["IA", "Web"], [
    slides("https://www.canva.com/design/DAGRlv9C568/jnFUn4Vb8649EEASdyZ_Zg/view"),
    event("https://rsvp.withgoogle.com/events/latamsummit2024/agenda"),
  ], "saopaulo"),
  t("2024-09-26", "live", "Performance en la Web", "YouTube Live", ["Performance"], [video("R5hBASwsEKQ")]),
  t("2024-09-24", "charla", "Derribando barreras con JavaScript", "Charla online", ["Accesibilidad", "JavaScript"], [
    slides("https://www.canva.com/design/DAGNZZ2ru5U/NZiWVuiKHUE2wZslVcYKdw/view"),
    video("aswwIfjajKg"),
  ], on),
  t("2024-09-21", "charla", "Construyendo el futuro: desarrollo web impulsado por IA", "Pereira Tech Day", ["IA", "Web"], [
    slides("https://www.canva.com/design/DAGROLKLalo/24EJvZ-twJKTpmme4mFmmw/view"),
    event("https://www.pereiratechtalks.com/302603058-pereira-tech-day/"),
  ], "pereira"),
  t("2024-09-19", "charla", "Models Marketplace", "GitHub Community", ["GitHub Models", "IA"], [
    post("https://www.linkedin.com/posts/vanessa-marely-aristizabal-angel_ma%C3%B1ana-jueves-19-de-septiembre-tenemos-activity-7242197013524623361-dP1u/"),
  ], "medellin"),
  t("2024-09-12", "live", "Multimodalidad para LLM", "YouTube Live", ["IA", "LLM"], [video("PFTKgTj5jC0")]),
  t("2024-09-05", "live", "De cero a developer: cómo un bootcamp me abrió las puertas del mundo tech", "YouTube Live", ["Carrera"], [video("Qykr9_rO_yU")]),
  t("2024-08-03", "charla", "Cooking a chat with IDX and Gemini", "Google I/O Extended Ecuador", ["Gemini", "IDX", "Firebase"], [
    slides("https://www.canva.com/design/DAGLuzpm_Wg/hMxbDv15wJ5iA36ITGSNNA/view"),
    repo("cooking-chat"),
    gdg("google-gdg-quito-presents-google-io-extended-ecuador-2024/cohost-gdg-quito"),
  ], "quito"),
  t("2024-07-27", "charla", "Project IDX and Gemini", "I/O Extended · GDG Sincelejo", ["Gemini", "IDX"], [slides("https://drive.google.com/file/d/1oNw375C5WjT-san3OkVQ66isL_KmxGIV/view"), video("https://www.youtube.com/live/lQpgEPhPxUE")], on),
  t("2024-07-13", "charla", "Cooking a chat with Google IDX and Gemini", "Google I/O Extended Cali", ["Gemini", "IDX", "Firebase"], [
    slides("https://www.canva.com/design/DAGKaDbMCM0/kci7pdQCP63Lsqf7KeRwVw/view"),
    repo("cooking-chat"),
    gdg("google-gdg-cali-presents-google-io-extended-cali-2024"),
  ], "cali"),
  t("2024-05-04", "charla", "Integrando la API de Gemini en React", "BarranquIA", ["Gemini", "React"], [
    slides("https://docs.google.com/presentation/d/1rEsfjHJ9TZfaLVpc2EvOfFwNYSsaVqjXifanhXuD-TA/edit?usp=sharing&resourcekey=0-9KauwM7GdgG1BtyaCta8oA"),
    repo("barranqui-ia"),
    demo("https://barranqui-ia.vercel.app"),
    post("https://vanessamarely.medium.com/gu%C3%ADa-para-construir-un-chat-con-la-api-gemini-ai-con-react-ac655702947b"),
    event("https://barranquiia.com/"),
  ], "barranquilla"),
  t("2024-04-29", "taller", "Integrando la API de Gemini en React", "Build with AI · GDG Guayaquil", ["Gemini", "React"], [slides("https://docs.google.com/presentation/d/1XaREdRcuHBPlvHwyv9WF4TlY87vA51__9ZeI8mca-r0/view?resourcekey=0-b_nCEIKPabBnfOsPP9B2JA"), 
    repo("gemini-chat"),
    demo("https://gemini-chat-mu.vercel.app"),
    post("https://vanessamarely.medium.com/c%C3%B3mo-crear-un-text-prompt-con-la-libreria-generative-ai-en-react-9c15b5107a53"),
  ], on),
  t("2024-03-12", "charla", "Optimizando el flujo de trabajo con GitHub Actions", "GitHub LATAM", ["GitHub Actions", "CI/CD"], [
    repo("githubactions"),
    event("https://www.meetup.com/es-ES/githublatam/events/299568786/"),
  ], on),
  t("2024-03-09", "charla", "Construyendo el futuro: desarrollo web impulsado por IA", "IWD · GDG Guatemala", ["IA", "Web"], [
    slides("https://www.canva.com/design/DAF-mZdHec4/iAPbltKbpDVrTotw1F4yBQ/view"),
    gdg("google-gdg-guatemala-presents-iwd-guatemala-2024/cohost-gdg-guatemala"),
  ], "guatemala"),
  t("2024-02-21", "charla", "Optimizando el rendimiento web a través de la accesibilidad", "Webinar Growketing", ["Performance", "Accesibilidad"], [
    slides("https://www.canva.com/design/DAF80TWsSS4/MZ6h2FnYlyQgotKl1z6jLg/view"),
    event("https://eventos.growketing.com/web-performance"),
  ], on),

  // ---------- 2023 ----------
  t("2023-12-02", "charla", "Siento la necesidad, la necesidad de velocidad", "DevFest Ica", ["Performance", "Core Web Vitals"], [
    slides("https://www.canva.com/design/DAF10gvgaKc/GFUl451pQ6hrCma7cY_15Q/view"),
    event("https://www.eventbrite.com/e/entradas-devfest-ica-718100236137"),
  ], "ica"),
  t("2023-12-02", "charla", "Velocidad en la Web: introducción para estudiantes de colegio", "DevFest Ica", ["Performance", "Web"], [
    event("https://www.eventbrite.com/e/entradas-devfest-ica-718100236137"),
  ], "ica"),
  t("2023-11-23", "live", "Experiencias en el DevFest", "YouTube Live", ["Comunidad"], [video("6BlV00dQwFk")]),
  t("2023-11-11", "charla", "Hablemos de la carga diferida en Angular v17", "Angular Bolivia", ["Angular", "Performance"], [
    post("https://twitter.com/angularBolivia/status/1723092285997425058"),
  ], on),
  t("2023-10-24", "mentoría", "Be-Me: mentoría de Next.js", "Be-Me", ["Next.js", "React"], [video("Fwd3IzZD62c")], "medellin"),
  t("2023-10-21", "charla", "Hábitos y comunicación: las herramientas de un desarrollador productivo", "Conferencia de comunidad", ["Carrera"], [
    post("https://www.instagram.com/reel/CyuPr6GRWQm/"),
  ], "medellin"),
  t("2023-10-07", "charla", "Siento la necesidad, la necesidad de velocidad", "Charla de comunidad", ["Performance", "Core Web Vitals"], [
    slides("https://www.canva.com/design/DAFv81525TA/QhMCQ_TWSczlhTXVIrzqnA/view"),
    post("https://www.instagram.com/p/CyTX-C8OD-m/"),
  ], "medellin"),
  t("2023-09-25", "live", "Novedades de Angular, PaLM API & Project IDX", "YouTube", ["Angular", "IA"], [video("Whn6_SNeNp4")]),
  t("2023-09-21", "mentoría", "Be-Me: mentorías de React (hooks, routing, Context API, Tailwind)", "Be-Me", ["React"], [
    repo("be-me"),
    video("iRJne9Dg1sE"),
    video("kmBoosnwGwQ"),
    video("yiVNn0yB4mg"),
  ], on),
  t("2023-08-15", "mentoría", "Mentoría de entrevistas técnicas web", "Mentoría", ["Carrera"], [], on),
  t("2023-08-04", "mentoría", "Mentoría de entrevistas técnicas", "Laboratoria", ["Carrera"], [
    post("https://www.linkedin.com/posts/vanessa-marely-aristizabal-angel_gracias-laboratoria-por-haberme-dado-la-oportunidad-activity-7105195816121683968-rCHt"),
  ], on),
  t("2023-07-29", "charla", "Core Web Vitals + INP", "Charla de comunidad", ["Performance", "Core Web Vitals"], [
    post("https://twitter.com/vanessamarely/status/1686531629928296448"),
  ], on),
  t("2023-07-29", "taller", "From Zero to Hero (bootcamp)", "Women Who Code · Gorilla Logic", ["JavaScript"], [
    repo("arrays-objects"),
    post("https://www.linkedin.com/posts/gorillalogic_womenintech-gorillalogic-fromzerotohero-activity-7090422565017440256--shQ"),
  ], "medellin"),
  t("2023-07-08", "live", "CafeCode: cómo van de la mano UX y el desarrollo de software", "YouTube Live", ["UX"], [video("TSmysSB9sOE")]),
  t("2023-06-11", "charla", "Métodos para manejar el estado en React", "Gorilla Logic", ["React"], [repo("state-management-react")], "medellin"),
  t("2023-05-30", "charla", "Novedades del Google I/O en Web y Angular", "GDG Medellín", ["Angular", "Google I/O"], [
    gdg("google-gdg-medellin-presents-git-y-algunas-novedades-del-google-io-ia-web-angular-y-otras-tecnologias"),
  ], "medellin"),
  t("2023-05-13", "mentoría", "DOM, CSSOM y BOM", "Women Who Code", ["JavaScript"], [repo("dom_practice")], "medellin"),
  t("2023-04-17", "live", "Angular vs React", "YouTube", ["Angular", "React"], [video("AL6NgiBD01k")]),
  t("2023-04-15", "mentoría", "Arrays y objetos en JavaScript", "Women Who Code", ["JavaScript"], [repo("arrays-objects")], "medellin"),
  t("2023-04-13", "live", "Cómo crear comunidad tech en un país al que migraste", "YouTube Live", ["Comunidad"], [video("rdjsagTYPZU")]),
  t("2023-03-28", "charla", "¿Por qué las habilidades blandas pueden frenar tu carrera?", "Charla online", ["Carrera"], [
    slides("https://www.canva.com/design/DAFebNgAgu4/UmnuvLQE_3eXWoxhNVlHTw/view"),
  ], on),
  t("2023-03-18", "live", "Mi camino como líder de comunidad", "YouTube Live", ["Comunidad"], [video("Mw-EXC3TiR0")]),
  t("2023-03-14", "mentoría", "Simulación de entrevistas", "Laboratoria", ["Carrera"], [], on),
  t("2023-03-11", "taller", "Workshop: crea tu primera app con React", "GDG Medellín", ["React"], [
    repo("taller-react-gdg"),
    video("d5r6j2hvf1s"),
    gdg("google-gdg-medellin-presents-workshop-crear-tu-primera-web-app-en-angularreactvue"),
  ], "medellin"),
  t("2023-03-09", "charla", "Vision board", "Charla online", ["Carrera"], [post("https://www.instagram.com/p/CpnRrY1OdwpfK0ROvdwHyO6XElU7-PsdaCrda00/")], on),
  t("2023-03-04", "live", "Curiosidades de JavaScript", "YouTube Live", ["JavaScript"], [video("lznqZBQv1Eo")]),
  t("2023-03-01", "live", "Prepárate para una entrevista técnica", "YouTube Live", ["Carrera"], [video("S_38KcFTN-4")]),
  t("2023-02-17", "charla", "Creemos una aplicación en React", "GDSC UNI", ["React"], [video("https://www.youtube.com/live/ItnNk0_pEi8")], on),
  t("2023-01-20", "live", "De developer a un rol de liderazgo: engineering management", "YouTube Live", ["Carrera"], [video("tB9Js_VqrFY")]),

  // ---------- 2022 ----------
  t("2022-12-12", "live", "Ser mamá en la industria de software", "YouTube Live", ["Diversidad"], [video("arJPXSL83Rk")]),
  t("2022-11-26", "charla", "Tips & trucos para usar las Developer Tools", "DevFest Campeche", ["DevTools"], [slides("https://docs.google.com/presentation/d/1pfygjy6P3zdM52JZUjaPpP3OS4YvRGmMvr3beBpqfqY/view?resourcekey=0-qjICiB5AD7wXNm-6haLvlw"), event("https://devfestcampeche.com/")], "campeche"),
  t("2022-10-31", "live", "Practiquemos JavaScript con el DOM y el CSSOM", "Bitácora de Código", ["JavaScript"], [
    video("8-d6uo3PD8U"),
    video("Q6RnOO-pkeA"),
    repo("bitacora-codigo"),
  ]),
  t("2022-09-15", "panel", "Latina Women polyglots in software development", "Octogatos Conf", ["Diversidad", "Comunidad"], [
    video("https://youtu.be/NRZJ_uV0h70?t=27171"),
  ], on),
  t("2022-09-15", "panel", "Comunidades tecnológicas en América Latina", "Octogatos Conf", ["Comunidad"], [video("https://youtu.be/NRZJ_uV0h70?t=29903")], on),
  t("2022-09-15", "panel", "Stars Chat", "Octogatos Conf", ["GitHub Stars", "Comunidad"], [video("https://youtu.be/NRZJ_uV0h70?t=36215")], on),
  t("2022-07-03", "live", "Bitácora de Código: HTML & CSS responsive (días 1 y 2)", "Bitácora de Código", ["HTML", "CSS"], [
    video("7Yqb5r3WNRM"),
    video("-gU4RsowduE"),
    repo("bitacora-codigo"),
  ]),
  t("2022-06-25", "live", "Charlas matutinas: curiosidades de HTML y CSS", "YouTube Live", ["HTML", "CSS"], [
    video("V3PRhkp5970"),
    video("cM6CbXuX1EU"),
    video("t4BzZ60EsV8"),
  ]),
  t("2022-06-11", "live", "Hablemos del roadmap en Frontend", "YouTube Live", ["Frontend", "Carrera"], [video("gNNRaeyvcXo")]),
  t("2022-05-24", "mentoría", "Road to GDE: mentoría en Web Technologies (3 sesiones)", "Road to GDE · Google", ["Web"], [], on),
  t("2022-05-21", "charla", "Web Vitals", "GDSC Fest Perú", ["Performance", "Core Web Vitals"], [slides("https://docs.google.com/presentation/d/1RgfSHA4c__EDfN1Y4l_gas5mQDoL_su_7LS5CM3EpMQ/view"), 
    video("https://www.facebook.com/watch/live/?v=683623102871140"),
  ], on),
  t("2022-04-23", "charla", "Síndromes del developer", "Charla online", ["Carrera"], [video("https://youtu.be/-K32CP_mEEY")], on),
  t("2022-04-20", "charla", "Try-n-catch: conociendo Angular", "GDG Xela", ["Angular"], [video("Za8ESXrQHwo")], on),
  t("2022-03-21", "charla", "Crea una app de React de 0 a deploy con GitHub Actions", "IWD · GDSC LATAM", ["React", "GitHub Actions"], [
    repo("demo-despliegue-react-iwd"),
    video("https://youtu.be/EAthMtbHxnk?t=3728"),
  ], on),
  t("2022-02-23", "panel", "State of JS", "Mesa redonda", ["JavaScript"], [video("https://www.twitch.tv/videos/1307757936")], on),
  t("2022-02-19", "charla", "¿Qué ventajas tengo al usar TypeScript en React?", "TSDay · ng-Bolivia", ["TypeScript", "React"], [
    event("https://tsday.ng-bolivia.org/"),
  ], on),
  t("2022-02-18", "charla", "Despliega tu aplicación con GitHub Actions", "Utopicode", ["GitHub Actions", "CI/CD"], [
    repo("demo-deploy"),
    repo("deploy-react-example"),
    video("fM8xgzT8d6M"),
  ], on),
  t("2022-02-14", "charla", "Desarrollo web y sus diferentes roles en la industria", "Universidad Autónoma de Ciudad Juárez", ["Carrera", "Web"], [
    event("https://bit.ly/3HGOdAv"),
  ], on),
  t("2022-02-11", "mentoría", "Mentoría: fundamentos de HTML", "Mentoría", ["HTML"], [], on),

  // ---------- 2021 ----------
  t("2021-10-28", "charla", "El síndrome del impostor: ¿qué es y cómo superarlo?", "GDSC UAEM Valle de México", ["Carrera"], [
    event("https://gdsc.community.dev/events/details/developer-student-clubs-universidad-autonoma-del-estado-de-mexico-cu-uaem-valle-de-mexico-presents-el-sindrome-del-impostor-que-es-y-como-superarlo/"),
  ], on),
  t("2021-10-14", "charla", "Aplicaciones web y su proceso de CI/CD (GitHub Actions)", "DevFest Golfo MX", ["GitHub Actions", "CI/CD"], [
    video("https://www.youtube.com/watch?v=PyLNJzuUegM&t=2668s"),
  ], on),
  t("2021-08-24", "charla", "Aplicaciones web: ¿librería o framework?", "Conexión SV", ["Web"], [event("https://www.conexion.sv/")], on),
  t("2021-06-01", "charla", "Angular in the Wonderland of the Best Practices", "Angular Global Summit 21", ["Angular"], [
    repo("angular-best-practices"),
    video("https://youtu.be/NTGtbbFG2SM?t=18938"),
  ], on),
  t("2021-05-27", "charla", "Despliegue de apps React y Angular con GitHub Actions", "Charla online", ["GitHub Actions", "Angular", "React"], [
    repo("deploy-angular-example"),
    video("mf6vSghZ3P8"),
  ], on),
  t("2021-04-24", "charla", "Arquitectura de nuestras apps", "Angular Bogotá", ["Angular", "Arquitectura"], [video("https://youtu.be/CI_fO3NZf_g?t=193")], on),
  t("2021-03-25", "charla", "Creando aplicaciones web", "Charla online", ["Web"], [video("eqPra5Qea2M")], on),
  t("2021-03-15", "taller", "Taller de React", "Comfeco", ["React"], [video("gA8R5nyayxI"), video("veId2d1L39M")], on),
  t("2021-03-12", "charla", "Tips para conseguir un buen trabajo como dev", "IWD LATAM", ["Carrera"], [slides("https://docs.google.com/presentation/d/1N67EDYSadYEychVqABIa-9D6kj-_5vEO0F-Sm4TPJNo/view"), video("https://youtu.be/6wiCxQgVnn4?t=10651")], on),
  t("2021-03-10", "charla", "Desde los fundamentos en Angular", "Angular Bolivia", ["Angular"], [
    video("https://www.youtube.com/watch?v=wnksvWJrKxI&t=2925s"),
  ], on),
  t("2021-03-06", "taller", "Workshop: Kanban Board en Angular", "ngConf Honduras", ["Angular"], [
    repo("angular-kanban-workshop"),
    video("https://youtu.be/cASsVnSDr5s"),
  ], on),

  // ---------- 2020 ----------
  t("2020-12-10", "mentoría", "Mentoría Frontend para mujeres", "Mentoría", ["Frontend"], [], on),
  t("2020-11-20", "taller", "Angular Workshop: componentes, módulos y routing", "Taller online", ["Angular"], [], on),
  t("2020-07-18", "taller", "Metamorfosis de Angular: niveles oruga, crisálida y mariposa", "She Codes Angular", ["Angular"], [
    repo("metamorfosis-angular"),
  ], on),
  t("2020-04-16", "charla", "Contando una historia sobre JavaScript", "Charla online", ["JavaScript"], [slides("https://drive.google.com/file/d/1SfSK8Q1plgr773xliWUDJDkJ8DUKZPhy/view"), video("fIVTX-ayKXg")], on),

  // ---------- 2019 ----------
  t("2019-11-09", "taller", "She Codes Angular Workshop", "She Codes Angular", ["Angular"], [
    event("https://www.meetup.com/She-Codes-Angular/events/264380822/"),
  ], "medellin"),
  t("2019-11-09", "charla", "Intro to Angular", "She Codes Angular", ["Angular"], [event("https://www.meetup.com/She-Codes-Angular/events/264380822/")], "medellin"),
  t("2019-10-19", "panel", "Panel de expertos", "JSConf Colombia", ["Frontend"], [event("https://jsconf.co/")], "medellin"),
  t("2019-10-18", "charla", "Contando una historia", "JSConf Colombia", ["JavaScript", "Storytelling"], [slides("https://drive.google.com/file/d/1r4WCPS5ji0eV-JAaBldM4YI0rEFQY8X-/view"), event("https://jsconf.co/")], "medellin"),
  t("2019-09-14", "taller", "Angular: componentes, directivas y routing", "Taller", ["Angular"], [post("https://www.instagram.com/p/B2MVCkZnamH/")], "medellin"),
  t("2019-09-14", "charla", "Introducción a Angular: componentes, directivas y routing", "Charla", ["Angular"], [post("https://www.instagram.com/p/B2MVCkZnamH/")], "medellin"),
  t("2019-09-07", "charla", "Frontend & Backend en la Web", "ITM Medellín", ["Web"], [slides("https://tinyurl.com/y3qx2e3l")], "medellin"),
  t("2019-07-13", "charla", "Google Experiments", "GDG Medellín Anniversary", ["Google"], [
    slides("https://tinyurl.com/y3m237q6"),
    event("https://www.meetup.com/GDG-Medellin/events/261767850/"),
  ], "medellin"),
  t("2019-05-15", "charla", "Angular", "Google I/O Extended Medellín", ["Angular"], [
    slides("https://tinyurl.com/y3fb9cj4"),
    event("https://www.meetup.com/GDG-Medellin/events/260735780/"),
  ], "medellin"),
  t("2019-04-27", "charla", "Los retos de crear una comunidad de chicas", "WTM Summit LATAM · Argentina", ["Comunidad", "Diversidad"], [
    slides("https://tinyurl.com/y4wh7ycx"),
  ], "buenosaires"),
  t("2019-03-05", "charla", "React Reconciliation", "React Dev Week · Globant", ["React"], [slides("https://tinyurl.com/yxkpzjpu"), video("F_62DS6CcGg")], "medellin"),

  // ---------- 2018 ----------
  t("2018-09-06", "charla", "Mystical Art in Angular: Beyond the code", "NgColombia", ["Angular"], [
    slides("https://tinyurl.com/y6pk8fn8"),
    video("bKjhLi-_KYw"),
  ], "medellin"),
  t("2018-09-04", "charla", "SVG y CSS", "CSS Medellín", ["SVG", "CSS"], [
    slides("https://slides.com/vanessamarely/svg-css"),
    post("https://medium.com/@vanessamarely/svg-dcdb4f2aba4a"),
  ], "medellin"),
  t("2018-09-01", "mentoría", "NgGirls Colombia", "NgGirls", ["Angular", "Diversidad"], [repo("ngGirls-col")], "medellin"),
  t("2018-07-08", "charla", "Design for Devs", "Pioneras Dev", ["Diseño"], [slides("https://slides.com/vanessamarely/design-for-devs")], "medellin"),
  t("2018-07-07", "charla", "Angular 6 y Material CDK", "GDG Medellín Anniversary", ["Angular"], [
    slides("https://tinyurl.com/y3h8st9b"),
    repo("cdk-tree"),
    event("https://www.meetup.com/GDG-Medellin/events/250544591/"),
  ], "medellin"),
  t("2018-06-02", "charla", "SVG y CSS", "Pioneras Dev", ["SVG", "CSS"], [
    slides("https://slides.com/vanessamarely/svg-css"),
    event("https://www.meetup.com/PionerasDevelopers/events/251104838/"),
  ], "medellin"),
  t("2018-04-24", "charla", "Angular Material CDK", "Angular Week · Globant", ["Angular"], [
    slides("https://slides.com/vanessamarely/angular-week-2018-3"),
    repo("angular-material-cdk"),
    video("62EtV33NWmc"),
    post("https://medium.com/@vanessamarely/angular-material-cdk-60520fe28093"),
  ], "medellin"),
];

// Comunidades en las que participé (ya no soy parte activa). Años según GitHub Stars, el gist y Advocu.
export const communities: { name: string; role: Record<Lang, string>; years: string; url?: string }[] = [
  { name: "GitTogether Medellín", role: { es: "Co-organizadora · comunidad de GitHub", en: "Co-organizer · GitHub community" }, years: "2024 – 2025", url: "https://www.meetup.com/gittogether-medellin/" },
  { name: "JSConf Colombia", role: { es: "Co-organizadora", en: "Co-organizer" }, years: "2023", url: "https://www.jsconf.co/" },
  { name: "GDG Medellín", role: { es: "Organizadora", en: "Organizer" }, years: "2018 – 2023", url: "https://gdg.community.dev/gdg-medellin/" },
  { name: "DevFest Medellín", role: { es: "Organizadora", en: "Organizer" }, years: "2018 – 2022" },
  { name: "She Codes Angular", role: { es: "Organizadora y mentora", en: "Organizer and mentor" }, years: "2019 – 2020", url: "https://www.meetup.com/She-Codes-Angular/" },
  { name: "Women Techmakers", role: { es: "Embajadora · eventos con GDG Medellín", en: "Ambassador · events with GDG Medellín" }, years: "2019 – 2025" },
  { name: "NgGirls Colombia", role: { es: "Organizadora y mentora", en: "Organizer and mentor" }, years: "2018" },
];

export const resourceLabel: Record<Lang, Record<ResourceType, string>> = {
  es: { slides: "Slides", video: "Video", event: "Evento", post: "Post", repo: "Repo", demo: "Demo", codelab: "Codelab" },
  en: { slides: "Slides", video: "Video", event: "Event", post: "Post", repo: "Repo", demo: "Demo", codelab: "Codelab" },
};

export const kindLabel: Record<Lang, Record<TalkKind, string>> = {
  es: { charla: "Charla", taller: "Taller", panel: "Panel", mentoría: "Mentoría", live: "En vivo" },
  en: { charla: "Talk", taller: "Workshop", panel: "Panel", mentoría: "Mentoring", live: "Live" },
};

// Generic event names (used when the event has no proper name) in English. Real event names stay as they are.
const genericEventEn: Record<string, string> = {
  "Charla": "Talk",
  "Charla online": "Online talk",
  "Charla técnica": "Tech talk",
  "Charla de comunidad": "Community talk",
  "Conferencia de comunidad": "Community conference",
  "Panel": "Panel",
  "Panel online": "Online panel",
  "Panel de expertos": "Expert panel",
  "Mesa redonda": "Round table",
  "Sesión virtual": "Virtual session",
  "Taller": "Workshop",
  "Taller online": "Online workshop",
  "Mentoría": "Mentoring",
};
export const eventLabel = (lang: Lang, name: string) => (lang === "en" ? (genericEventEn[name] ?? name) : name);

// Live streams are always online; everything else carries its own location (or none if unknown).
const withPlace = (talk: Talk): Talk => (talk.where || talk.kind !== "live" ? talk : { ...talk, where: on });

export const sortedTalks = talks.map(withPlace).sort((a, b) => b.date.localeCompare(a.date));

// Resumen de impacto tomado de Advocu (GDE). Actualízalo a mano cuando cambie.
export const impact: { value: number; label: Record<Lang, string>; detail: Record<Lang, string> }[] = [
  { value: 77, label: { es: "charlas", en: "talks" }, detail: { es: "11.4k asistentes", en: "11.4k attendees" } },
  { value: 21, label: { es: "talleres", en: "workshops" }, detail: { es: "908 asistentes", en: "908 attendees" } },
  { value: 16, label: { es: "mentorías", en: "mentoring sessions" }, detail: { es: "186 personas", en: "186 people" } },
  { value: 122, label: { es: "contenidos", en: "pieces of content" }, detail: { es: "72.8k lectores", en: "72.8k readers" } },
];
