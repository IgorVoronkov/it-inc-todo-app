import { useState } from "react";
import { Input, Button } from "./components";
import type { TaskType, FilterValuesType } from "./types";

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (taskId: TaskType["id"]) => void;
  deleteAllTasks: () => void;
  changeFilter: (value: FilterValuesType) => void;
};

export const Todolist = ({
  title,
  tasks,
  addTask,
  removeTask,
  deleteAllTasks,
  changeFilter,
}: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

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
        {tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <Button onClick={() => removeTask(t.id)}>x</Button>
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={() => changeFilter("all")}>All</Button>
        <Button onClick={() => changeFilter("active")}>Active</Button>
        <Button onClick={() => changeFilter("completed")}>Completed</Button>
      </div>
      <Button onClick={deleteAllTasks}>Delete all tasks</Button>
    </div>
  );
};
