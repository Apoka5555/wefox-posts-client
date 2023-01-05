import classNames from "classnames";
import { useState } from "react";
import "./InputField.scss";

interface InputFieldProps {
  type: "tel" | "text" | "email";
  label: string;
  id: string;
  name: string;
  placeholder: string;
  maxLength?: number;
  className?: string;
  required?: boolean;
  hideMaxLength?: boolean;
  isError?: boolean;
  isValid?: boolean;
  patternErrorMessage?: string;
  validationErrorType?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  className,
  type,
  label,
  id,
  name,
  placeholder,
  maxLength,
  required,
  hideMaxLength,
  isError,
  isValid,
  patternErrorMessage,
  validationErrorType,
  value,
  onChange,
}) => {
  const classes = classNames(
    className,
    "input-field",
    isError && "is-error",
    isValid && "is-valid"
  );

  const [remainingCharactersCount, setRemainingCharactersCount] = useState<
    number | undefined
  >(maxLength);

  const getErrorMessage = () => {
    switch (validationErrorType) {
      case "pattern":
        return patternErrorMessage;
      case "maxLength":
        return `Maximum characters are ${maxLength}`;
      default:
        return "This field is required";
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }

    if (maxLength && !hideMaxLength) {
      const count = maxLength - event.target.value.length;

      if (count >= -1) {
        setRemainingCharactersCount(count);
      }
    }
  };

  return (
    <div className={classes} data-component="input-field">
      <label htmlFor={id}>{label}</label>
      {required && <span className="required-copy">Required</span>}
      <div className="field-wrapper">
        <input
          type={type}
          id={id}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          inputMode={type === "tel" ? "numeric" : "text"}
          onChange={handleOnChange}
          maxLength={maxLength}
        />
        {maxLength && !hideMaxLength && (
          <span
            className={classNames(
              "character-count",
              remainingCharactersCount === -1 && "is-limit-exceeded"
            )}
          >
            {remainingCharactersCount}
          </span>
        )}
      </div>
      {isError && (
        <span className="error-message">
          <span className="error-icon">!</span>
          {getErrorMessage()}
        </span>
      )}
    </div>
  );
};

export default InputField;
