"use strict";

const { ok, rejects } = require("assert");
const path = require("path");
const getFolderSize = require("../../private/getFolderSize");

module.exports = (tests) => {
  tests.add("`getFolderSize` with a correct directory", () => {
    ok(getFolderSize(__dirname));
  });

  tests.add("`getFolderSize` with a non-existent created directory", () => {
    rejects(getFolderSize(path.join(__dirname, "nonexistent")));
  });
};
