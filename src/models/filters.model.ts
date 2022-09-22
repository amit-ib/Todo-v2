export interface FilterModel {
  id: number;
  filter: Filters;
  text: FilterLabel;
  defaultActive?: string;
}

export enum Filters {
  ALL = "all",
  PENDING = "pending",
  DONE = "done",
}

export enum FilterLabel {
  ALL = "All",
  PENDING = "Pending",
  DONE = "Done",
}
