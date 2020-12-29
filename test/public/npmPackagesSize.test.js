"use strict";

const { deepStrictEqual, rejects } = require("assert");
const os = require("os");
const npmPakcagesSize = require("../../public/npmPackagesSize");

module.exports = (tests) => {
  tests.add(
    "`npmPackagesSize` with a correct directory and a package.",
    async () => {
      deepStrictEqual(
        await npmPakcagesSize(os.tmpdir(), ["npm-packages-size"]),
        [
          {
            name: "npm-packages-size",
            size: "5.3 KB",
          },
        ]
      );
    }
  );

  tests.add(
    "`npmPackagesSize` with a correct directory and packages.",
    async () => {
      deepStrictEqual(
        await npmPakcagesSize(os.tmpdir(), ["npm-packages-size", "express"]),
        [
          {
            name: "npm-packages-size",
            size: "5.3 KB",
          },
          {
            name: "express",
            size: "1.6 MB",
          },
        ]
      );
    }
  );

  tests.add(
    "`npmPackagesSize` with a correct directory and a non-exist package name.",
    () => {
      rejects(npmPakcagesSize(os.tmpdir(), ["nonexistname"]));
    }
  );

  tests.add(
    "`npmPackagesSize` with a non-exist package name and an existed package",
    () => {
      rejects(
        npmPakcagesSize(os.tmpdir(), ["nonexistname", "npm-packages-name"])
      );
    }
  );
};
