import { writeFile } from "./file.writer";
import { Package } from "../packages/package";
import { FileWriter, MainFileCodes, PackageAdderToFile } from "../types/file";
import { JavaScriptType } from "../types/types";

export interface MainFile
  extends PackageAdderToFile,
    FileWriter,
    MainFileCodes {}

export type Options = {
  extension: string;
  root: string;
};

export const createMainFile = (
  type: JavaScriptType,
  options: Options
): MainFile => {
  return {
    imports: [],
    exports: [],
    registers: [],
    footers: [],
    addFromPackage(pkg: Package) {
      if (pkg.files && pkg.files.main) {
        if (
          pkg.files.main.imports &&
          pkg.files.main.imports[type] &&
          pkg.files.main.imports[type].length > 0
        ) {
          this.imports = [...this.imports, ...pkg.files.main.imports[type]];
        }
        if (
          pkg.files.main.exports &&
          pkg.files.main.exports[type] &&
          pkg.files.main.exports[type].length > 0
        ) {
          this.exports = [...this.exports, ...pkg.files.main.exports[type]];
        }
        if (
          pkg.files.main.footer &&
          pkg.files.main.footer[type] &&
          pkg.files.main.footer[type].length > 0
        ) {
          this.footers = [...this.footers, ...pkg.files.main.footer[type]];
        }
        if (
          pkg.files.main.registers &&
          pkg.files.main.registers[type] &&
          pkg.files.main.registers[type].length > 0
        ) {
          this.registers = [
            ...this.registers,
            ...pkg.files.main.registers[type],
          ];
        }
      }
    },
    getContent() {
      return `${this.imports.join("\n")}\n\n${this.registers.join(
        "\n"
      )}\n\n${this.footers.join("\n")}`;
    },
    write() {
      writeFile(`${options.root}/main.${options.extension}`, this.getContent());
    },
  };
};
