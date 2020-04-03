module.exports = {
  name: 'lazy-load',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lazy-load',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
