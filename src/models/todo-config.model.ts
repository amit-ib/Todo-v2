import { CategoryModal } from "./category.model";
import { StatusModal } from "./status.model";

export interface TodoConfigModal {
  priority: StatusModal[];
  category: CategoryModal[];
  status: StatusModal[];
}
