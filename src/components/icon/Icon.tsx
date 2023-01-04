import classNames from "classnames";
import { IconSet } from "../svg-icons-set/svg-icon.types";
import { iconDirectory } from "./icons-directory";
import "./Icon.scss";

interface IconProps {
  classNameValue?: string;
  icon: IconSet;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ classNameValue, icon, onClick }) => {
  const classes = classNames("icon", classNameValue);

  const IconValue = iconDirectory[icon];

  return (
    <span className={classes} data-component="icon" onClick={onClick}>
      <IconValue />
    </span>
  );
};

export default Icon;
