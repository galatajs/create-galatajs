import { writeFile } from "./file.writer";
import { Dependencies, Package } from "../packages/package";
import { PackageAdderToFile, FileWriter } from "../types/file";
import { JavaScriptType } from "../types/types";

export interface PackageJsonFile extends PackageAdderToFile, FileWriter {
  dependencies: Dependencies;
  devDependencies: Dependencies;
  peerDependencies: Dependencies;
  optionalDependencies: Dependencies;
}

export type PackageJsonOptions = {
  root: string;
  name: string;
  version: string;
};

export const createPackageJson = (
  type: JavaScriptType,
  options: PackageJsonOptions
): PackageJsonFile => {
  return {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
    optionalDependencies: {},
    addFromPackage(pkg: Package) {
      if (pkg.files && pkg.files.packageJson) {
        if (pkg.files.packageJson.dependencies) {
          this.dependencies = {
            ...this.dependencies,
            ...pkg.files.packageJson.dependencies[type],
          };
        }
        if (pkg.files.packageJson.devDependencies) {
          this.devDependencies = {
            ...this.devDependencies,
            ...pkg.files.packageJson.devDependencies[type],
          };
        }
        if (pkg.files.packageJson.peerDependencies) {
          this.peerDependencies = {
            ...this.peerDependencies,
            ...pkg.files.packageJson.peerDependencies[type],
          };
        }
        if (pkg.files.packageJson.optionalDependencies) {
          this.optionalDependencies = {
            ...this.optionalDependencies,
            ...pkg.files.packageJson.optionalDependencies[type],
          };
        }
      }
    },
    getContent() {
      return JSON.stringify({
        name: options.name,
        version: options.version,
        dependencies: this.dependencies,
        devDependencies: this.devDependencies,
        peerDependencies: this.peerDependencies,
        optionalDependencies: this.optionalDependencies,
      });
    },
    write() {
      writeFile(`${options.root}package.json`, this.getContent());
    },
  };
};
