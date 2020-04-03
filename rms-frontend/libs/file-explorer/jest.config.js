module.exports = {
  name: 'file-explorer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/file-explorer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
