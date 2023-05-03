import React from "react";
import "../../styles/button.css";

export const Button = ({ handleClick, value, id, className, styles }) => {
  return (
    <div>
      <button
        id={`${id}_element`}
        className={`button ${className}`}
        style={styles ? styles : {}}
        onClick={handleClick}
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
