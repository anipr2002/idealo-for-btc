import { ChangeEventHandler } from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
};

const Input = (props: InputProps) => {
  return (
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      className={"border border-white/10 bg-blue-950 p-2 " + props.className}
      placeholder={props.placeholder || ""}
    />
  );
};

export default Input;
