"use strict";

const { exec } = require("child_process");

/**
 * Install packages into a temporary folder.
 * @kind function
 * @name installPackages
 * @param {string} dir A directory to install packages.
 * @param {string[]} packageNames Name of all packages need to be installed.
 * @returns {Promise} A promise
 * @ignore
 */
module.exports = function installPackages(dir, packageNames) {
  return new Promise((resolve, reject) => {
    exec(
      `npm install --prefix ${dir} ${packageNames.join(" ")}`,
      (err, stdout, stderr) => {
        if (err) reject(err);

        resolve(stdout ? stdout : stderr);
      }
    );
  });
};
