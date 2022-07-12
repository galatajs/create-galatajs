import { Config, ConfigCreatorParams } from "./config.type";
import prompts from "prompts";

const createPrompt = (
  name: string,
  message: string,
  options?: {
    initial?: boolean;
    prev?: Function;
    type?: string;
  }
) => {
  return {
    name: name,
    message: message,
    type: (prev: any) =>
      options && options.prev
        ? options.prev(prev)
        : options
        ? options.type || "toggle"
        : "toggle",
    initial: options ? options.initial || true : true,
    active: "Yes",
    inactive: "No",
  };
};

export const getResult = async (params: ConfigCreatorParams) => {
  const config: Config = {};
  const result = await prompts([
    {
      name: "projectName",
      type: params.targetDir ? null : "text",
      message: "Project name: ",
      initial: params.defaultProjectName,
    },
    createPrompt("needsTypeScript", "Are you going to use TypeScript?"),
    createPrompt("needsCommonJS", "Are you going to use Common Module?", {
      prev: (prev: any) => (!prev ? "toggle" : null),
      initial: false,
    }),
    createPrompt("needsHttp", "Will your app include http server?"),
    createPrompt("needsWebsocket", "Will your app include websocket server?"),
    createPrompt("needsEventEmitter", "Will you create in-app events?"),
    createPrompt("needsI18n", "Will your app include i18n?"),
    createPrompt(
      "needsValidation",
      "Will your app include validation with Joi?"
    ),
    createPrompt("needsBusinessLogic", "Will your app include business logic?"),
    createPrompt("needsInject", "Will your app include provide-inject?"),
    createPrompt(
      "needsModuleBased",
      "Are you going to use module-based architecture?"
    ),
    createPrompt(
      "needsJest",
      "Will you write a unit and integration tests with jest?"
    ),
    createPrompt(
      "needsSupertest",
      "Will you write a e2e tests with supertest?"
    ),
  ]);
  return result;
};
