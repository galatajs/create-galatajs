import { Package } from "./package";

export const createWebsocketPackage = (): Package => {
  return {
    name: "websocket",
    configName: "needsWebsocket",
  };
};
