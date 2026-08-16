import { ko } from "./ko";
import { en } from "./en";

export type LocaleDictionary = typeof ko;

export function getDictionary(locale?: string): LocaleDictionary {
  return locale === "ko" ? ko : en;
}
