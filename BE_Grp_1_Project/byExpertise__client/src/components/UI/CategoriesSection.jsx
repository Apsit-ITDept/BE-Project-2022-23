import React, { useState, useContext } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "../../styles/CategoriesButton.css";
// import ToggleButtons from "./ToggleButtons";
import { MyContext } from "./../../contexts/MyContext";

export default function CategoriesSection() {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
  const [show, setShow] = useState(false);
  const toggleChecked = () => setShow((value) => !value);

  const [options, setOptions] = useState({
    option1: {
      "2D Animation": 0,
      "3D Animation": 0,
      "Character Animation": 0,
      "3D Modelling": 0,
      "Concept Art": 0,
      "Digital Painting": 0,
      Drawing: 0,
      Illustration: 0,
      Rendering: 0,
      "Comic Book Illustration": 0,
    },
    option2: {
      Photography: 0,
      "Digital Photography": 0,
      "Photography Mobile": 0,
      "Portrait Photography": 0,
      "Macro Photography": 0,
      "Commercial Photography": 0,
      "Architectural Photography": 0,
      "Landscape Photography": 0,
      Photoshop: 0,
    },
    option3: {
      "Visual Effects": 0,
      "3D": 0,
      Composing: 0,
      Keying: 0,
      "Motion Graphics": 0,
    },
    option4: {
      "Brand Design": 0,
      "Product Design": 0,
      Creativity: 0,
      "Digital Publishing": 0,
      "Fashion Design": 0,
      "Logo Design": 0,
      "Banner Design": 0,
      "Poster Design": 0,
      Typography: 0,
    },
    option5: {
      "Oil Painting": 0,
      "Watercolor Painting": 0,
      "Acrylic Painting": 0,
      "Procreate Art": 0,
      Sketching: 0,
      "Pencil Art": 0,
      Drawing: 0,
    },
    option6: {
      Blender: 0,
      "Level Design": 0,
      "Unreal Engine": 0,
      Unity: 0,
      "Digital Game Art": 0,
      "Pixel Art": 0,
      "Game Development": 0,
    },
    option7: {
      "Premier Pro": 0,
      Illustrator: 0,
      "After Effects": 0,
      AutoCad: 0,
      Sketch: 0,
      Lightroom: 0,
      Autodesk: 0,
      Procreate: 0,
      Maya: 0,
    },
    option8: {
      "Film-Making": 0,
      Cinematography: 0,
      "Video Editing": 0,
      "Mobile Video Editing": 0,
      "Video/film Production": 0,
      "Video Audio": 0,
      "Video Gears": 0,
    },
  });
  console.log("options", options);
  let allOptions = [];

  const { data, setData } = useContext(MyContext);
  console.log("data in Category button Section", data);

  const handleClick = () => {
    setData(allOptions);
  };

  for (const option in options) {
    const subOptions = options[option];
    for (const subOption in subOptions) {
      allOptions.push(subOptions[subOption]);
    }
  }

  console.log("allOptions", allOptions);
  let newAllOptions = ["201" + "," + allOptions];
  const arr = newAllOptions[0].split(",");
  console.log("new array", arr);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  const handleSubOptionChange = (option, subOption) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: {
        ...prevOptions[option],
        [subOption]: prevOptions[option][subOption] === 1 ? 0 : 1,
      },
    }));
  };

  const renderSubOptions = (option) => {
    if (!selectedOptions.includes(option)) {
      return null;
    }

    const subOptions = options[option];

    return (
      <>
        {Object.entries(subOptions).map(([subOption, value]) => (
          <div className="cat action">
            <label key={subOption}>
              <input
                type="checkbox"
                checked={value === 1}
                onChange={() => handleSubOptionChange(option, subOption)}
              />
              <span>{subOption}</span>
            </label>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div onClick={handleClick}>
        <div className="toggle__button__container" style={{ gap: "10px" }}>
          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-1"
              wrapperTag="span"
              label="Option 1"
              checked={selectedOptions.includes("option1")}
              onChange={() => handleOptionChange("option1")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option1")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-2"
              wrapperTag="span"
              label="Option 2"
              checked={selectedOptions.includes("option2")}
              onChange={() => handleOptionChange("option2")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option2")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-3"
              wrapperTag="span"
              label="Option 3"
              checked={selectedOptions.includes("option3")}
              onChange={() => handleOptionChange("option3")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option3")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-4"
              wrapperTag="span"
              label="Option 4"
              checked={selectedOptions.includes("option4")}
              onChange={() => handleOptionChange("option4")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option4")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-5"
              wrapperTag="span"
              label="Option 5"
              checked={selectedOptions.includes("option5")}
              onChange={() => handleOptionChange("option5")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option5")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-6"
              wrapperTag="span"
              label="Option 6"
              checked={selectedOptions.includes("option6")}
              onChange={() => handleOptionChange("option6")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option6")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-7"
              wrapperTag="span"
              label="Option 7"
              checked={selectedOptions.includes("option7")}
              onChange={() => handleOptionChange("option7")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option7")}

          <MDBBtnGroup className="toggle__button">
            <MDBCheckbox
              name="btnCheck"
              btn
              id="btn-check-8"
              wrapperTag="span"
              label="Option 8"
              checked={selectedOptions.includes("option8")}
              onChange={() => handleOptionChange("option8")}
            />
          </MDBBtnGroup>

          {renderSubOptions("option8")}
        </div>
      </div>
    </>
  );
}
