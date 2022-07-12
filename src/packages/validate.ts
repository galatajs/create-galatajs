import { Package } from "./package";

export const createValidatePackage = (): Package => {
  return {
    name: "validate",
    configName: "needsValidation",
  };
};
