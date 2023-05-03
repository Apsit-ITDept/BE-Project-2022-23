/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { categoryContext } from "../../contexts/createCategory";
import { signUp } from "../../actions/user";
import { createCategory } from "../../actions/createCategory";
import { getModelOutput } from "../../actions/getModelOutput";
import { getModelOutput2 } from "../../actions/getModelOutput2";
import { Button } from "../../Common/Button/Button";
import {
  isEmailValid,
  isPasswordValid,
  isNameValid,
} from "../../helpers/validate";
import { History } from "history";
import { CLEAR_ERRORS } from "../../actions/Types";
import { LoadingContext } from "../../contexts/Loading";
import { Loading } from "../../Common/Loading/Loading";
import "../../styles/sign-in-sign-up.css";

import { TextField } from "../../Common/TextField/TextField";
import { ToastContainer, toast } from "react-toastify";
import CategoriesSection from "../../components/UI/CategoriesSection";
import { Link } from "react-router-dom";
import { startLoading, stopLoading } from "../../actions/loading";
import axios from "axios";
import { API_URL } from "../../actions/serverConnection";
import { useNavigate } from "react-router-dom";
import getUser from "../../helpers/DecodeJwt";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  LOGOUT,
} from "../../actions/Types";
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

// import ToggleButtons from "./../../components/UI/ToggleButtons";

