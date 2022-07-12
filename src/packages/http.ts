import { Package } from "./package";

export const createHttpPackage = (): Package => {
  return {
    name: "http",
    configName: "needsHttp",
  };
};
