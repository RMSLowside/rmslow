module.exports = {
  name: 'date-translation',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/date-translation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
