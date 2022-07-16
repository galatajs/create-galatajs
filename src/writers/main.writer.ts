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
    addFromPackage(pkg: Package) {
      if (pkg.files && pkg.files.main) {
        if (pkg.files.main.imports && pkg.files.main.imports[type]) {
          this.imports = [...this.imports, ...pkg.files.main.imports[type]];
        }
        if (pkg.files.main.exports && pkg.files.main.exports[type]) {
          this.exports = [...this.exports, ...pkg.files.main.exports[type]];
        }
        if (pkg.files.main.registers && pkg.files.main.registers[type]) {
          this.registers = [
            ...this.registers,
            ...pkg.files.main.registers[type],
          ];
        }
      }
    },
    getContent() {
      return `${this.imports.join("\n")}\n${this.exports.join(
        "\n"
      )}\n${this.registers.join("\n")}`;
    },
    write() {
      writeFile(`${options.root}main.${options.extension}`, this.getContent());
    },
  };
};
