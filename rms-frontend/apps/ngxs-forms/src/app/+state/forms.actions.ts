export class SetFormsGroup {
  static readonly type = '[Set] Set Forms Group';
  constructor(public model: any) { }
}

export class SaveToDraft {
  static readonly type = '[Set] Save To Draft';
  constructor(public model: any) { }
}

export class GetHelpContent {
  static readonly type = '[Set] Get Help Content';
  constructor() { }
}

export class SetHelpContent {
  static readonly type = '[Set] Set Help Content';
  constructor(public model: any) { }
}