import { Package } from "./package";

export const createInjectPackage = (): Package => {
  return {
    name: "inject",
    configName: "needsInject",
  };
};
