"use strict";

const { TestDirector } = require("test-director");

const tests = new TestDirector();

require("./private/getFolderSize.test")(tests);
require("./private/formatBytes.test")(tests);
require("./private/installPackages.test")(tests);
require("./private/readFilesInFolder.test")(tests);
require("./public/npmPackagesSize.test")(tests);

tests.run();
