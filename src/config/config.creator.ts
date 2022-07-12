import { Config, ConfigCreatorParams } from "./config.type";
import prompts, { PrevCaller } from "prompts";
import { red } from "kolorist";
import { canSkipDirectory } from "../utils/fs.helper";

const createPrompt = (
  name: string,
  message: string | Function,
  options?: {
    initial?: boolean | string;
    prev?: Function;
    type?: string;
    onState?: PrevCaller<string, void>;
  }
) => {
  return {
    name: name,
    message: typeof message === "string" ? message : message(),
    type: (prev: any, values: any) =>
      options && options.prev
        ? options.prev(prev, values)
        : options
        ? options.type || "toggle"
        : "toggle",
    initial: options ? options.initial || true : true,
    active: "Yes",
    inactive: "No",
    onState:
      options && typeof options.onState === "function"
        ? options.onState
        : undefined,
  };
};

const cancel = () => {
  throw new Error(`\n${red("✖")} Operation cancelled\n`);
};

export const getResult = async (
  params: ConfigCreatorParams
): Promise<Config> => {
  const result = await prompts(
    [
      createPrompt("projectName", "Project name: ", {
        initial: params.targetDir || params.defaultProjectName,
        type: "text",
        onState: (val) => {
          params.targetDir = val.value;
        },
      }),
      createPrompt(
        "shouldOverwrite",
        () => {
          const dir =
            params.targetDir === "."
              ? "Current directory"
              : `Target directory "${params.targetDir}"`;
          return `${dir} is not empty. Remove existing files and continue?`;
        },
        {
          prev: (prev) => {
            console.log(params.targetDir);
            if (canSkipDirectory(params.targetDir!)) return null;
            return "confirm";
          },
        }
      ),
      createPrompt("overwriteCheck", "", {
        prev: (prev, values) => {
          if (values.shouldOverwrite === false) cancel();
          return null;
        },
      }),
      createPrompt("needsTypeScript", "Are you going to use TypeScript?"),
      createPrompt("needsCommonJS", "Are you going to use Common Module?", {
        prev: (prev: any) => (!prev ? "toggle" : null),
        initial: false,
      }),
      createPrompt("needsHttp", "Will your app include http server?"),
      // createPrompt("needsWebsocket", "Will your app include websocket server?"), // TODO! open when websocket package is available
      createPrompt("needsEventEmitter", "Will you create in-app events?"),
      createPrompt("needsI18n", "Will your app include i18n?"),
      createPrompt(
        "needsValidation",
        "Will your app include validation with Joi?"
      ),
      createPrompt(
        "needsBusinessLogic",
        "Will your app include business logic?"
      ),
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
        "Will you write a e2e tests with supertest?",
        {
          prev: (prev: any, values: any) => {
            if (values.http) return "toggle";
            return null;
          },
        }
      ),
    ],
    {
      onCancel: () => {
        cancel();
      },
    }
  );
  return result;
};
