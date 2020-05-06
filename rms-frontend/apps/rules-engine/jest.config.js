module.exports = {
  name: 'Rules Engine',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/rules-engine',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
