'use strict';

const reporters = require('jasmine-reporters');

const circleCiOutputDirectory = process.env.CIRCLE_TEST_REPORTS;

if (circleCiOutputDirectory) {
  const reporter = new reporters.JUnitXmlReporter({
    consolidateAll: false,
    savePath: `${circleCiOutputDirectory}/jest/`,
  });

  jasmine.getEnv().addReporter(reporter);
}
