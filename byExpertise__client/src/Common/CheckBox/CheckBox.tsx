import React from "react";
import "../../styles/checkbox.css";
interface Props {
  label: string;
  checked: boolean;
  id: string;
  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

export const CheckBox: React.FC<Props> = ({
  label,
  id,
  checked,
  handleChange,
}) => {
  return (
    <label htmlFor={id + "_element"} className="container-checkbox">
      {label}
      <input
        onChange={handleChange}
        id={id + "_element"}
        type="checkbox"
        checked={checked}
      />
      <span className="checkmark"></span>
    </label>
  );
};
