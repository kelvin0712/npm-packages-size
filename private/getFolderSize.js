"use strict";

const fs = require("fs");
const formatBytes = require("./formatBytes");
const readFilesInFolder = require("./readFilesInFolder");

/**
 * Get the size of a folder in a directory.
 * @kind function
 * @name getTotalSize
 * @param {string} dir A directory to the folder.
 * @returns {Promise<string>} Formatted size of the folder.
 * @ignore
 */
module.exports = async function getTotalSize(dir) {
  let totalSize = 0;

  try {
    const arrayOfFiles = await readFilesInFolder(dir);

    arrayOfFiles.forEach((file) => {
      totalSize += fs.statSync(file).size;
    });
  } catch (err) {
    throw new TypeError(`Cannot read files in ${dir}`);
  }

  return formatBytes(totalSize);
};
