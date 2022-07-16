import { JavaScriptType } from "../types/types";

export interface Package {
  name: string;
  configName: string;
  files?: PackageFiles;
}

export type PackageFiles = {
  packageJson?: {
    dependencies?: DependenciesWithTypes;
    devDependencies?: DependenciesWithTypes;
    peerDependencies?: DependenciesWithTypes;
    optionalDependencies?: DependenciesWithTypes;
  };
  main?: MainFile;
  examples?: ExampleFile[];
};

export type CodeArray = Record<JavaScriptType, string[]>;
export type DependenciesWithTypes = Record<JavaScriptType, Dependencies>;
export type Dependencies = Record<string, string>;
export type MainFile = BaseFile;
export interface ExampleFile extends FullFile {
  name: string;
  unique: boolean;
  fileName: string;
}
export type BaseFile = {
  imports?: CodeArray;
  exports?: CodeArray;
  registers?: CodeArray;
  footer?: CodeArray;
};
export interface FullFile extends BaseFile {
  header?: CodeArray;
  body?: CodeArray;
}
