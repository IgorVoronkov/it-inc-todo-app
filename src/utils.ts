import type { FilterValuesType, TaskType } from "./types";

export const filterTasks = (tasks: TaskType[], filter: FilterValuesType) => {
  switch (filter) {
    case "active":
      return tasks.filter((t) => t.isDone === false);
    case "completed":
      return tasks.filter((t) => t.isDone === true);
    default:
      return tasks;
  }
};
