import { FullFile } from "../packages/package";
import { FileWriter, PackageAdderToFile } from "../types/file";

export interface BaseApp extends PackageAdderToFile, FileWriter, FullFile {
  name: string;
}

export interface AppFile extends FileWriter, FullFile {}
export interface AppFileWithAdder
  extends PackageAdderToFile,
    FileWriter,
    FullFile {}
