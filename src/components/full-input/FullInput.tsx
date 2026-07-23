import {
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
} from "react";

type FullInputProps = {
  addTask: (title: string) => void;
};

export const FullInput = ({ addTask }: FullInputProps) => {
  const [title, setTitle] = useState("");

  const onChangeInputHandler: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onClickButtonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    addTask(title);
    setTitle("");
  };

  return (
    <div>
      <input value={title} onChange={onChangeInputHandler} />
      <button onClick={onClickButtonHandler}>+</button>
    </div>
  );
};
