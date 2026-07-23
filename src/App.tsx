import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import type { TaskType, FilterValuesType } from "./types";

export const App = () => {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: "1", title: "HTML&CSS", isDone: true },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "ReactJS", isDone: false },
    { id: "4", title: "Rest API", isDone: false },
    { id: "5", title: "GraphQL", isDone: false },
  ]);

  const addTask = (title: string) => {
    const id = crypto.randomUUID();
    const newTask: TaskType = { id, title, isDone: false };
    setTasks((tasks) => [newTask, ...tasks]);
  };

  function removeTask(id: TaskType["id"]) {
    let filteredTasks = tasks.filter((t) => t.id != id);
    setTasks(filteredTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
};
