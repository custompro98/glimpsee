import { ChangeEventHandler } from "react";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TextInput(props: Props) {
  return (
    <div>
      <label htmlFor="basic-input">{capitalize(props.label)}</label>
      <input
        placeholder={capitalize(props.placeholder)}
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

function capitalize(str: string): string {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
}
