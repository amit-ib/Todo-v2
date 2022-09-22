import { FilterLabel, FilterModel, Filters } from "../models";

export const filters: FilterModel[] = [
  {
    id: 1,
    filter: Filters.ALL,
    text: FilterLabel.ALL,
    defaultActive: "active",
  },
  {
    id: 2,
    filter: Filters.DONE,
    text: FilterLabel.DONE,
  },
  {
    id: 3,
    filter: Filters.PENDING,
    text: FilterLabel.PENDING,
  },
];
