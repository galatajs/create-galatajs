import * as fs from "fs";
import * as path from "path";

export const postOrderDirectoryTraverse = (params: {
  dir: string;
  dirCallback: Function;
  fileCallback: Function;
}): void => {
  const { dir, dirCallback, fileCallback } = params;
  for (const filename of fs.readdirSync(dir)) {
    const fullPath = path.resolve(dir, filename);
    if (fs.lstatSync(fullPath).isDirectory()) {
      postOrderDirectoryTraverse({
        dir: fullPath,
        dirCallback,
        fileCallback,
      });
      dirCallback(fullPath);
      continue;
    }
    fileCallback(fullPath);
  }
};

export const canSkipDirectory = (dir: string): boolean => {
  if (!fs.existsSync(dir)) return true;
  const files = fs.readdirSync(dir);
  if (files.length === 0) return true;
  if (files.length === 1 && files[0] === ".git") return true;
  return false;
};

export const doEmptyDirectory = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    return;
  }

  postOrderDirectoryTraverse({
    dir: dir,
    dirCallback: (dir: string) => fs.rmdirSync(dir),
    fileCallback: (file: string) => fs.unlinkSync(file),
  });
};

export const getFileIsExist = (file: string): any => {
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf-8");
  return null;
};
