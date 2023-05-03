import React, { useState } from "react";
import "../../styles/ToggleButton.css";

function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <button
      onClick={handleClick}
      className={isOn ? "ToggleButton On" : "ToggleButton Off"}
    >
      Test {isOn ? "ON" : "OFF"}
    </button>
  );
}

export default ToggleButton;
