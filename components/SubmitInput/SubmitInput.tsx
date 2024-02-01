interface Props {
  label: string;
  size: "xs" | "sm" | "md" | "lg";
}

export default function SubmitInput(props: Props) {
  return (
    <div>
      <input value={capitalize(props.label)} type="submit" />
    </div>
  );
}

function capitalize(str: string): string {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
}
