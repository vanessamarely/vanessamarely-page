// Structured data (JSON-LD) shared by every page: who Vanessa is and what the site is.
import { social } from "./social";
import type { Lang } from "../i18n";

export const SITE = "https://www.vanessamarely.dev";
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

const description: Record<Lang, string> = {
  es: "Fullstack developer con foco en frontend, Google Developer Expert en Angular y Web, GitHub Star, escritora, mentora, speaker e ilustradora.",
  en: "Frontend-focused fullstack developer, Google Developer Expert in Angular and Web, GitHub Star, writer, mentor, speaker and illustrator.",
};

export const person = (lang: Lang) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Vanessa Marely Aristizábal Ángel",
  alternateName: "Vanessa Marely",
  url: `${SITE}/`,
  image: `${SITE}/images/vanessa.jpg`,
  jobTitle: lang === "en" ? "Frontend-focused fullstack developer" : "Fullstack developer con foco en frontend",
  description: description[lang],
  award: ["Google Developer Expert (Angular)", "Google Developer Expert (Web Technologies)", "GitHub Star"],
  knowsAbout: ["Angular", "React", "TypeScript", "JavaScript", "Web performance", "Accessibility", "Chrome DevTools", "WebMCP", "AI"],
  knowsLanguage: ["es", "en"],
  address: { "@type": "PostalAddress", addressLocality: "Envigado", addressRegion: "Antioquia", addressCountry: "CO" },
  sameAs: social.map((s) => s.href),
});

export const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: "Vanessa Marely",
  inLanguage: ["es", "en"],
  publisher: { "@id": PERSON_ID },
});
