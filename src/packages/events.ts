import { Package } from "./package";

export const createEventsPackage = (): Package => {
  return {
    name: "events",
    configName: "needsEventEmitter",
  };
};