function SignUp(props) {
  const navigate = useNavigate();
  const getUSerId = async () => {
    try {
      const resultID = await axios.get(`${API_URL}/user/get-user`, {});
      // const modelOutput = await axios.get(`${API_URL}/model/run-python`, {});

      const newUserValue = resultID.data.getUSerId.id;
      console.log("result getUserId in signUp", newUserValue);
      return { newUserValue };
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  // call the getUserId function and store the result in a state variable
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    getUSerId()
      .then((data) => setUserDetails(data))
      .catch((err) => console.log(err));
  }, []);

  // access newUserValue from the state variable using destructuring
  const { newUserValue } = userDetails || {};
  const newUserValue2 = newUserValue + 1;

  console.log("newUserValue: ", newUserValue2);
  const userData = getUser();

  // call the getUserId function and store the result in a state variable
  // const [userModelOutput, setUserModelOutput] = useState(null);
  // useEffect(() => {
  //   getUSerId()
  //     .then((data) => setUserModelOutput(data))
  //     .catch((err) => console.log(err));
  // }, []);

  // // access newUserValue from the state variable using destructuring
  // const { modelOutputData } = userModelOutput || {};

  // console.log("modelOutput in signUp: ", modelOutputData);
  // // let numbers = modelOutputData.split(" ").map(Number);
  // // console.log("numbers: ", numbers)
  // const modelOutputDataArr = modelOutputData
  //   ?.split(" ")
  //   .slice(2, -1)
  //   .filter((item) => item !== "");

  // const handleClickModelOutput = () => {
  //   props.sendData(modelOutputDataArr);
  // };

  // console.log("modelOutput in signUp: ", modelOutputDataArr);

  // console.log("type of modelOutput in signUp: ", typeof modelOutputData);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
  const [show, setShow] = useState(false);
  const toggleChecked = () => setShow((value) => !value);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: categoryState, dispatch: categoryDispatch } =
    useContext(categoryContext);
  const { state: getModelState, dispatch: getModelDispatch } =
    useContext(categoryContext);
  const { state: loadingState, dispatch: loadingDispatch } =
    useContext(LoadingContext);

  const handleModalClick = () => {
    createCategory(
      user_id,
      twod_animation,
      threed_animation,
      character_animation,
      threed_modelling,
      concept_art,
      digital_painting,
      drawing,
      illustration,
      rendering,
      comic_book_illustration,
      brand_design,
      product_design,
      creativity,
      digital_publishing,
      fashion_design,
      logo_design,
      banner_design,
      poster_design,
      typography,
      visual_effects,
      threed,
      composing,
      keying,
      motion_graphics,
      oil_painting,
      acrylic_painting,
      procreate_art,
      sketching,
      pencil_art,
      photography,
      digital_photography,
      photography_mobile,
      potrait_photography,
      macro_photography,
      commercial_photography,
      architectural_photography,
      landscape_photography,
      photoshop,
      blender,
      level_design,
      unreal_engine,
      unity,
      digital_game_art,
      pixel_art,
      game_development,
      premier_pro,
      illustrator,
      after_effects,
      autocad,
      sketch,
      lightroom,
      autodesk,
      procreate,
      maya,
      film_making,
      cinematography,
      video_editing,
      mobile_video_editing,
      video_film_production,
      video_audio,
      video_gears
    )(categoryDispatch, loadingDispatch);
    getModelOutput()(getModelDispatch, loadingDispatch);
    getModelOutput2()(getModelDispatch, loadingDispatch);

    // navigate("/home");
  };

  const handleClick = () => {
    const emailValid = isEmailValid(email);
    const passwordValid = isPasswordValid(password);
    const fnameValid = isNameValid(fname);
    const lnameValid = isNameValid(lname);

    if (emailValid && passwordValid && fnameValid && lnameValid) {
      setEmailError("");
      setPasswordError("");
      setFnameError("");
      setLnameError("");
      signUp(
        fname,
        lname,
        email,
        password,
        props?.history
      )(userDispatch, loadingDispatch);
    } else {
      if (!emailValid) {
        setEmailError("Email is invalid");
      }
      if (!passwordValid) {
        setPasswordError(
          "Password is invalid. Must contain atleast 8 characters"
        );
      }
      if (!fnameValid) {
        setFnameError(
          "First Name is invalid. Must contain atleast 1 character"
        );
      }
      if (!lnameValid) {
        setLnameError("Last Name is invalid. Must contain atleast 1 character");
      }
    }
  };

  useEffect(() => {
    userDispatch({ type: CLEAR_ERRORS });
    if (localStorage.getItem("token")) {
      props.history?.push("/");
    }
  }, []);

  function handleBothClick() {
    handleClick();
    toggleShow();
  }

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

  let allOptions = [];

  for (const option in options) {
    const subOptions = options[option];
    for (const subOption in subOptions) {
      allOptions.push(subOptions[subOption]);
    }
  }

  let newAllOptions = [newUserValue2 + "," + allOptions];
  const arr = newAllOptions[0].split(",");

  const [
    user_id,
    twod_animation,
    threed_animation,
    character_animation,
    threed_modelling,
    concept_art,
    digital_painting,
    drawing,
    illustration,
    rendering,
    comic_book_illustration,
    brand_design,
    product_design,
    creativity,
    digital_publishing,
    fashion_design,
    logo_design,
    banner_design,
    poster_design,
    typography,
    visual_effects,
    threed,
    composing,
    keying,
    motion_graphics,
    oil_painting,
    acrylic_painting,
    procreate_art,
    sketching,
    pencil_art,
    photography,
    digital_photography,
    photography_mobile,
    potrait_photography,
    macro_photography,
    commercial_photography,
    architectural_photography,
    landscape_photography,
    photoshop,
    blender,
    level_design,
    unreal_engine,
    unity,
    digital_game_art,
    pixel_art,
    game_development,
    premier_pro,
    illustrator,
    after_effects,
    autocad,
    sketch,
    lightroom,
    autodesk,
    procreate,
    maya,
    film_making,
    cinematography,
    video_editing,
    mobile_video_editing,
    video_film_production,
    video_audio,
    video_gears,
  ] = arr;
  console.log("data to send", {
    user_id,
    twod_animation,
    threed_animation,
    character_animation,
    threed_modelling,
    concept_art,
    digital_painting,
    drawing,
    illustration,
    rendering,
    comic_book_illustration,
    brand_design,
    product_design,
    creativity,
    digital_publishing,
    fashion_design,
    logo_design,
    banner_design,
    poster_design,
    typography,
    visual_effects,
    threed,
    composing,
    keying,
    motion_graphics,
    oil_painting,
    acrylic_painting,
    procreate_art,
    sketching,
    pencil_art,
    photography,
    digital_photography,
    photography_mobile,
    potrait_photography,
    macro_photography,
    commercial_photography,
    architectural_photography,
    landscape_photography,
    photoshop,
    blender,
    level_design,
    unreal_engine,
    unity,
    digital_game_art,
    pixel_art,
    game_development,
    premier_pro,
    illustrator,
    after_effects,
    autocad,
    sketch,
    lightroom,
    autodesk,
    procreate,
    maya,
    film_making,
    cinematography,
    video_editing,
    mobile_video_editing,
    video_film_production,
    video_audio,
    video_gears,
  });

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
      <div className="checkbox-map-container">
        {Object.entries(subOptions).map(([subOption, value]) => (
          <div className="checkbox-container">
            <span class="ks-cboxtags">
              <span>
                <input
                  type="checkbox"
                  checked={value === 1}
                  id={subOption}
                  value={subOption}
                  onChange={() => handleSubOptionChange(option, subOption)}
                />
                <label for={subOption}>{subOption}</label>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container__1">
      {/* If loadingState has loading as true, show the loader */}
      {loadingState.loading ? <Loading /> : null}
      <div className="form">
        <h2>Sign Up</h2>
        <div className="form-content">
          <TextField
            value={fname}
            placeholder="Enter First Name"
            label="First Name"
            handleChange={(e) => setFname(e.target.value)}
            id="sign-up_fname_input_field"
          />
          <p>{fnameError}</p>
          <TextField
            value={lname}
            placeholder="Enter Last Name"
            label="Last Name"
            handleChange={(e) => setLname(e.target.value)}
            id="sign-up_lname_input_field"
          />
          <p>{lnameError}</p>
          <TextField
            value={email}
            placeholder="Enter Email Address"
            label="Email"
            handleChange={(e) => setEmail(e.target.value)}
            id="sign-up_email_input_field"
            type="email"
          />
          <p>{emailError}</p>
          <TextField
            value={password}
            placeholder="Enter Password"
            label="Password"
            handleChange={(e) => setPassword(e.target.value)}
            id="sign-up_password_input_field"
            type="password"
          />
          <p>{passwordError}</p>

          <MDBBtn onClick={handleBothClick}>Sign Up</MDBBtn>

          <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered size="xl">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle style={{ color: "black" }}>
                    Categories
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <div style={{ gap: "10px" }}>
                    <div
                      className="toggle__button__container"
                      style={{ gap: "10px" }}
                    >
                      <MDBBtnGroup className="toggle__button">
                        <MDBCheckbox
                          name="btnCheck"
                          btn
                          id="btn-check-1"
                          wrapperTag="span"
                          label="Animation & Illustration"
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
                          label="Graphic Design"
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
                          label="VFX"
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
                          label="Art & Craft"
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
                          label="Photo"
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
                          label="Game Development"
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
                          label="Creative Software"
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
                          label="Video"
                          checked={selectedOptions.includes("option8")}
                          onChange={() => handleOptionChange("option8")}
                        />
                      </MDBBtnGroup>

                      {renderSubOptions("option8")}

                      <p>{categoryState?.error}</p>
                    </div>
                  </div>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>

                  {/* <Link
                    to="/home"
                    style={{ color: "white" }}
                    onClick={handleModalClick}
                  > */}
                  <Link onClick={handleModalClick} to="/home">
                    <MDBBtn>Save changes</MDBBtn>
                  </Link>
                  {/* </Link> */}
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          <p>{userState?.error}</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
