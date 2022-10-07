export interface StatusModal {
  id: number;
  title: string;
}

export enum ToDoStatus {
  ALL = 0,
  PENDING = 1,
  INPROGRESS = 2,
  COMPLETED = 3,
  ARCHIVED = 4,
}
