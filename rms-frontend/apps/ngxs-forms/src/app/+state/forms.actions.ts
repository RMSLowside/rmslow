import { QuestionBase } from '@rms-frontend/forms';

export class SetFormsGroup {
  static readonly type = '[Set] Set Forms Group';
  constructor(public model: any) { }
}

export class ToFormGroup {
  static readonly type = '[Convert] To Form Group';
  constructor(public question: any) { }
}

export class SetFormQuestions {
  static readonly type = '[Set] Set Form Questions';
  constructor(public question: any) { }
}

export class SaveToDraft {
  static readonly type = '[Set] Save To Draft';
  constructor(public model: any) { }
}