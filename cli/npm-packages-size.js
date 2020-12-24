#!/usr/bin/env node

"use strict";

const os = require("os");
const path = require("path");
const cleanUp = require("../private/cleanUpDir");
const npmPackagesSize = require("../public/npmPackagesSize");

const tempDir = path.join(os.tmpdir(), "npm-packages-size");

/**
 * Runs the `npm-packages-size` CLI.
 * @kind function
 * @name npmPackagesSizeCli
 * @returns {Promise<void>} Resolves once the operation is done.
 * @ignore
 */
async function npmPackagesSizeCli() {
  try {
    const packageNames = process.argv.slice(2);

    const packagesAndSize = await npmPackagesSize(tempDir, packageNames);

    packagesAndSize.map(({ packageName, packageSize }) =>
      process.stdout.write(
        packageName.padStart(15) +
          "\x1b[36m" +
          packageSize.padStart(15) +
          "\x1b[0m\n"
      )
    );

    cleanUp(tempDir);

    process.exitCode = 1;
  } catch (err) {
    process.stdout.write(err.stack);

    process.exitCode = 1;
  }
}

npmPackagesSizeCli();
