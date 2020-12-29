"use strict";

const { strictEqual, throws } = require("assert");
const formatBytes = require("../../private/formatBytes");

module.exports = (tests) => {
  tests.add("`formatBytes` with 0 bytes", () => {
    strictEqual(formatBytes(0), "0 Bytes");
  });

  tests.add("`formatBytes` with 1.0 KB", () => {
    strictEqual(formatBytes(1024), "1.0 KB");
  });

  tests.add("`formatBytes` with 1.0 MB", () => {
    strictEqual(formatBytes(Math.pow(1024, 2)), "1.0 MB");
  });

  tests.add("`formatBytes` with undefined", () => {
    throws(() => {
      formatBytes(undefined);
    }, new TypeError("Please pass a valid number to `formatBytes`."));
  });

  tests.add("`formatBytes` with a string", () => {
    throws(() => {
      formatBytes("haha");
    }, new TypeError("Please pass a valid number to `formatBytes`."));
  });
};
