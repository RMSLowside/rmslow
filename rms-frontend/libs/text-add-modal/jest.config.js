module.exports = {
  name: 'text-add-modal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/text-add-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
