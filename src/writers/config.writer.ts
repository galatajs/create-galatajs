import * as fs from "fs";
import { JavaScriptType } from "../types/types";

export type Options = {
  root: string;
  destination: string;
};

export const createConfig = (type: JavaScriptType, options: Options) => {
  if (type === "typescript") createTsConfig(options.root, options.destination);
  else createJsConfig(options.root, options.destination);
};

const createTsConfig = (root: string, destination: string): void => {
  fs.copyFileSync(`${root}/tsconfig.json`, `${destination}/tsconfig.json`);
};

const createJsConfig = (root: string, destination: string): void => {
  fs.copyFileSync(`${root}/jsconfig.json`, `${destination}/jsconfig.json`);
};
