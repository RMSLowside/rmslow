module.exports = {
  name: 's3',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/s3',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
