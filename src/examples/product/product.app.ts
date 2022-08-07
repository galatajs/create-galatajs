import { Package } from "../../packages/package";
import { JavaScriptType } from "../../types/types";
import { createDirectoriesToDir } from "../../utils/fs.helper";
import { writeFileFromExample } from "../../writers/external.writer";
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
  const path = "/src/product";
  const root = options.root + path;
  const entity = createProductEntity(type, { ...options, root });
  const service = createProductService(type, { ...options, root });
  const module = createProductModule(type, { ...options, root });
  return {
    name: "product",
    addFromPackage(pkg: Package) {
      module.addFromPackage(pkg);
      service.addFromPackage(pkg);
      if (pkg.files && pkg.files.examples) {
        for (const file of pkg.files.examples) {
          if (file.unique) {
            writeFileFromExample(type, file, {
              root: options.root,
              destination: path,
              extension: options.extension,
            });
          }
        }
      }
    },
    getContent() {
      return "";
    },
    write() {
      createDirectoriesToDir(path, options.root);
      entity.write();
      service.write();
      module.write();
    },
  };
};
