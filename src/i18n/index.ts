// Language helpers. Spanish is the default at "/", English lives under "/en/".
import { ui, type UIKey } from "./ui";

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** Current language from Astro.currentLocale. */
export const langOf = (locale: string | undefined): Lang => (locale === "en" ? "en" : "es");

/** Translator for a language. */
export const useT = (lang: Lang) => (key: UIKey) => ui[lang][key] ?? ui.es[key];

/** Localized URL for a site path such as "/", "/charlas/" or "/#sobre-mi". */
export function localize(lang: Lang, path: string): string {
  if (lang === "es") return path;
  if (path === "/") return "/en/";
  if (path.startsWith("/#")) return "/en/" + path.slice(1);
  return "/en" + path;
}

/** The same page in each language, from the current pathname. */
export function alternates(pathname: string): Record<Lang, string> {
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return { es: base, en: localize("en", base) };
}

export const dateLocale: Record<Lang, string> = { es: "es-CO", en: "en-US" };

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
