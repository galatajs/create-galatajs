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
    imports: {
      typescript: ['import { Product } from "./product.entity"'],
      es6: [],
      commonjs: [],
    },
    body: {
      typescript: [
        "export class ProductService {",
        " async createProduct(product: Product): Promise<Product> {",
        `  ${registers.join("\n\t")}${
          registers.length > 0 ? "\n" : null
        }\treturn product;`,
        " }",
        "",
        " async getProductById(id: string) : Promise<Product | null> {",
        "  return null;",
        " }",
        "}",
      ],
      es6: [
        "export class ProductService {",
        " async createProduct(product) {",
        `${registers.join("\n")}\treturn product;`,
        " }",
        "",
        " async getProductById(id) {",
        "  return null;",
        " }",
        "}",
      ],
      commonjs: [
        "class ProductService {",
        "  async createProduct(product) {",
        `${registers.join("\n")}\treturn product;`,
        "  }",
        "",
        " async getProductById(id) {",
        "  return null;",
        " }",
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
      if (this.imports && this.imports[type] && this.imports[type].length > 0) {
        content += this.imports[type].join("\n") + "\n\n";
      }
      if (this.body && this.body[type] && this.body[type].length > 0) {
        content += this.body[type].join("\n") + "\n\n";
      }
      if (this.exports && this.exports[type] && this.exports[type].length > 0) {
        content += writeExports(type, this.exports[type]) + "\n\n";
      }
      return content;
    },
    write() {
      const file = `${options.root}/product.service.${options.extension}`;
      writeFile(file, this.getContent());
    },
  };
};
