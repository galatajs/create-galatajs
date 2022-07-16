import { Package } from "../../packages/package";
import { JavaScriptType } from "../../types/types";
import { writeExports, writeFile } from "../../writers/file.writer";
import { AppFileWithAdder } from "../app.type";

export type CreateProductServiceOptions = {
  extension: string;
  root: string;
};

export const createProductService = (
  type: JavaScriptType,
  options: CreateProductServiceOptions
): AppFileWithAdder => {
  const registers: Array<string> = [];
  return {
    body: {
      typescript: [
        "export class ProductService {",
        " async createProduct(product: Product): Promise<Product> {",
        `${registers.join("\n")}`,
        "   return product;",
        " }",
        "}",
      ],
      es6: [
        "export class ProductService {",
        " async createProduct(product) {",
        `${registers.join("\n")}`,
        "   return product;",
        " }",
        "}",
      ],
      commonjs: [
        "class ProductService {",
        "  async createProduct(product) {",
        `${registers.join("\n")}`,
        "    return product;",
        "  }",
        "}",
      ],
    },
    exports: {
      typescript: [],
      es6: [],
      commonjs: ["ProductService"],
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
      if (this.body && this.body[type]) {
        content += this.body[type].join("\n") + "\n";
      }
      if (this.exports && this.exports[type]) {
        content += writeExports(type, this.exports[type]) + "\n";
      }
      return content;
    },
    write() {
      const file = `${options.root}product.service.${options.extension}`;
      writeFile(file, this.getContent());
    },
  };
};
