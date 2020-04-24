export class QueryAction {
  public static readonly type = '[Query] Add item';
  constructor(public payload: string) { }
}