import React from "react";
import "../../styles/radio-button.css";

interface Props {
  label: string;
  checked: boolean;
  id: string;
  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

export const RadioButton: React.FC<Props> = ({
  label,
  checked,
  id,
  handleChange,
}) => {
  return (
    <label htmlFor={id + "_element"} className="container-radio">
      {label}
      <input
        onChange={handleChange}
        id={id + "_element"}
        type="radio"
        checked={checked}
        name="radio"
      />
      <span className="checkmark"></span>
    </label>
  );
};
