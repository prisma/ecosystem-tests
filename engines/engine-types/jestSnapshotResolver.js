const os = require('os');
const path = require('path')

module.exports = {
    resolveSnapshotPath: testPath =>
      path.join(
        path.join(path.dirname(testPath), '__snapshots__', os.type()),
        path.basename(testPath) + '.snap'
      ),
    resolveTestPath: snapshotPath =>
      path.join(
        path.dirname(snapshotPath),
        '..',
        '..',
        path.basename(snapshotPath, '.snap')
      ),
    testPathForConsistencyCheck: path.join(
      'consistency_check',
      '__tests__',
      'example.test.js'
    )
};
