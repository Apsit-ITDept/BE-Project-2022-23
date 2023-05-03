import React from "react";
import "../../styles/date-picker.css";
interface Props {
  label: string;
  id: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker: React.FC<Props> = ({
  id,
  label,
  handleChange,
  value,
}) => {
  return (
    <div>
      <label className="date-picker-label" htmlFor={id + "_element"}>
        {label}
      </label>
      <input
        value={value}
        className="date-picker"
        type="date"
        onChange={handleChange}
        name={id + "_element"}
        id={id + "_element"}
      />
    </div>
  );
};
