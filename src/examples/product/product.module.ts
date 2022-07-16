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
  return {
    imports: {
      typescript: [
        'import { createModule } from "@istanbul/app"',
        'import { ProductService } from "./product.service"',
      ],
      es6: [
        'import { createModule } from "@istanbul/app"',
        'import { ProductService } from "./product.service"',
      ],
      commonjs: [
        'const { createModule } = require("@istanbul/app")',
        'const { ProductService } = require("./product.service")',
      ],
    },
    body: {
      typescript: [
        'export const productModule = createModule("product", {',
        "  providers: [",
        "    ProductService,",
        `    ${registers.join(",\n\t")}`,
        "  ],",
        "});",
      ],
      es6: [
        'export const productModule = createModule("product", {',
        "  providers: [",
        "    ProductService,",
        `    ${registers.join(",\n\t")}`,
        "  ],",
        "});",
      ],
      commonjs: [
        'const productModule = createModule("product", {',
        "  providers: [",
        "    ProductService,",
        `    ${registers.join(",\n\t")}`,
        "  ],",
        "});",
      ],
    },
    exports: {
      typescript: [],
      es6: [],
      commonjs: ["productModule"],
    },
    addFromPackage(pkg: Package) {
      if (pkg.files && pkg.files.examples) {
        for (const file of pkg.files.examples) {
          if (file.registers && file.registers[type]) {
            registers.push(...file.registers[type]);
          }
        }
      }
    },
    getContent() {
      let content: string = "";
      if (this.imports && this.imports[type]) {
        content += this.imports[type].join("\n") + "\n";
      }
      if (this.body && this.body[type]) {
        content += this.body[type].join("\n") + "\n";
      }
      if (this.exports && this.exports[type]) {
        content += writeExports(type, this.exports[type]) + "\n";
      }
      return content;
    },
    write() {
      const file = `${options.root}product.module.${options.extension}`;
      writeFile(file, this.getContent());
    },
  };
};
