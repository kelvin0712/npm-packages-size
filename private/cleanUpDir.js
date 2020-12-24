"use strict";

const fs = require("fs");

/**
 * Delete a directory.
 * @param {string} dir A directory that need to be cleaned.
 * @ignore
 */
module.exports = function cleanUp(dir) {
  fs.rmdir(`${dir}`, { recursive: true }, (err) => {
    if (err) console.error(err);

    process.exitCode = 1;
  });
};
