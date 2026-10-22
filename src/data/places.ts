// Cities where talks happened, used for the talk labels and the travel map.
export type PlaceKey = keyof typeof places;

export const places = {
  medellin: { city: "Medellín", country: "Colombia", code: "COL", lat: 6.25, lon: -75.56 },
  bogota: { city: "Bogotá", country: "Colombia", code: "COL", lat: 4.71, lon: -74.07 },
  chia: { city: "Chía", country: "Colombia", code: "COL", lat: 4.86, lon: -74.06 },
  cali: { city: "Cali", country: "Colombia", code: "COL", lat: 3.45, lon: -76.53 },
  barranquilla: { city: "Barranquilla", country: "Colombia", code: "COL", lat: 10.96, lon: -74.8 },
  pereira: { city: "Pereira", country: "Colombia", code: "COL", lat: 4.81, lon: -75.69 },
  quito: { city: "Quito", country: "Ecuador", code: "ECU", lat: -0.18, lon: -78.47 },
  lima: { city: "Lima", country: "Perú", code: "PER", lat: -12.05, lon: -77.04 },
  ica: { city: "Ica", country: "Perú", code: "PER", lat: -14.07, lon: -75.73 },
  santacruz: { city: "Santa Cruz", country: "Bolivia", code: "BOL", lat: -17.78, lon: -63.18 },
  hermosillo: { city: "Hermosillo", country: "México", code: "MEX", lat: 29.07, lon: -110.96 },
  guadalajara: { city: "Guadalajara", country: "México", code: "MEX", lat: 20.67, lon: -103.35 },
  santiago: { city: "Santiago", country: "Chile", code: "CHL", lat: -33.45, lon: -70.67 },
  campeche: { city: "Campeche", country: "México", code: "MEX", lat: 19.83, lon: -90.53 },
  guatemala: { city: "Ciudad de Guatemala", country: "Guatemala", code: "GTM", lat: 14.63, lon: -90.51 },
  santodomingo: { city: "Santo Domingo", country: "República Dominicana", code: "DOM", lat: 18.49, lon: -69.93 },
  saopaulo: { city: "São Paulo", country: "Brasil", code: "BRA", lat: -23.55, lon: -46.63 },
  buenosaires: { city: "Buenos Aires", country: "Argentina", code: "ARG", lat: -34.6, lon: -58.38 },
} as const;

export const HOME: PlaceKey = "medellin";

// Country and city names in English (only the ones that change).
const countryEn: Record<string, string> = { PER: "Peru", MEX: "Mexico", DOM: "Dominican Republic", BRA: "Brazil" };
const cityEn: Partial<Record<PlaceKey, string>> = { guatemala: "Guatemala City" };

/** City and country of a place in the given language. */
export function placeName(lang: "es" | "en", key: PlaceKey): { city: string; country: string } {
  const p = places[key];
  if (lang === "es") return { city: p.city, country: p.country };
  return { city: cityEn[key] ?? p.city, country: countryEn[p.code] ?? p.country };
}
