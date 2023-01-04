import "./Button.scss";

export type ButtonProps = {
  text: string;
  onClick: () => void;
};

export default function Button(props: ButtonProps) {
  const { text, onClick } = props;

  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}
