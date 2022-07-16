import { writeFile } from "./file.writer";
import { ExampleFile } from "../packages/package";
import { JavaScriptType } from "../types/types";
import { createDirectoriesToDir } from "../utils/fs.helper";

export type ExternalWriterOptions = {
  root: string;
  extension: string;
};

export const writeFileFromExample = (
  type: JavaScriptType,
  file: ExampleFile,
  options: ExternalWriterOptions
): void => {
  let content: string = "";
  if (file.imports && file.imports[type]) {
    content += file.imports[type].join("\n");
  }
  if (file.header && file.header[type]) {
    content += file.header[type].join("\n");
  }
  if (file.body && file.body[type]) {
    content += file.body[type].join("\n");
  }
  if (file.footer && file.footer[type]) {
    content += file.footer[type].join("\n");
  }
  if (file.exports && file.exports[type]) {
    content += "\n" + file.exports[type].join("\n");
  }
  const dir = `${options.root}`;
  createDirectoriesToDir(dir);
  writeFile(`${options.root}${file.name}.${options.extension}`, content);
};
