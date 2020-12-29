#!/usr/bin/env node

"use strict";

const os = require("os");
const path = require("path");
const columnify = require("columnify");
const kleur = require("kleur");
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

    console.group(`${kleur.bold("All packages size:")}\n`);
    console.group(
      columnify(packagesAndSize, {
        minWidth: 20,
        headingTransform: (header) => kleur.bold(header.toUpperCase()),
        config: {
          size: {
            dataTransform: (data) => kleur.green(data),
          },
          name: {
            dataTransform: (data) => kleur.yellow(data),
          },
        },
      })
    );
    console.groupEnd();
    console.groupEnd();

    cleanUp(tempDir);

    console.info(`\n${kleur.bold().green(`All done.`)}\n`);
  } catch (err) {
    console.group(
      // Whitespace blank lines shouldn’t have redundant indentation or color.
      `\n${kleur.bold().red(`Error running npm-packages-size:`)}\n`
    );
    console.error(kleur.red(err.message ? err.message : err));
    console.groupEnd();

    // Blank line.
    console.error();

    process.exitCode = 1;
  }
}

npmPackagesSizeCli();
