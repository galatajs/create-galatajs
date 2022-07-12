#!/usr/bin/env node

/**
 * istanbul @create-istanbul
 * Copyright(c) 2022 Sami Salih İBRAHİMBAŞ
 * MIT Licensed
 */

import { getResult } from "./config/config.creator";
import { label } from "./utils/gradient";

async function init() {
  console.log(label);

  const cwd = process.cwd();

  const result = await getResult({
    defaultProjectName: "abc",
    targetDir: cwd,
  });
  console.log(result);
}
init().catch((e) => {
  console.error(e);
  process.exit(1);
});
