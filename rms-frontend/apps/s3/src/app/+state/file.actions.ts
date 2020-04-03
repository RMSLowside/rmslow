import { FileElement } from '@rms-frontend/file-explorer';

export class UploadFiles {
  static readonly type = '[Explorer] Upload Files';
  constructor(public files: FileElement[]) {}
}

export class AddFolder {
  static readonly type = '[Explorer] Add Folder';
  constructor(public folder: FileElement) {}
}

export class DeleteFolder {
  static readonly type = '[Explorer] Delete Folder';
  constructor(public id: string) {}
}

export class DeleteFile {
  static readonly type = '[Explorer] Delete File';
  constructor(public id: string) {}
}

export class RenameFile {
  static readonly type = '[Explorer] Rename File';
  constructor(public id: string, public name: string) {}
}

export class RenameFolder {
  static readonly type = '[Explorer] Rename Folder';
  constructor(public id: string, public name: string) {}
}

export class MoveFolder {
  static readonly type = '[Explorer] Move Folder';
  constructor(public id: string, public parent: string) {}
}

export class MoveFile {
  static readonly type = '[Explorer] Move File';
  constructor(public id: string, public parent: string) {}
}

export class NavigateTo {
  static readonly type = '[Explorer] Navigate To';
  constructor(public folder: FileElement) {}
}

export class NavigateUp {
  static readonly type = '[Explorer] Navigate Up';
  constructor() {}
}
