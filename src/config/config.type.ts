export type ConfigCreatorParams = {
  targetDir?: string;
  defaultProjectName: string;
};

export interface Config {
  projectName?: string;
  needsTypeScript?: boolean;
  needsCommonJS?: boolean;
  needsHttp?: boolean;
  needsWebsocket?: boolean;
  needsEventEmitter?: boolean;
  needsI18n?: boolean;
  needsValidation?: boolean;
  needsBusinessLogic?: boolean;
  needsInject?: boolean;
  needsModuleBased?: boolean;
  needsJest?: boolean;
  needsSupertest?: boolean;
}
