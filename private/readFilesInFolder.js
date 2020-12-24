"use strict";

const fs = require("fs");
const path = require("path");

/**
 * Get all files in a folder.
 * @kind function
 * @name readFilesInFolder
 * @param {string} dir A directory to a specific folder.
 * @returns {Promise<string[]>} An array of files.
 * @ignore
 */
module.exports = async function readFilesInFolder(dir) {
  let files = await fs.promises.readdir(dir);

  files = await Promise.all(
    files.map(async (file) => {
      const stats = await fs.promises.lstat(path.join(dir, file));
      if (stats.isDirectory()) return readFilesInFolder(path.join(dir, file));
      else return path.join(dir, file);
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
};
