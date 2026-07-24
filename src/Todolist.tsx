import { useState } from "react";
import { Input, Button } from "./components";
import { filterTasks } from "./utils";
import type { TaskType, FilterValuesType } from "./types";

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (taskId: TaskType["id"]) => void;
  deleteAllTasks: () => void;
};

export const Todolist = ({
  title,
  tasks,
  addTask,
  removeTask,
  deleteAllTasks,
}: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const filteredTasks = filterTasks(tasks, filter);

  const addNewTask = () => {
    addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div>
      <h3>{title}</h3>
      {/* <FullInput addTask={addTask} /> */}
      <div>
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.currentTarget.value)}
        />
        <Button onClick={addNewTask}>+</Button>
      </div>
      <ul>
        {filteredTasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <Button onClick={() => removeTask(t.id)}>x</Button>
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={() => setFilter("all")}>All</Button>
        <Button onClick={() => setFilter("active")}>Active</Button>
        <Button onClick={() => setFilter("completed")}>Completed</Button>
      </div>
      <Button onClick={deleteAllTasks}>Delete all tasks</Button>
    </div>
  );
};
