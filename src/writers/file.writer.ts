import { JavaScriptType } from "./../types/types";
import * as fs from "fs";

export const writeFile = (file: string, content: string) => {
  fs.writeFileSync(file, content);
};

const exporters: Record<JavaScriptType, (exports: Array<string>) => string> = {
  typescript: (exports: Array<string>) => `export { ${exports.join(", ")} }`,
  es6: (exports: Array<string>) => `export { ${exports.join(", ")} }`,
  commonjs: (exports: Array<string>) =>
    `module.exports = { ${exports.join(", ")} }`,
};

export const writeExports = (
  type: JavaScriptType,
  exports: Array<string>
): string => {
  return exporters[type](exports);
};
