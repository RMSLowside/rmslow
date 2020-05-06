module.exports = {
  name: 'create-rule-modal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/create-rule-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
