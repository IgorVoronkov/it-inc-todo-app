import { useState, type ChangeEvent } from "react";
import { Input, Button } from "./components";
import { filterTasks } from "./utils";
import type { TaskType, FilterValuesType } from "./types";

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  removeTask: (taskId: TaskType["id"]) => void;
  changeTaskStatus: (
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
  ) => void;
  deleteAllTasks: () => void;
};

export const Todolist = ({
  title,
  tasks,
  addTask,
  removeTask,
  changeTaskStatus,
  deleteAllTasks,
}: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const filteredTasks = filterTasks(tasks, filter);
  const isTaskTitleValid = newTaskTitle.length > 0;

  const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_LENGTH = 30;
    const { value } = e.currentTarget;
    if (value.length < MAX_LENGTH) {
      setNewTaskTitle(value);
    } else {
      setValidationMessage(`Maximum ${MAX_LENGTH} letters`);
    }
  };

  const addNewTask = () => {
    if (!newTaskTitle) {
      setValidationMessage("At least 1 letter");
    } else {
      addTask(newTaskTitle);
      setNewTaskTitle("");
      setValidationMessage("");
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <Input
          value={newTaskTitle}
          onChange={changeNewTaskTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNewTask();
            }
          }}
        />
        <Button onClick={addNewTask} disabled={!isTaskTitleValid}>
          +
        </Button>
      </div>
      {validationMessage && (
        <small style={{ color: "red" }}>{validationMessage}</small>
      )}
      <ul>
        {filteredTasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
              checked={t.isDone}
            />
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
