"use strict";

const std = process.stdout;

function print(name, size) {
  std.write(name.padStart(15) + "\x1b[36m" + size.padStart(15) + "\x1b[0m\n");
}

module.exports = print;
