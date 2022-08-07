import { FullFile } from "../packages/package";
import { FileWriter, PackageAdderToFile } from "../types/file";
import { JavaScriptType } from "../types/types";
import { writeExports, writeFile } from "../writers/file.writer";

export type CreateMainModuleFileOptions = {
  extension: string;
  root: string;
};

export interface MainModule extends PackageAdderToFile, FileWriter, FullFile {}

export const createMainModuleFile = (
  type: JavaScriptType,
  options: CreateMainModuleFileOptions
): MainModule => {
  return {
    addFromPackage() {},
    body: () => ({
      typescript: [
        "export const mainModule : Module = createModule('main', {",
        "  imports: [",
        "     productModule,",
        "  ],",
        "});",
      ],
      es6: [
        "export const mainModule = createModule('main', {",
        "  imports: [",
        "     productModule,",
        "  ],",
        "});",
      ],
      commonjs: [
        "const mainModule = createModule('main', {",
        "  imports: [",
        "     productModule,",
        "  ],",
        "});",
      ],
    }),
    importGetter: () => ({
      typescript: [
        "import { createModule, Module } from '@istanbul/app'",
        "import { productModule } from './product/product.module'",
      ],
      es6: [
        "import { createModule, Module } from '@istanbul/app'",
        "import { productModule } from './product/product.module'",
      ],
      commonjs: [
        "const { createModule, Module } = require('@istanbul/app')",
        "const { productModule } = require('./product/product.module')",
      ],
    }),
    footer: {
      typescript: [],
      es6: [],
      commonjs: ["mainModule"],
    },
    write() {
      const file = `${options.root}/main.module.${options.extension}`;
      writeFile(file, this.getContent());
    },
    getContent(): string {
      let content: string = "";
      let body = {};
      let imports = {};
      if (this.body && typeof this.body === "function") {
        body = this.body();
      }
      if (this.importGetter && typeof this.importGetter === "function") {
        imports = this.importGetter();
      }
      if (imports && imports[type] && imports[type].length > 0) {
        content += imports[type].join("\n") + "\n\n";
      }
      if (body && body[type] && body[type].length > 0) {
        content += body[type].join("\n") + "\n\n";
      }
      if (this.exports && this.exports[type] && this.exports[type].length > 0) {
        content += writeExports(type, this.exports[type]) + "\n\n";
      }
      return content;
    },
  };
};
