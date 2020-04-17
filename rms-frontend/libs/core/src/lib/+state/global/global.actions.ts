export class SetTheme {
  public static readonly type = '[Global] Set Theme';
  constructor(public theme: string) {}
}
