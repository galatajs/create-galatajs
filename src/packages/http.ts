import { Package } from "./package";

export const createHttpPackage = (): Package => {
  return {
    name: "http",
    configName: "needsHttp",
    files: {
      packageJson: {
        dependencies: {
          typescript: {
            "@istanbul/http": "^0.0.5",
          },
          commonjs: {
            "@istanbul/http": "^0.0.5",
          },
          es6: {
            "@istanbul/http": "^0.0.5",
          },
        },
      },
      main: {
        imports: {
          typescript: ['import { createHttpServer } from "@istanbul/http"'],
          es6: ['import { createHttpServer } from "@istanbul/http"'],
          commonjs: ['const { createHttpServer } = require("@istanbul/http")'],
        },
        registers: {
          typescript: ["app.register(createHttpServer())"],
          es6: ["app.register(createHttpServer())"],
          commonjs: ["app.register(createHttpServer())"],
        },
      },
    },
  };
};
