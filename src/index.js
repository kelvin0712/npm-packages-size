#!/usr/bin/env node
"use strict";

const os = require("os");
const syPath = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
const print = require("./cli");

const cacheDir = syPath.join(os.tmpdir(), "npm-package-size");

function installPackages(packagesName) {
  return execSync(`npm install --prefix ${cacheDir} ${packagesName.join(" ")}`);
}

function cleanup() {
  fs.rmdir(`${cacheDir}`, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }

    process.exit();
  });
}

function readFilesInPackages(path, arrayOfFiles) {
  arrayOfFiles = arrayOfFiles || [];
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    if (fs.statSync(`${path}/${file}`).isDirectory()) {
      arrayOfFiles = readFilesInPackages(`${path}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(syPath.join(path, file));
    }
  });

  return arrayOfFiles;
}

function convertSize(size) {
  const sizes = ["Bytes", "KB", "MB"];

  if (size === 0) {
    return "n/a";
  }

  const sizeIndex = parseInt(Math.floor(Math.log(size) / Math.log(1024)));

  if (sizeIndex === 0) {
    return `${size} ${sizes[sizeIndex]}`;
  }

  return (size / Math.pow(1024, sizeIndex)).toFixed(1) + " " + sizes[sizeIndex];
}

function getTotalSize(path) {
  const arrayOfFiles = readFilesInPackages(path);

  let totalSize = 0;

  arrayOfFiles.forEach((file) => {
    totalSize += fs.statSync(file).size;
  });

  return convertSize(totalSize);
}

(function main() {
  const packagesName = process.argv.slice(2);

  installPackages(packagesName);

  packagesName.map((packageName) => {
    print(packageName, getTotalSize(`${cacheDir}/node_modules/${packageName}`));
  });

  cleanup();
})();
