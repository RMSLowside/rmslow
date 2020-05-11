import { VersionHistory } from '@rms-frontend/version-history';
export class HistoryAction {
  public static readonly type = '[History] Set histories';
  constructor(public histories: VersionHistory[]) {}
}

export class AddHistory {
  public static readonly type = '[History] Add history';
  constructor(public history: VersionHistory) {}
}
