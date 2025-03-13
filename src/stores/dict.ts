import { create } from "zustand";

import en from "../i18n/en.json";
import tr from "../i18n/tr.json";

export const LANGUAGES: Language[] = ["en", "tr"];
export const DEFAULT_LANGUAGE: Language = "en";

interface Dict {
  dict: typeof en; // All dictionaries must have the same structure
  setDict: (dict: Language) => void;
}

const useDictStore = create<Dict>((set) => ({
  dict: en,

  setDict: (lang: Language) =>
    set({
      dict: lang === "en" ? en : tr,
    }),
}));

export const initializeDict = () => {
  const dictStore = useDictStore.getState();

  const langOnLocalStorage = localStorage.getItem("lang") as Language | null;
  if (langOnLocalStorage) {
    if (LANGUAGES.includes(langOnLocalStorage)) {
      dictStore.setDict(langOnLocalStorage);
    } else {
      dictStore.setDict(DEFAULT_LANGUAGE);
    }
  } else {
    const navigatorLang = navigator.language.split("-")[0] as Language | null;
    if (navigatorLang && LANGUAGES.includes(navigatorLang)) {
      dictStore.setDict(navigatorLang);
    } else {
      dictStore.setDict(DEFAULT_LANGUAGE);
    }
  }
};

export default useDictStore;

declare global {
  type Dict = typeof en;
}
