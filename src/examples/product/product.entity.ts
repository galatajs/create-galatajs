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
        "  constructor(public id: number, public name: string, public price: number) {",
        "  }",
        "}",
      ],
      es6: [
        "export class Product {",
        "  constructor({ id, name, price }) {",
        "    this.id = id;",
        "    this.name = name;",
        "    this.price = price;",
        "  }",
        "}",
      ],
      commonjs: [
        "class Product {",
        "   constructor({ id, name, price }) {",
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
      const file = `${options.root}/product.entity.${options.extension}`;
      writeFile(file, this.getContent());
    },
  };
};
