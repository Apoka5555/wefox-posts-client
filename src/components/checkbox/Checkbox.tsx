import classNames from "classnames";
import Icon from "../icon/Icon";
import "./Checkbox.scss";

interface CheckBoxProps {
  className?: string;
  labelCopy?: string;
  required?: boolean;
  id: string;
  name: string;
  onChange?: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  labelCopy,
  required,
  id,
  name,
  onChange,
}) => {
  const classes = classNames("checkbox", required && "is-required", className);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <div className={classes} data-component="checkbox">
      <label htmlFor={id}>
        <input type="checkbox" id={id} name={name} onChange={handleCheck} />
        <span className="custom-checkbox">
          <Icon icon="tick" />
        </span>
        {labelCopy && (
          <span className="label-copy">
            <div>
              <p>${labelCopy}</p>
            </div>
          </span>
        )}
      </label>
    </div>
  );
};

export default CheckBox;
