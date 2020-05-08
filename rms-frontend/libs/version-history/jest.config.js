module.exports = {
  name: 'version-history',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/version-history',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
