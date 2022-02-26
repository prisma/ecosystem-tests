import { getCustomEngines } from "./utils";

// globalSetup.ts
module.exports = async () => {
  /**
   * This is required as `beforeAll` does not work with `test.concurrent` {@link https://github.com/facebook/jest/issues/7997 (issue)}
   */
  await getCustomEngines()
};