module.exports = {
  name: 'help-modal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/help-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
