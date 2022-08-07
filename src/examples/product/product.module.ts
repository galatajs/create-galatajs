import { Package } from "../../packages/package";
import { JavaScriptType } from "../../types/types";
import { writeExports, writeFile } from "../../writers/file.writer";
import { AppFileWithAdder } from "../app.type";

export type CreateProductModuleOptions = {
  extension: string;
  root: string;
};

export const createProductModule = (
  type: JavaScriptType,
  options: CreateProductModuleOptions
): AppFileWithAdder => {
  const registers: Array<string> = [];
  const registererImports: Array<string> = [];
  return {
    importGetter: () => ({
      typescript: [
        'import { createModule } from "@istanbul/app"',
        'import { ProductService } from "./product.service"',
        ...registererImports,
      ],
      es6: [
        'import { createModule } from "@istanbul/app"',
        'import { ProductService } from "./product.service"',
        ...registererImports,
      ],
      commonjs: [
        'const { createModule } = require("@istanbul/app")',
        'const { ProductService } = require("./product.service")',
        ...registererImports,
      ],
    }),
    body: () => ({
      typescript: [
        'export const productModule = createModule("product", {',
        "  providers: [",
        `    ProductService, ${registers.join(",\n\t")}`,
        "  ],",
        "});",
      ],
      es6: [
        'export const productModule = createModule("product", {',
        "  providers: [",
        `    ProductService, ${registers.join(",\n\t")}`,
        "  ],",
        "});",
      ],
      commonjs: [
        'const productModule = createModule("product", {',
        "  providers: [",
        `    ProductService, ${registers.join(",\n\t")}`,
        "  ],",
        "});",
      ],
    }),
    exports: {
      typescript: [],
      es6: [],
      commonjs: ["productModule"],
    },
    addFromPackage(pkg: Package) {
      if (pkg.files && pkg.files.examples) {
        for (const file of pkg.files.examples) {
          if (file.moduleRegisters) {
            if (
              file.moduleRegisters.imports &&
              file.moduleRegisters.imports[type]
            ) {
              registererImports.push(...file.moduleRegisters.imports[type]);
            }
            if (
              file.moduleRegisters.registers &&
              file.moduleRegisters.registers[type]
            ) {
              registers.push(...file.moduleRegisters.registers[type]);
            }
          }
        }
      }
    },
    getContent() {
      let content: string = "";
      let body = {};
      if (this.body && typeof this.body === "function") {
        body = this.body();
      }
      let imports = {};
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
    write() {
      const file = `${options.root}/product.module.${options.extension}`;
      writeFile(file, this.getContent());
    },
  };
};
