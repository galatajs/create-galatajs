import { Package } from "../packages/package";

export type FileWriter = {
  write(): void;
  getContent(): string;
};
export type PackageAdderToFile = {
  addFromPackage(pkg: Package): void;
};
export type MainFileCodes = {
  imports: Array<string>;
  exports: Array<string>;
  registers: Array<string>;
  footers: Array<string>;
};
