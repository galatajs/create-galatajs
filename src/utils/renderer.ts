import * as fs from "fs";
import * as path from "path";
import { getFileIsExist } from "./fs.helper";
import {
  deepMerge,
  mergeArrayWithDedupe,
  sortPackageDependencies,
} from "./transform.helper";

const createSortByFile = (file: string) => {
  return (a: string, b: string) => {
    if (a.includes("import")) return -1;
    if (b.includes("import")) return 1;
    if (file === "main.ts" && a.includes("create")) return -1;
    if (file === "main.ts" && b.includes("create")) return 1;
    if (file === "main.ts") return a > b ? 1 : -1;
    return 0;
  };
};

const mapLinesForImport = (
  line: string,
  index: number,
  arr: Array<string>
): string | null => {
  if (arr.length > index + 1) {
    if (
      arr[index + 1] &&
      !arr[index + 1].includes("import") &&
      line.includes("import")
    )
      return line + "\n";
  }
  return line;
};

const mergeExistFiles = (src: string, destination: string): boolean => {
  const existing = getFileIsExist(destination);
  const newpkg = getFileIsExist(src);
  if (typeof existing === "string" && typeof newpkg === "string") {
    let file = mergeArrayWithDedupe(existing.split("\n"), newpkg.split("\n"))
      .sort(createSortByFile(src.split("/").slice(-1)[0]))
      .map(mapLinesForImport);
    fs.writeFileSync(destination, file.join("\n"), "utf-8");
    return true;
  }
  return false;
};

const checkSomeFiles = (src: string, destination: string): boolean => {
  const srcs = src.split("/").slice(-2);
  const dests = destination.split("/").slice(-2);
  return srcs.filter((src) => !dests.includes(src)).length === 0;
};

export const renderTemplate = (src: string, destination: string): void => {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (path.basename(src) === "node_modules") return;
    fs.mkdirSync(destination, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(destination, file));
    }
    return;
  }
  const filename = path.basename(src);
  if (filename === "package.json" && fs.existsSync(destination)) {
    const existing = JSON.parse(fs.readFileSync(destination, "utf8"));
    const newPackage = JSON.parse(fs.readFileSync(src, "utf8"));
    const pkg = sortPackageDependencies(deepMerge(existing, newPackage));
    fs.writeFileSync(destination, JSON.stringify(pkg, null, 2) + "\n");
    return;
  }
  if (filename.startsWith("_")) {
    destination = path.resolve(
      path.dirname(destination),
      filename.replace(/^_/, ".")
    );
  }
  if (
    !filename.startsWith(".") &&
    !filename.startsWith("_") &&
    mergeExistFiles(src, destination)
  )
    return;

  if (checkSomeFiles(src, destination) && mergeExistFiles(src, destination))
    return;
  fs.copyFileSync(src, destination);
};
