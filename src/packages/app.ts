import { Package } from "./package";

export const createAppPackage = (): Package => {
  return {
    name: "app",
    configName: "",
    files: {
      packageJson: {
        dependencies: {
          typescript: {
            "@galatajs/app": "^0.1.1",
          },
          commonjs: {
            "@galatajs/app": "^0.1.1",
          },
          es6: {
            "@galatajs/app": "^0.1.1",
          },
        },
        devDependencies: {
          typescript: {
            typescript: "^4.7.4",
            "ts-node-dev": "^2.0.0",
            "@types/node": "^18.0.3",
          },
          commonjs: {},
          es6: {},
        },
      },
      main: {
        imports: {
          typescript: ['import { createApp, App } from "@galatajs/app"'],
          es6: ['import { createApp } from "@galatajs/app"'],
          commonjs: ['const { createApp } = require("@galatajs/app")'],
        },
        registers: {
          typescript: ["const app : App = createApp()"],
          es6: ["const app = createApp()"],
          commonjs: ["const app = createApp()"],
        },
        footer: {
          typescript: ["app.start()"],
          es6: ["app.start()"],
          commonjs: ["app.start()"],
        },
      },
    },
  };
};
