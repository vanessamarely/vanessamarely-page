// Charlas, talleres, paneles, mentorías y transmisiones en vivo.
// Fuentes: GitHub Stars (2019–2026), gist de comunidad (2018–2019), Advocu (GDE) y el canal de YouTube.
// En las charlas que solo aparecen en Advocu, la fecha es la del registro (suele ser unos días después del evento).
//
// Para agregar una charla: añade una línea `t(fecha, tipo, título, evento, tags, [recursos])`.
// Recursos: slides(url) · video(idYouTube | url) · event(url) · post(url) · repo(nombre) · demo(url)

export type TalkKind = "charla" | "taller" | "panel" | "mentoría" | "live";
export type ResourceType = "slides" | "video" | "event" | "post" | "repo" | "demo";
export type Resource = { type: ResourceType; url: string };

export type Talk = {
  title: string;
  event: string;
  date: string; // YYYY-MM-DD
  kind: TalkKind;
  tags: string[];
  resources: Resource[];
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

const t = (date: string, kind: TalkKind, title: string, eventName: string, tags: string[], resources: Resource[] = []): Talk => ({
  date,
  kind,
  title,
  event: eventName,
  tags,
  resources,
});

const gdg = (slug: string) => event(`https://gdg.community.dev/events/details/${slug}/`);

export const talks: Talk[] = [
  // ---------- 2026 ----------
  t("2026-10-10", "charla", "Fast AI, Fluid UI", "DevFest Santo Domingo", ["IA", "Performance", "WebMCP", "DevTools"], [
    repo("fluid-generative-ui"),
    gdg("google-gdg-santo-domingo-presents-devfest-santo-domingo-2026"),
  ]),
  t("2026-10-07", "live", "IA fuera del mundo de tecnología", "YouTube Live", ["IA"], [video("Y2aR76Yuheo")]),
  t("2026-09-28", "charla", "WebMCP in Action", "DevFest Quito", ["WebMCP", "IA"], [repo("webmcp-action"), demo("https://web-two-xi-71.vercel.app")]),
  t("2026-09-21", "live", "Cómo destacar y conseguir tu primer empleo como desarrollador", "YouTube Live", ["Carrera"], [video("buh8YUnFC9c")]),
  t("2026-09-14", "live", "3D, WebXR y Web3: la nueva era", "YouTube Live", ["WebXR", "3D"], [video("jlL55PsHCo4")]),
  t("2026-09-01", "charla", "Building Agentic Apps with Gemini Flash and Nano", "GoFest Bogotá", ["IA", "Gemini", "Agentes"], [repo("agentic-web-starter")]),
  t("2026-09-01", "charla", "Local Agents with Gemma, Gemini Nano and WebMCP", "GoFest Bogotá", ["Gemma", "Gemini Nano", "WebMCP"]),
  t("2026-09-01", "charla", "Orchestrating Multi-Agent Workflows with Gemini Flash", "GoFest Bogotá", ["Agentes", "Gemini"]),
  t("2026-09-01", "charla", "Interactive Web Apps with Gemini Nano & WebMCP", "GoFest Bogotá", ["Gemini Nano", "WebMCP"]),
  t("2026-09-01", "charla", "Effective Prompting & Workflows with Gemini", "GoFest Bogotá", ["Gemini", "Prompting"]),
  t("2026-09-01", "charla", "Rapid Web Prototyping & Interactive Visuals with Google AI Studio", "GoFest Bogotá", ["AI Studio"]),
  t("2026-09-01", "mentoría", "Mentoría técnica: Invima & Google AI Hackathon", "GoFest Bogotá", ["IA", "Hackathon"]),
  t("2026-08-04", "live", "Software Factories y agentes de IA", "YouTube Live", ["IA", "Agentes"], [video("Wr51o9bK26M")]),
  t("2026-08-02", "charla", "Orchestrating Multi-Agent", "Sesión técnica", ["Agentes", "IA"], [repo("multi-agent-workflow")]),
  t("2026-07-24", "live", "GitHub Copilot: harness, loop engineering y agentes", "Live stream", ["GitHub Copilot", "IA"]),
  t("2026-06-26", "charla", "Building Multi-Agent Workflows in the Web", "Build with AI · GDG Quito", ["IA", "Gemini ADK", "Node.js"], [
    repo("multi-agent-workflow"),
    repo("travel-planner-multiagent"),
    demo("https://travel-planner-multiagent.vercel.app"),
    gdg("google-gdg-quito-presents-build-with-ai-epn"),
  ]),
  t("2026-05-29", "taller", "Construye un panel de ayuda contextual con IA", "Build with AI · GDG Santa Cruz", ["Built-in AI", "View Transitions", "CSS"], [
    slides("https://vanessamarely.github.io/build-with-ai-santa-cruz/"),
    repo("contextual-ai-panel"),
    demo("https://contextual-ai-panel.vercel.app"),
    gdg("google-gdg-santa-cruz-presents-hackathon-build-with-ai-crea-con-ia-en-santa-cruz"),
  ]),
  t("2026-05-22", "taller", "Web MCP and Debugging", "BarranquIA · GDG Barranquilla", ["DevTools", "MCP", "Core Web Vitals"], [
    slides("https://vanessamarely.github.io/web-mcp-debugging/"),
    repo("hypercart-lab"),
    demo("https://hypercart-lab.vercel.app"),
    gdg("google-gdg-barranquilla-presents-hackaton-barranqui-ia-build-with-ai"),
  ]),
  t("2026-04-16", "live", "Web MCP", "YouTube Live", ["WebMCP"], [video("3_t9I00HksQ")]),
  t("2026-03-05", "charla", "AI in DevTools", "IWD Medellín · PionerasDev", ["DevTools", "IA"], [
    post("https://www.linkedin.com/pulse/break-pattern-iwd-medell%C3%ADn-2026-pionerasdev-rxeme/"),
  ]),
  t("2026-03-05", "live", "Spec-Driven Development (SDD)", "YouTube Live", ["IA", "SDD"], [video("xeDYyS9SWE4")]),
  t("2026-03-04", "charla", "Web MCP y Debugging", "IWD · GDG Quito", ["DevTools", "MCP"], [gdg("google-gdg-quito-presents-iwd-by-gdg-quito")]),
  t("2026-02-13", "charla", "While It Compiles: AI DevTools & Debugging", "Charla técnica", ["DevTools", "IA"]),
  t("2026-01-31", "live", "Del editor al deploy: cómo la IA está cambiando el desarrollo web", "YouTube Live", ["IA", "Web"], [video("JwlcjlrsFXI")]),

  // ---------- 2025 ----------
  t("2025-12-08", "charla", "Chrome DevTools With AI", "DevFest Bogotá", ["DevTools", "IA"]),
  t("2025-12-02", "charla", "Chrome DevTools With AI", "DevFest Lima", ["DevTools", "IA"]),
  t("2025-11-21", "taller", "Build Your Portfolio with GitHub Copilot", "Break the Code · N-iX", ["GitHub Copilot", "GitHub Pages", "Codespaces"], [
    event("https://events.n-ix.com/break-the-code/"),
  ]),
  t("2025-11-07", "charla", "Debugging Performance", "Charla técnica", ["Performance", "DevTools"]),
  t("2025-10-30", "charla", "Debugging Performance in a Galaxy Far, Far Away", "JSConf México", ["Performance", "DevTools", "JavaScript"], [
    event("https://jsconfmx.org/speaker/x2fBU"),
  ]),
  t("2025-10-20", "taller", "Angular Fundamentals", "Sesión virtual", ["Angular"], [repo("angular-cf-taller"), demo("https://angular-cf-taller.vercel.app")]),
  t("2025-10-10", "taller", "DevTools + AI in Action", "MedellinJS · UPB", ["DevTools", "GitHub Spark", "IA"], [
    repo("dev-tools-workshop"),
    event("https://www.meetup.com/medellinjs/events/311361059/"),
  ]),
  t("2025-08-05", "panel", "Frontend status", "Panel", ["Frontend"]),
  t("2025-08-01", "taller", "Workshop GitHub Copilot: crea un sitio web con IA", "Git Together Medellín", ["GitHub Copilot"], [
    event("https://www.meetup.com/gittogether-medellin/events/308372314"),
  ]),
  t("2025-07-01", "charla", "AI Beyond the Editor: Tools for the Full Software Development Lifecycle", "Charla técnica", ["IA", "DevOps"]),
  t("2025-06-06", "taller", "Building a Web Application with GitHub Copilot", "Git Together Medellín", ["GitHub Copilot", "VS Code"], [
    event("https://www.meetup.com/gittogether-medellin/events/308134048/"),
  ]),
  t("2025-05-27", "live", "Así fue Google I/O 2025: mi experiencia como GDE", "YouTube", ["Google I/O"], [video("b2xRWM0_SQs")]),
  t("2025-05-01", "charla", "From Component to Conversation with AI", "Comunidad React.js", ["React", "IA"]),
  t("2025-03-31", "charla", "Build your smart Agent with JavaScript", "MedellinJS", ["Agentes", "Gemini", "JavaScript"], [repo("agent-js")]),
  t("2025-03-17", "charla", "The Web Evolves: master the latest innovations", "Charla técnica", ["HTML", "CSS", "Web"]),
  t("2025-03-12", "taller", "SPA con Server-Side Rendering y Deferred Blocks", "Taller", ["Angular", "SSR"], [repo("app-deffer-rick-morty")]),
  t("2025-03-06", "live", "CafeCode: refactorizando mi carrera, de nanopartículas a la comunidad", "YouTube Live", ["Carrera"], [video("2gGzm7iNtsw")]),
  t("2025-02-24", "panel", "AI for Web Devs: Tools, Productivity, and Real-Life Experiences", "Panel online", ["IA", "GitHub Copilot"], [
    video("https://www.youtube.com/live/KyySpD_-jZ0"),
  ]),
  t("2025-02-13", "live", "The Phoenix Project: lecciones de DevOps en la vida real", "YouTube Live", ["DevOps", "Libros"], [video("nyXdPmiGF-U")]),
  t("2025-01-09", "charla", "Cómo usar IA en el desarrollo Frontend", "Código Facilito · Futuro del Frontend", ["IA", "Frontend"], [
    event("https://codigofacilito.com/cursos/futuro-del-frontend"),
  ]),

  // ---------- 2024 ----------
  t("2024-12-11", "charla", "JavaScript para una web accesible: una receta para la inclusión", "Charla técnica", ["Accesibilidad", "JavaScript"]),
  t("2024-10-24", "charla", "Derribando barreras con JavaScript", "CityJS Medellín", ["Accesibilidad", "JavaScript"], [
    repo("demo-accessibility"),
    event("https://medellin.cityjsconf.org/"),
  ]),
  t("2024-10-23", "charla", "Novedades de la Web que transformarán tu desarrollo", "DevFest Tabasco · GDG Villahermosa", ["HTML", "CSS", "Google I/O"], [
    repo("web-news"),
    gdg("google-gdg-villahermosa-presents-devfest-2024-tabasco"),
  ]),
  t("2024-10-11", "charla", "Construyendo el futuro: desarrollo web impulsado por IA", "Google LATAM Summit 2024", ["IA", "Web"], [
    event("https://rsvp.withgoogle.com/events/latamsummit2024/agenda"),
  ]),
  t("2024-09-26", "charla", "Construyendo el futuro: desarrollo web impulsado por IA", "Pereira Tech Day", ["IA", "Web"], [
    event("https://www.pereiratechtalks.com/302603058-pereira-tech-day/"),
  ]),
  t("2024-09-26", "live", "Performance en la Web", "YouTube Live", ["Performance"], [video("R5hBASwsEKQ")]),
  t("2024-09-23", "charla", "Derribando barreras con JavaScript", "Charla online", ["Accesibilidad", "JavaScript"], [video("aswwIfjajKg")]),
  t("2024-09-18", "charla", "Models Marketplace", "GitHub Community", ["GitHub Models", "IA"], [
    post("https://www.linkedin.com/posts/vanessa-marely-aristizabal-angel_ma%C3%B1ana-jueves-19-de-septiembre-tenemos-activity-7242197013524623361-dP1u/"),
  ]),
  t("2024-09-12", "live", "Multimodalidad para LLM", "YouTube Live", ["IA", "LLM"], [video("PFTKgTj5jC0")]),
  t("2024-09-05", "live", "De cero a developer: cómo un bootcamp me abrió las puertas del mundo tech", "YouTube Live", ["Carrera"], [video("Qykr9_rO_yU")]),
  t("2024-08-02", "charla", "Cooking a chat with IDX and Gemini", "Google I/O Extended Ecuador", ["Gemini", "IDX", "Firebase"], [
    repo("cooking-chat"),
    gdg("google-gdg-quito-presents-google-io-extended-ecuador-2024/cohost-gdg-quito"),
  ]),
  t("2024-07-26", "charla", "Project IDX and Gemini", "I/O Extended · GDG Sincelejo", ["Gemini", "IDX"], [video("https://www.youtube.com/live/lQpgEPhPxUE")]),
  t("2024-07-12", "charla", "Cooking a chat with Google IDX and Gemini", "Google I/O Extended Cali", ["Gemini", "IDX", "Firebase"], [
    repo("cooking-chat"),
    gdg("google-gdg-cali-presents-google-io-extended-cali-2024"),
  ]),
  t("2024-05-03", "charla", "Integrando la API de Gemini en React", "BarranquIA", ["Gemini", "React"], [
    slides("https://docs.google.com/presentation/d/1rEsfjHJ9TZfaLVpc2EvOfFwNYSsaVqjXifanhXuD-TA/edit?usp=sharing&resourcekey=0-9KauwM7GdgG1BtyaCta8oA"),
    repo("barranqui-ia"),
    demo("https://barranqui-ia.vercel.app"),
    post("https://vanessamarely.medium.com/gu%C3%ADa-para-construir-un-chat-con-la-api-gemini-ai-con-react-ac655702947b"),
    event("https://barranquiia.com/"),
  ]),
  t("2024-04-28", "taller", "Integrando la API de Gemini en React", "Build with AI · GDG Guayaquil", ["Gemini", "React"], [
    repo("gemini-chat"),
    demo("https://gemini-chat-mu.vercel.app"),
    post("https://vanessamarely.medium.com/c%C3%B3mo-crear-un-text-prompt-con-la-libreria-generative-ai-en-react-9c15b5107a53"),
  ]),
  t("2024-03-11", "charla", "Optimizando el flujo de trabajo con GitHub Actions", "GitHub LATAM", ["GitHub Actions", "CI/CD"], [
    repo("githubactions"),
    event("https://www.meetup.com/es-ES/githublatam/events/299568786/"),
  ]),
  t("2024-03-08", "charla", "Construyendo el futuro: desarrollo web impulsado por IA", "IWD · GDG Guatemala", ["IA", "Web"], [
    gdg("google-gdg-guatemala-presents-iwd-guatemala-2024/cohost-gdg-guatemala"),
  ]),
  t("2024-02-20", "charla", "Optimizando el rendimiento web a través de la accesibilidad", "Webinar Growketing", ["Performance", "Accesibilidad"], [
    event("https://eventos.growketing.com/web-performance"),
  ]),

  // ---------- 2023 ----------
  t("2023-12-01", "charla", "Siento la necesidad, la necesidad de velocidad", "DevFest Ica", ["Performance", "Core Web Vitals"], [
    event("https://www.eventbrite.com/e/entradas-devfest-ica-718100236137"),
  ]),
  t("2023-11-23", "live", "Experiencias en el DevFest", "YouTube Live", ["Comunidad"], [video("6BlV00dQwFk")]),
  t("2023-11-10", "charla", "Hablemos de la carga diferida en Angular v17", "Angular Bolivia", ["Angular", "Performance"], [
    post("https://twitter.com/angularBolivia/status/1723092285997425058"),
  ]),
  t("2023-10-20", "charla", "Hábitos y comunicación: las herramientas de un desarrollador productivo", "Conferencia de comunidad", ["Carrera"], [
    post("https://www.instagram.com/reel/CyuPr6GRWQm/"),
  ]),
  t("2023-10-06", "charla", "Siento la necesidad, la necesidad de velocidad", "Charla de comunidad", ["Performance", "Core Web Vitals"], [
    post("https://www.instagram.com/p/CyTX-C8OD-m/"),
  ]),
  t("2023-10-02", "mentoría", "Mentoría de entrevistas técnicas web", "Mentoría", ["Carrera"]),
  t("2023-09-25", "live", "Novedades de Angular, PaLM API & Project IDX", "YouTube", ["Angular", "IA"], [video("Whn6_SNeNp4")]),
  t("2023-09-11", "mentoría", "Be-Me: mentorías de React (hooks, routing, Context API, Tailwind, Next.js)", "Be-Me", ["React", "Next.js"], [
    repo("be-me"),
    video("iRJne9Dg1sE"),
    video("kmBoosnwGwQ"),
    video("yiVNn0yB4mg"),
  ]),
  t("2023-08-03", "mentoría", "Mentoría de entrevistas técnicas", "Laboratoria", ["Carrera"], [
    post("https://www.linkedin.com/posts/vanessa-marely-aristizabal-angel_gracias-laboratoria-por-haberme-dado-la-oportunidad-activity-7105195816121683968-rCHt"),
  ]),
  t("2023-07-28", "charla", "Core Web Vitals + INP", "Charla de comunidad", ["Performance", "Core Web Vitals"], [
    post("https://twitter.com/vanessamarely/status/1686531629928296448"),
  ]),
  t("2023-07-28", "mentoría", "From Zero to Hero (bootcamp)", "Women Who Code · Gorilla Logic", ["JavaScript"], [
    repo("arrays-objects"),
    post("https://www.linkedin.com/posts/gorillalogic_womenintech-gorillalogic-fromzerotohero-activity-7090422565017440256--shQ"),
  ]),
  t("2023-07-08", "live", "CafeCode: cómo van de la mano UX y el desarrollo de software", "YouTube Live", ["UX"], [video("TSmysSB9sOE")]),
  t("2023-06-12", "charla", "Métodos para manejar el estado en React", "Charla técnica", ["React"], [repo("state-management-react")]),
  t("2023-06-12", "mentoría", "DOM, CSSOM y BOM", "Women Who Code", ["JavaScript"], [repo("dom_practice")]),
  t("2023-05-29", "charla", "Novedades del Google I/O en Web y Angular", "GDG Medellín", ["Angular", "Google I/O"], [
    gdg("google-gdg-medellin-presents-git-y-algunas-novedades-del-google-io-ia-web-angular-y-otras-tecnologias"),
  ]),
  t("2023-05-01", "mentoría", "Simulación de entrevistas", "Laboratoria", ["Carrera"]),
  t("2023-04-17", "live", "Angular vs React", "YouTube", ["Angular", "React"], [video("AL6NgiBD01k")]),
  t("2023-04-13", "live", "Cómo crear comunidad tech en un país al que migraste", "YouTube Live", ["Comunidad"], [video("rdjsagTYPZU")]),
  t("2023-03-27", "charla", "¿Por qué las habilidades blandas pueden frenar tu carrera?", "Charla online", ["Carrera"]),
  t("2023-03-18", "live", "Mi camino como líder de comunidad", "YouTube Live", ["Comunidad"], [video("Mw-EXC3TiR0")]),
  t("2023-03-10", "taller", "Workshop: crea tu primera app con React", "GDG Medellín", ["React"], [
    repo("taller-react-gdg"),
    video("d5r6j2hvf1s"),
    gdg("google-gdg-medellin-presents-workshop-crear-tu-primera-web-app-en-angularreactvue"),
  ]),
  t("2023-03-10", "charla", "Vision board", "Charla de comunidad", ["Carrera"]),
  t("2023-03-09", "live", "Creemos una aplicación en React", "GDSC UNI", ["React"], [video("https://www.youtube.com/live/ItnNk0_pEi8")]),
  t("2023-03-04", "live", "Curiosidades de JavaScript", "YouTube Live", ["JavaScript"], [video("lznqZBQv1Eo")]),
  t("2023-03-01", "live", "Prepárate para una entrevista técnica", "YouTube Live", ["Carrera"], [video("S_38KcFTN-4")]),
  t("2023-01-20", "live", "De developer a un rol de liderazgo: engineering management", "YouTube Live", ["Carrera"], [video("tB9Js_VqrFY")]),

  // ---------- 2022 ----------
  t("2022-12-12", "live", "Ser mamá en la industria de software", "YouTube Live", ["Diversidad"], [video("arJPXSL83Rk")]),
  t("2022-11-25", "charla", "Tips & trucos para usar las Developer Tools", "DevFest Campeche", ["DevTools"], [event("https://devfestcampeche.com/")]),
  t("2022-10-31", "live", "Practiquemos JavaScript con el DOM y el CSSOM", "Bitácora de Código", ["JavaScript"], [
    video("8-d6uo3PD8U"),
    video("Q6RnOO-pkeA"),
    repo("bitacora-codigo"),
  ]),
  t("2022-09-14", "panel", "Latina Women polyglots in software development", "Octogatos Conf", ["Diversidad", "Comunidad"], [
    video("https://www.youtube.com/watch?v=NRZJ_uV0h70&t=27171"),
  ]),
  t("2022-09-14", "panel", "Comunidades tecnológicas en América Latina", "Octogatos Conf", ["Comunidad"], [
    video("https://www.youtube.com/watch?v=NRZJ_uV0h70&t=27171"),
  ]),
  t("2022-09-14", "panel", "Stars Chat", "Octogatos Conf", ["GitHub Stars", "Comunidad"], [video("https://www.youtube.com/watch?v=NRZJ_uV0h70&t=36215")]),
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
  t("2022-05-20", "charla", "Web Vitals", "GDSC Fest Perú", ["Performance", "Core Web Vitals"], [
    video("https://www.facebook.com/watch/live/?v=683623102871140"),
  ]),
  t("2022-05-12", "charla", "Síndromes del developer", "Charla de comunidad", ["Carrera"]),
  t("2022-04-21", "charla", "Try-n-catch: conociendo Angular", "Try-n-catch", ["Angular"]),
  t("2022-04-18", "charla", "El síndrome del impostor: ¿qué es y cómo superarlo?", "Charla de comunidad", ["Carrera"]),
  t("2022-04-12", "mentoría", "Road to GDE: mentoría en Web Technologies", "Road to GDE · Google", ["Web"]),
  t("2022-03-20", "charla", "Crea una app de React de 0 a deploy con GitHub Actions", "IWD · GDSC LATAM", ["React", "GitHub Actions"], [
    repo("demo-despliegue-react-iwd"),
    video("https://youtu.be/EAthMtbHxnk?t=3728"),
  ]),
  t("2022-02-26", "mentoría", "Mentoría: fundamentos de HTML", "Mentoría", ["HTML"]),
  t("2022-02-25", "panel", "State of JS", "Mesa redonda", ["JavaScript"], [video("https://www.twitch.tv/videos/1307757936")]),
  t("2022-02-18", "charla", "¿Qué ventajas tengo al usar TypeScript en React?", "TSDay · ng-Bolivia", ["TypeScript", "React"], [
    event("https://tsday.ng-bolivia.org/"),
  ]),
  t("2022-02-17", "charla", "Despliega tu aplicación con GitHub Actions", "Utopicode", ["GitHub Actions", "CI/CD"], [
    repo("demo-deploy"),
    repo("deploy-react-example"),
    video("fM8xgzT8d6M"),
  ]),
  t("2022-02-13", "charla", "Desarrollo web y sus diferentes roles en la industria", "Universidad Autónoma de Ciudad Juárez", ["Carrera", "Web"], [
    event("https://bit.ly/3HGOdAv"),
  ]),
  t("2022-02-01", "charla", "Aplicaciones web: ¿librería o framework?", "Charla técnica", ["Web"]),

  // ---------- 2021 ----------
  t("2021-10-14", "charla", "Aplicaciones web y su proceso de CI/CD (GitHub Actions)", "DevFest Golfo MX", ["GitHub Actions", "CI/CD"], [
    video("https://www.youtube.com/watch?v=PyLNJzuUegM&t=2668s"),
  ]),
  t("2021-05-31", "charla", "Angular in the Wonderland of the Best Practices", "Angular Global Summit 21", ["Angular"], [
    repo("angular-best-practices"),
    video("https://youtu.be/NTGtbbFG2SM?t=18938"),
  ]),
  t("2021-05-27", "charla", "Despliegue de apps React y Angular con GitHub Actions", "Charla técnica", ["GitHub Actions", "Angular", "React"], [
    repo("deploy-angular-example"),
    video("mf6vSghZ3P8"),
  ]),
  t("2021-05-20", "taller", "Workshop: Kanban Board en Angular", "Angular Honduras", ["Angular"], [
    repo("angular-kanban-workshop"),
    video("https://youtu.be/cASsVnSDr5s"),
  ]),
  t("2021-04-23", "charla", "Arquitectura de nuestras apps", "Angular Bogotá", ["Angular", "Arquitectura"], [video("https://youtu.be/CI_fO3NZf_g?t=193")]),
  t("2021-03-25", "charla", "Creando aplicaciones web", "Charla online", ["Web"], [video("eqPra5Qea2M")]),
  t("2021-03-15", "taller", "Taller de React", "Comfeco", ["React"], [video("gA8R5nyayxI"), video("veId2d1L39M")]),
  t("2021-03-12", "charla", "Tips para conseguir un buen trabajo como dev", "IWD LATAM", ["Carrera"], [video("https://youtu.be/6wiCxQgVnn4?t=10651")]),
  t("2021-03-10", "charla", "Desde los fundamentos en Angular", "Angular Bolivia", ["Angular"], [
    video("https://www.youtube.com/watch?v=wnksvWJrKxI&t=2925s"),
  ]),

  // ---------- 2020 ----------
  t("2020-12-10", "mentoría", "Mentoría Frontend para mujeres", "Mentoría", ["Frontend"]),
  t("2020-11-20", "taller", "Angular Workshop: componentes, módulos y routing", "Taller", ["Angular"]),
  t("2020-07-24", "taller", "Metamorfosis de Angular: niveles oruga, crisálida y mariposa", "She Codes Angular", ["Angular"], [
    repo("metamorfosis-angular"),
  ]),
  t("2020-04-16", "charla", "Contando una historia sobre JavaScript", "Charla online", ["JavaScript"], [video("fIVTX-ayKXg")]),

  // ---------- 2019 ----------
  t("2019-11-14", "taller", "She Codes Angular Workshop", "She Codes Angular", ["Angular"]),
  t("2019-11-14", "charla", "Intro to Angular", "She Codes Angular", ["Angular"]),
  t("2019-10-18", "charla", "Contando una historia", "JSConf Colombia", ["JavaScript", "Storytelling"], [event("https://jsconf.co/")]),
  t("2019-10-18", "panel", "Panel de expertos", "JSConf Colombia", ["Frontend"]),
  t("2019-09-16", "taller", "Angular: componentes, directivas y routing", "Taller", ["Angular"]),
  t("2019-09-07", "charla", "Frontend & Backend en la Web", "ITM Medellín", ["Web"], [slides("https://tinyurl.com/y3qx2e3l")]),
  t("2019-07-13", "charla", "Google Experiments", "GDG Medellín Anniversary", ["Google"], [
    slides("https://tinyurl.com/y3m237q6"),
    event("https://www.meetup.com/GDG-Medellin/events/261767850/"),
  ]),
  t("2019-05-15", "charla", "Angular", "Google I/O Extended Medellín", ["Angular"], [
    slides("https://tinyurl.com/y3fb9cj4"),
    event("https://www.meetup.com/GDG-Medellin/events/260735780/"),
  ]),
  t("2019-04-27", "charla", "Los retos de crear una comunidad de chicas", "WTM Summit LATAM · Argentina", ["Comunidad", "Diversidad"], [
    slides("https://tinyurl.com/y4wh7ycx"),
  ]),
  t("2019-03-05", "charla", "React Reconciliation", "React Dev Week · Globant", ["React"], [slides("https://tinyurl.com/yxkpzjpu"), video("F_62DS6CcGg")]),

  // ---------- 2018 ----------
  t("2018-09-06", "charla", "Mystical Art in Angular: Beyond the code", "NgColombia", ["Angular"], [
    slides("https://tinyurl.com/y6pk8fn8"),
    video("bKjhLi-_KYw"),
  ]),
  t("2018-09-04", "charla", "SVG y CSS", "CSS Medellín", ["SVG", "CSS"], [
    slides("https://slides.com/vanessamarely/svg-css"),
    post("https://medium.com/@vanessamarely/svg-dcdb4f2aba4a"),
  ]),
  t("2018-09-01", "mentoría", "NgGirls Colombia", "NgGirls", ["Angular", "Diversidad"], [repo("ngGirls-col")]),
  t("2018-07-08", "charla", "Design for Devs", "Pioneras Dev", ["Diseño"], [slides("https://slides.com/vanessamarely/design-for-devs")]),
  t("2018-07-07", "charla", "Angular 6 y Material CDK", "GDG Medellín Anniversary", ["Angular"], [
    slides("https://tinyurl.com/y3h8st9b"),
    repo("cdk-tree"),
    event("https://www.meetup.com/GDG-Medellin/events/250544591/"),
  ]),
  t("2018-06-02", "charla", "SVG y CSS", "Pioneras Dev", ["SVG", "CSS"], [
    slides("https://slides.com/vanessamarely/svg-css"),
    event("https://www.meetup.com/PionerasDevelopers/events/251104838/"),
  ]),
  t("2018-04-24", "charla", "Angular Material CDK", "Angular Week · Globant", ["Angular"], [
    slides("https://slides.com/vanessamarely/angular-week-2018-3"),
    repo("angular-material-cdk"),
    video("62EtV33NWmc"),
    post("https://medium.com/@vanessamarely/angular-material-cdk-60520fe28093"),
  ]),
];

export const communities = [
  { name: "GDG Medellín", role: "Organizadora" },
  { name: "She Codes Angular", role: "Organizadora y mentora" },
  { name: "NgGirls Colombia", role: "Organizadora y mentora" },
  { name: "Women Techmakers", role: "Embajadora" },
  { name: "DevFest Medellín", role: "Organizadora" },
];

export const resourceLabel: Record<ResourceType, string> = {
  slides: "Slides",
  video: "Video",
  event: "Evento",
  post: "Post",
  repo: "Repo",
  demo: "Demo",
};

export const kindLabel: Record<TalkKind, string> = {
  charla: "Charla",
  taller: "Taller",
  panel: "Panel",
  mentoría: "Mentoría",
  live: "En vivo",
};

export const sortedTalks = [...talks].sort((a, b) => b.date.localeCompare(a.date));

// Resumen de impacto tomado de Advocu (GDE). Actualízalo a mano cuando cambie.
export const impact = [
  { value: 77, label: "charlas", detail: "11.4k asistentes" },
  { value: 21, label: "talleres", detail: "908 asistentes" },
  { value: 16, label: "mentorías", detail: "186 personas" },
  { value: 122, label: "contenidos", detail: "72.8k lectores" },
];
