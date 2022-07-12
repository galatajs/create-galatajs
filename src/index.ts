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
import { doEmptyDirectory } from "./utils/fs.helper";
import { label } from "./utils/gradient";
import { renderTemplate } from "./utils/renderer";
import { bold, green } from "kolorist";
import { getCommand } from "./utils/package.helper";
import { generateReadme } from "./utils/readme.helper";
import { Package } from "./packages/package";
import { packages } from "./packages/package.service";

async function init() {
  console.log(label);

  console.info("Not implemented yet");
  process.exit(0);
  return;
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
  const pkg = {
    name: targetDir && targetDir !== "." ? targetDir : defaultProjectName,
    version: "0.0.0",
  };
  fs.writeFileSync(
    path.resolve(root, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  const templateRoot = path.resolve(__dirname, "template");
  const render = (templateName: string): void => {
    const dir = path.resolve(templateRoot, templateName);
    renderTemplate(dir, root);
  };
  let baseDir = "";
  if (config.needsTypeScript) {
    baseDir = "typescript";
  } else if (config.needsCommonJS) {
    baseDir = "commonjs";
  }
  if (config.needsModuleBased) {
    baseDir += "-module";
  }

  render(`${baseDir}/base`);

  selectedPackages.forEach((pkg) => {
    render(`${baseDir}/config/${pkg.name}`);
  });
  selectedPackages.forEach((pkg) => {
    render(`${baseDir}/code/${pkg.name}`);
  });
  selectedPackages.forEach((pkg) => {
    render(`${baseDir}/entry/${pkg.name}`);
  });

  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent)
    ? "pnpm"
    : /yarn/.test(userAgent)
    ? "yarn"
    : "npm";
  fs.writeFileSync(
    path.resolve(root, "README.md"),
    generateReadme({
      projectName: pkg.name,
      packageManager: packageManager,
      needsTypeScript: config.needsTypeScript!,
    })
  );

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
