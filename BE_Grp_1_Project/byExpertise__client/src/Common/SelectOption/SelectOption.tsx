import React from "react";
import "../../styles/select-option.css";
interface Props {
  options: Array<{
    value: string;
    label: string;
  }>;
  label: string;
  id: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectOption: React.FC<Props> = ({
  value,
  options,
  id,
  label,
  handleChange,
}) => {
  return (
    <div className="select">
      <select
        value={value || "label"}
        onChange={handleChange}
        name="select"
        id={id + "_element"}
      >
        <option value="label" disabled>
          {label}
        </option>
        {options.map((o) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};
