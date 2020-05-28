module.exports = {
  name: 'data-table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-table',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
