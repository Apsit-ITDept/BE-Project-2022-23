import React from "react";

interface Props {
  value: string | number | readonly string[] | undefined; //value of the textarea
  placeholder: string; //placeholder text
  styles?: object; //additional styles object
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; //onChange event handler
  label: string; //Label Text
  id: string; //Id of the textarea. Would be postfixed with _element
  className?: string; //Additional CSS classes for the component
}

export const TextArea: React.FC<Props> = ({
  label,
  placeholder,
  handleChange,
  id,
  className,
  styles,
  value,
}) => {
  return (
    <>
      <label className="label" htmlFor={id + "_element"}>
        {label}
      </label>
      <textarea
        value={value}
        id={id + "_element"}
        placeholder={placeholder}
        className={"input " + className}
        style={styles ? styles : {}}
        onChange={handleChange}
      />
    </>
  );
};
