"use strict";

const { ok, rejects } = require("assert");
const path = require("path");
const readFilesInFolder = require("../../private/readFilesInFolder");

module.exports = (tests) => {
  tests.add("`readFilesInFolder` with a correct directory", () => {
    ok(readFilesInFolder(path.join(__dirname, "..")));
  });

  tests.add("`readFilesInFolder` with a incorrect directory", () => {
    rejects(readFilesInFolder(path.join(__dirname, "nonexist")));
  });
};
