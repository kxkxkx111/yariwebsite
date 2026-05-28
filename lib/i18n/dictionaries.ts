import "server-only";
import type { Locale } from "./config";
import deMessages from "./messages/de.json";
import enMessages from "./messages/en.json";

export type Dictionary = typeof deMessages;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: async () => deMessages as Dictionary,
  en: async () => enMessages as Dictionary,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
