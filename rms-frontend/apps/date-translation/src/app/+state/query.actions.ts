// export class updateStartQuery {
//   public static readonly type = '[Query] Update Start Query';
//   constructor(public payload: string) { }
// }

// export class updateStartDate {
//   public static readonly type = '[Query] Update Start Date';
//   constructor(public payload: Date) { }
// }

// export class updateEndDate {
//   public static readonly type = '[Query] Update End Date';
//   constructor(public payload: Date) { }
// }

// export class updateQueryType {
//   public static readonly type = '[Query] Update Query Type';
//   constructor(public payload: string) { }
// }

export class updateEndQuery {
  public static readonly type = '[Query] Update End Query';
  constructor(public payload: string) { }
}
