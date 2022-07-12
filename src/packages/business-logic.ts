import { Package } from "./package";

export const createBusinessLogicPackage = (): Package => {
  return {
    name: "businessLogic",
    configName: "needsBusinessLogic",
  };
};
