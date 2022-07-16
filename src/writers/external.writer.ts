import { writeFile } from "./file.writer";
import { ExampleFile } from "../packages/package";
import { JavaScriptType } from "../types/types";
import { createDirectoriesToDir } from "../utils/fs.helper";

export type ExternalWriterOptions = {
  root: string;
  destination: string;
  extension: string;
};

export const writeFileFromExample = (
  type: JavaScriptType,
  file: ExampleFile,
  options: ExternalWriterOptions
): void => {
  let content: string = "";
  if (file.imports && file.imports[type]) {
    content += file.imports[type].join("\n") + "\n\n";
  }
  if (file.header && file.header[type]) {
    content += file.header[type].join("\n") + "\n\n";
  }
  if (file.body && file.body[type]) {
    content += file.body[type].join("\n") + "\n\n";
  }
  if (file.footer && file.footer[type]) {
    content += file.footer[type].join("\n") + "\n\n";
  }
  if (file.exports && file.exports[type]) {
    content += "\n" + file.exports[type].join("\n");
  }
  createDirectoriesToDir(options.destination, options.root);
  writeFile(
    `${options.root}${options.destination}/${file.fileName}.${options.extension}`,
    content
  );
};
