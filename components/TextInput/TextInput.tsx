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
        <div className={`grid w-full items-center gap-1.5`}>
            <label htmlFor="basic-input" className="text-sm text-gray-700">
                {capitalize(props.label)}
            </label>
            <input
                className={`border p-2`}
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
