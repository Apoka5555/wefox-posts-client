import classNames from "classnames";
import { MouseEventHandler } from "react";
import "./overlay.scss";

interface OverlayProps {
  className?: string;
  isVisible: boolean;
  handleClick: MouseEventHandler;
}

const Overlay: React.FC<OverlayProps> = ({
  className,
  isVisible,
  handleClick,
}) => {
  const classes = classNames("overlay", isVisible && "is-visible", className);
  return <div className={classes} onClick={handleClick}></div>;
};

export default Overlay;
