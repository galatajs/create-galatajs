import { JavaScriptType } from "../../types/types";
import { writeExports, writeFile } from "../../writers/file.writer";
import { AppFile } from "../app.type";

export type CreateProductEntityOptions = {
  extension: string;
  root: string;
};

export const createProductEntity = (
  type: JavaScriptType,
  options: CreateProductEntityOptions
): AppFile => {
  return {
    body: {
      typescript: [
        "export class Product {",
        "  id: number;",
        "  name: string;",
        "  price: number;",
        "}",
      ],
      es6: [
        "export class Product {",
        "  id: number;",
        "  name: string;",
        "  price: number;",
        "}",
      ],
      commonjs: [
        "class Product {",
        "   constructor(id: number, name: string, price: number) {",
        "     this.id = id;",
        "     this.name = name;",
        "     this.price = price;",
        "   }",
        "}",
      ],
    },
    exports: {
      typescript: [],
      es6: [],
      commonjs: ["Product"],
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
      const file = `${options.root}product.entity.${options.extension}`;
      writeFile(file, this.getContent());
    },
  };
};
