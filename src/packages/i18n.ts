import { Package } from "./package";

export const createI18nPackage = (): Package => {
  return {
    name: "i18n",
    configName: "needsI18n",
  };
};
