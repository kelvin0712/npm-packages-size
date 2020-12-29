"use strict";

const path = require("path");
const getFolderSize = require("../private/getFolderSize");
const installPackages = require("../private/installPackages");

/**
 * Get install size of all packages in a directory
 * @kind function
 * @name npmPackagesSize
 * @param {string} dir A directory to all packages.
 * @param {string[]} packageNames An array of all package names.
 * @returns {object.<string>} Packages names and sizes.
 */
module.exports = async function npmPackagesSize(dir, packageNames) {
  try {
    await installPackages(dir, packageNames);
  } catch (err) {
    throw new TypeError("One of the packages does not exist.");
  }

  const packagesSize = packageNames.reduce(async (acc, curr) => {
    const packageSize = await getFolderSize(
      path.join(dir, "node_modules", curr)
    );
    return [
      ...(await acc),
      {
        name: curr,
        size: packageSize,
      },
    ];
  }, []);

  return packagesSize;
};
