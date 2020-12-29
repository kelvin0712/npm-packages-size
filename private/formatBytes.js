"use strict";

const UNITS = ["Bytes", "KB", "MB"];

/**
 * Convert byte to a readable unit.
 * @kind function
 * @name formatBytes
 * @param {number} bytes Number of bytes.
 * @returns {number} Formatted Bytes.
 * @ignore
 */
module.exports = function formatBytes(bytes) {
  if (isNaN(Number(bytes)))
    throw new TypeError("Please pass a valid number to `formatBytes`.");

  const unitIndex = bytes
    ? parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    : 0;

  const test = unitIndex
    ? (bytes / Math.pow(1024, unitIndex)).toFixed(1) + " " + UNITS[unitIndex]
    : `${bytes} ${UNITS[unitIndex]}`;

  return test;
};
