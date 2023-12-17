interface Props {
  icon: JSX.Element;
  type: "button" | "reset" | "submit" | undefined;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

function FormButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      className="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-500 py-2 px-4 text-sm font-medium text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">{props.icon}</span>
      {props.title}
    </button>
  );
}

export default FormButton;
