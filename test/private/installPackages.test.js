"use strict";

const { ok, rejects } = require("assert");
const os = require("os");
const installPackages = require("../../private/installPackages");

module.exports = (tests) => {
  tests.add(
    "`installPackages` with a correct directory and correct packages name",
    () => {
      ok(installPackages(os.tmpdir(), ["npm-packages-size"]));
    }
  );

  tests.add(
    "`installPackages` with a correct directory and non-exist packages name",
    () => {
      rejects(
        installPackages(os.tmpdir(), ["npm-packages-size", "nonexistpackage"])
      );
    }
  );
};
