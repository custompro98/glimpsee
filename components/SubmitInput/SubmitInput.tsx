interface Props {
    label: string;
    size: "xs" | "sm" | "md" | "lg";
}

export default function SubmitInput(props: Props) {
    let width = "w-1/6";

    if (props.size === "sm") {
        width = "w-1/3";
    } else if (props.size === "md") {
        width = "w-2/3";
    } else if (props.size === "lg") {
        width = "w-full";
    }

    return (
        <div className="flex flex-row-reverse">
            <input
                className={`border p-2 ${width}`}
                value={capitalize(props.label)}
                type="submit"
            />
        </div>
    );
}

function capitalize(str: string): string {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
}
