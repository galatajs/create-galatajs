#!/usr/bin/env node

/**
 * istanbul @create-istanbul
 * Copyright(c) 2022 Sami Salih İBRAHİMBAŞ
 * MIT Licensed
 */

import * as fs from "fs";
import * as path from "path";
import { getResult } from "./config/config.creator";
import { Config, ConfigNames } from "./config/config.type";
import {
  createDirectoriesToDir,
  createFolderNotExists,
  doEmptyDirectory,
} from "./utils/fs.helper";
import { label } from "./utils/gradient";
import { bold, green } from "kolorist";
import { getCommand } from "./utils/package.helper";
import { Package } from "./packages/package";
import { packages } from "./packages/package.service";
import { createMainFile } from "./writers/main.writer";
import { JavaScriptType } from "./types/types";
import { createAppPackage } from "./packages/app";
import { createProductApp } from "./examples/product/product.app";
import { createPackageJson } from "./writers/package-json.writer";
import { createConfig } from "./writers/config.writer";
import { createMainModuleFile } from "./examples/main.module";

async function init() {
  console.log(label);

  const defaultProjectName = "istanbul-project";
  const targetDir = process.argv.slice(2)[0] || defaultProjectName;
  let config: Config = {};

  try {
    config = await getResult({
      defaultProjectName: defaultProjectName,
      targetDir: targetDir,
    });
  } catch (e: any) {
    console.log(e.message);
    process.exit(1);
  }

  let selectedPackages: Map<ConfigNames, Package> = new Map();
  for (const [key, value] of packages.entries()) {
    if (!!config[key]) {
      selectedPackages.set(key, value);
    }
  }

  const cwd = process.cwd();
  const root = path.join(cwd, targetDir);

  let isExists = fs.existsSync(root);
  if (isExists && config.shouldOverwrite) {
    doEmptyDirectory(root);
  } else if (!isExists) {
    fs.mkdirSync(root);
  }

  console.log(`\nScaffolding project in ${root}...`);

  const name = targetDir && targetDir !== "." ? targetDir : defaultProjectName;

  const opts: {
    type: JavaScriptType;
    name: string;
    root: string;
    version: string;
    extension: string;
  } = {
    name: name,
    root: root,
    version: "0.0.0",
    extension: config.needsTypeScript ? "ts" : "js",
    type: config.needsTypeScript
      ? "typescript"
      : config.needsCommonJS
      ? "commonjs"
      : "es6",
  };
  const packageJson = createPackageJson(opts.type, opts);
  const mainFile = createMainFile(opts.type, opts);
  const mainModule = createMainModuleFile(opts.type, {
    ...opts,
    root: root + "/src",
  });

  const productApp = createProductApp(opts.type, opts);
  const appPackage = createAppPackage();

  packageJson.addFromPackage(appPackage);
  mainFile.addFromPackage(appPackage);

  selectedPackages.forEach((pkg) => {
    packageJson.addFromPackage(pkg);
    mainFile.addFromPackage(pkg);
    productApp.addFromPackage(pkg);
    mainModule.addFromPackage(pkg);
  });

  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent)
    ? "pnpm"
    : /yarn/.test(userAgent)
    ? "yarn"
    : "npm";
  createFolderNotExists(root);
  createConfig(opts.type, {
    root: path.resolve(__dirname, "template").replace("/src", ""),
    destination: root,
  });
  packageJson.write();
  mainFile.write();
  mainModule.write();
  productApp.write();

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, "install")))}`);
  console.log(`  ${bold(green(getCommand(packageManager, "dev")))}`);
  console.log();
}
init().catch((e) => {
  console.error(e);
  process.exit(1);
});
