import { Package } from "../../packages/package";
import { JavaScriptType } from "../../types/types";
import { createDirectoriesToDir } from "../../utils/fs.helper";
import { BaseApp } from "../app.type";
import { createProductEntity } from "./product.entity";
import { createProductModule } from "./product.module";
import { createProductService } from "./product.service";

export type CreateProductAppOptions = {
  extension: string;
  root: string;
};

export const createProductApp = (
  type: JavaScriptType,
  options: CreateProductAppOptions
): BaseApp => {
  options.root += "product";
  const entity = createProductEntity(type, options);
  const service = createProductService(type, options);
  const module = createProductModule(type, options);
  return {
    name: "product",
    addFromPackage(pkg: Package) {
      if (pkg.files && pkg.files.examples) {
        for (const file of pkg.files.examples) {
        }
      }
    },
    getContent() {
      return "";
    },
    write() {
      createDirectoriesToDir(options.root);
      entity.write();
      service.write();
      module.write();
    },
  };
};
