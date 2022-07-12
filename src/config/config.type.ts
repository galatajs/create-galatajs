export type ConfigCreatorParams = {
  targetDir?: string;
  defaultProjectName: string;
};

export enum ConfigNames {
  http = "needsHttp",
  websocket = "needsWebsocket",
  events = "needsEventEmitter",
  i18n = "needsI18n",
  validate = "needsValidation",
  businessLogic = "needsBusinessLogic",
  inject = "needsInject",
}

export interface Config {
  projectName?: string;
  needsTypeScript?: boolean;
  needsCommonJS?: boolean;
  [ConfigNames.http]?: boolean;
  [ConfigNames.websocket]?: boolean;
  [ConfigNames.events]?: boolean;
  [ConfigNames.i18n]?: boolean;
  [ConfigNames.validate]?: boolean;
  [ConfigNames.businessLogic]?: boolean;
  [ConfigNames.inject]?: boolean;
  needsModuleBased?: boolean;
  needsJest?: boolean;
  needsSupertest?: boolean;
  shouldOverwrite?: boolean;
}
