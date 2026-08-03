import { useState, type ChangeEvent } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import type { TaskType } from "./types";

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

  const removeTask = (id: TaskType["id"]) => {
    let filteredTasks = tasks.filter((t) => t.id != id);
    setTasks(filteredTasks);
  };

  const changeTaskStatus = (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
  ) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task)),
    );
  };

  const deleteAllTasks = () => setTasks([]);

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        addTask={addTask}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        deleteAllTasks={deleteAllTasks}
      />
    </div>
  );
};
