"use strict";

const fs = require("fs");
const formatBytes = require("./formatBytes");
const readFilesInFolder = require("./readFilesInFolder");

/**
 * Get the size of a folder in a directory.
 * @kind function
 * @name getTotalSize
 * @param {string} dir A directory to the folder.
 * @returns {Promise<number>} Formatted size of the folder.
 * @ignore
 */
module.exports = async function getTotalSize(dir) {
  const arrayOfFiles = await readFilesInFolder(dir);

  let totalSize = 0;

  arrayOfFiles.forEach((file) => {
    totalSize += fs.statSync(file).size;
  });

  return formatBytes(totalSize);
};
