import type { ChangeEventHandler } from "react";

type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
};

export const Input = ({ value, onChange }: InputProps) => {
  return <input value={value} onChange={onChange} />;
};
