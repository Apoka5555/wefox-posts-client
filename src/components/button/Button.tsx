import classNames from "classnames";
import "./Button.scss";

export type ButtonProps = {
  className?: string;
  text: string;
  onClick: () => void;
};

export default function Button(props: ButtonProps) {
  const { className, text, onClick } = props;

  return (
    <button className={classNames("button", className)} onClick={onClick}>
      {text}
    </button>
  );
}
