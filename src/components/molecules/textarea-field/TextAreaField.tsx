import classNames from "classnames";
import { useState } from "react";
import "./TextAreaField.scss";

interface TextAreaFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  rows: number;
  maxLength?: number;
  className?: string;
  required?: boolean;
  isError?: boolean;
  isValid?: boolean;
  validationErrorType?: string;
  patternErrorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  className,
  label,
  id,
  name,
  placeholder,
  rows,
  maxLength,
  required,
  isError,
  isValid,
  validationErrorType,
  patternErrorMessage,
  value,
  onChange,
}) => {
  const classes = classNames(
    className,
    "text-area-field",
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

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }

    if (maxLength) {
      const count = maxLength - event.target.value.length;

      if (count >= -1) {
        setRemainingCharactersCount(count);
      }
    }
  };

  return (
    <div className={classes} data-component="textarea-field">
      <label htmlFor={id}>{label}</label>
      {required && <span className="required-copy">Required</span>}
      <div className="field-wrapper">
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={handleOnChange}
          maxLength={maxLength}
        />
        {maxLength && (
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

export default TextAreaField;
