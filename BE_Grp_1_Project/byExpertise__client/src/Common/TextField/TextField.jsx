import React from "react";
import "../../styles/text-field.css";

export const TextField = ({
  label,
  placeholder,
  handleChange,
  type,
  id,
  className,
  styles,
  value,
}) => {
  return (
    <div>
      <label className="label" htmlFor={id + "_element"}>
        {label}
      </label>
      <input
        value={value}
        id={id + "_element"}
        placeholder={placeholder}
        type={type ? type : "text"}
        className={"input " + className}
        style={styles ? styles : {}}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
