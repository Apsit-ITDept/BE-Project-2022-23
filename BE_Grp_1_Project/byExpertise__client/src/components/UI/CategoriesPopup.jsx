import React, { useState } from "react";
import Popup from "./Popup";
import "../../styles/CategoriesPopup.css";
import { Link } from "react-router-dom";

import CategoriesSection from "./CategoriesSection";

function CategoriesPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input type="button" value="Click to Open Popup" onClick={togglePopup} />
      {isOpen && (
        <Popup
          content={
            <>
              <CategoriesSection />

              <Link to="/home">
                {" "}
                <button>Submit</button>
              </Link>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default CategoriesPopup;
