import { useState } from "react";
import httpClient from "../../../../httpClient";
import stylesReg from "../static/register.module.css";
import stylesLog from "../static/login.module.css";
import styles from "../static/utilityFunctions.module.css";
import {
  spinnerIcon,
  circleNotch,
  circleNotchSpin,
  spinnerIconSpin,
} from "../../../../utils/Icons";
import Validation, {
  logInValidations,
  recruiterRegistrationValidation,
} from "./Validations";

// ********** Candidate forms **********

export const UserRegisterForm = () => {
  const user = "candidate";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setPhoneNum] = useState("");
  const [password, setPass] = useState("");
  const [mark_x, setMarkX] = useState("");
  const [mark_xii, setMarkXII] = useState("");
  const [mark_degree, setMarkDegree] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({});

  const signUpUser = async () => {
    console.log(
      user,
      fullName,
      email,
      mobNo,
      password,
      mark_x,
      mark_xii,
      mark_degree
    );
    try {
      showPopup();
      await httpClient.post("//localhost:5000/register", {
        user,
        fullName,
        email,
        mobNo,
        password,
        mark_x,
        mark_xii,
        mark_degree,
      });
      // showPopup();
      window.location.href = "/login";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credintials");
      }
      if (error.response.status === 409) {
        alert("User already exist!");
      }
    }
  };

  function handleValidation(event) {
    const Result = Validation({
      fullName,
      email,
      mobNo,
      password,
      mark_x,
      mark_xii,
      mark_degree,
    });
    setErrors(Result);
    console.log(Object.keys(Result).length);
    if (Object.keys(Result).length === 0) {
      signUpUser();
    }
  }

  const showPopup = () => {
    setIsloading(!isLoading);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleValidation}>
          <div className={stylesReg.inputContainer}>
            <div className={stylesReg.inputField}>
              <input
                type="text"
                placeholder="Enter full name"
                required
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              {errors.fullName && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.fullName}
                </p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="number"
                placeholder="Enter mobile no."
                required
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              />
              {errors.mobno && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors.mobno}</p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="password"
                placeholder="Enter Password"
                required
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="number"
                placeholder="Enter Xth %"
                required
                onChange={(e) => {
                  setMarkX(e.target.value);
                }}
              />
              {errors.marksX && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.marksX}
                </p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="number"
                placeholder="Enter XIIth %"
                required
                onChange={(e) => {
                  setMarkXII(e.target.value);
                }}
              />
              {errors.marksXII && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.marksXII}
                </p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="number"
                placeholder="Enter Engineering %"
                required
                onChange={(e) => {
                  setMarkDegree(e.target.value);
                }}
              />
              {errors.marksDegree && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.marksDegree}
                </p>
              )}
            </div>
          </div>
          <div className={stylesReg.inputField}>
            <button type="button" onClick={handleValidation}>
              Signup
            </button>
          </div>
          <div className={stylesReg.loginLink}>
            <label>Already have an account?</label>
            <a href="/login"> Login</a>
          </div>
        </form>
        {isLoading && <LoadingPopUp />}
      </div>
    </div>
  );
};

export const RecruiterRegisterForm = () => {
  const user = "recruiter";
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setPhoneNum] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({});

  const signUpUser = async () => {
    console.log(user, orgName, email, mobNo, password);
    try {
      setIsloading(true);
      await httpClient.post("//localhost:5000/register", {
        user,
        orgName,
        email,
        mobNo,
        password,
      });
      setIsloading(false);
      window.location.href = "/login";
    } catch (error) {
      if (error.response.status === 401) {
        setIsloading(false);
        alert("Invalid credintials");
      }
      if (error.response.status === 409) {
        setIsloading(false);
        alert("User already exist!");
      }
    }
  };
  function handleValidation(event) {
    const Result = recruiterRegistrationValidation({
      orgName,
      email,
      password,
      mobNo,
    });
    setErrors(Result);
    console.log(Object.keys(Result).length);
    if (Object.keys(Result).length === 0) {
      signUpUser();
    }
  }

  return (
    <div>
      <div>
        <form>
          <div className={stylesReg.inputContainer}>
            <div className={stylesReg.inputField}>
              <input
                type="text"
                placeholder="Organization Name"
                required
                onChange={(e) => {
                  setOrgName(e.target.value);
                }}
              />
              {errors.orgName && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.orgName}
                </p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="number"
                placeholder="Enter contact number"
                required
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              />
              {errors.mobno && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors.mobno}</p>
              )}
            </div>
            <div className={stylesReg.inputField}>
              <input
                type="password"
                placeholder="Enter Password"
                required
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className={stylesReg.inputField}>
            <button type="button" onClick={() => handleValidation()}>
              Signup
            </button>
          </div>
          <div className={stylesReg.loginLink}>
            <label>Already have an account?</label>
            <a href="/login"> Login</a>
          </div>
        </form>
        {isLoading && <LoadingPopUp />}
      </div>
    </div>
  );
};

// *********** Login forms ***********

export const UserLoginForm = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendOtp = async () => {
    try {
      const resp = await httpClient.post("///localhost:5000/sendOtp", {
        email,
        userType,
      });
      // return resp.data.otp;
    } catch (error) {
      console.log(error);
    }
  };

  const loginuser = async () => {
    console.log(email, password);

    try {
      setIsloading(true);
      const resp = await httpClient.post("//localhost:5000/login", {
        userType,
        email,
        password,
      });
      console.log(resp);
      setIsloading(false);
      if (userType === "candidate") window.location.href = "/user";
      else if (userType === "recruiter") window.location.href = "/recruiter";
    } catch (error) {
      if (error.response.status === 403) {
        setIsloading(false);
        sendOtp();
        setIsOpen(true);
      }
      if (error.response.status === 401) {
        setIsloading(false);
        alert("Invalid credintials");
      }
      if (error.response.status === 500) {
        setIsloading(false);
        alert("Invalid credintials");
      }
    }
  };

  function handleValidation(event) {
    const Result = logInValidations({
      email,
      password,
    });
    setErrors(Result);
    console.log(Object.keys(Result).length);
    if (Object.keys(Result).length === 0) {
      loginuser();
    }
  }

  return (
    <div className="">
      <form>
        <div className={stylesLog.inputField}>
          <input
            type="text"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>
          )}
        </div>
        <div className={stylesLog.inputField}>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>
          )}
        </div>
        <div className={stylesLog.fp}>
          <a href="/verifyEmail">forget password?</a>
        </div>
        <div className={stylesLog.inputField}>
          <button type="button" onClick={() => handleValidation()}>
            Login
          </button>
        </div>
        <div className={stylesLog.signupLink}>
          <p>
            Don't have an account?<a href="/register"> Signup</a>
          </p>
        </div>
      </form>
      {isLoading && <LoadingPopUp userType={userType} email={email} />}
      {isOpen && <OtpForm userType={userType} email={email} />}
    </div>
  );
};

// OTP Form

export const OtpForm = ({ email, userType }) => {
  const [otp, setOtp] = useState();
  const verifyOtp = async () => {
    try {
      const resp = await httpClient.post("///localhost:5000/verifyOtp", {
        userType,
        email,
        otp,
      });
      console.log("OtpValidation Successful");
      setTimeout(1000);
      if (userType === "candidate") window.location.href = "/user";
      else if (userType === "recruiter") window.location.href = "/recruiter";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Enter valid otp!");
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.Card}>
        <div className={styles.header}>Verify email</div>
        <input
          placeholder="Enter OTP..."
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={() => verifyOtp()}>Verify</button>
      </div>
    </div>
  );
};

export const LoadingPopUp = () => {
  return (
    <div className={styles.loadingMain}>
      <div className={styles.loadingCard}>
        {spinnerIconSpin}
        <div>Plases wait....</div>
      </div>
    </div>
  );
};

export const SurveyForm = () => {
  const [feedback1, setFeedback1] = useState();
  const [feedback2, setFeedback2] = useState();
  const [feedback3, setFeedback3] = useState();
  const [isLoading, setIsloading] = useState();
  const handleCheck1 = (e) => {
    setFeedback1(e.target.value);
  };
  const handleCheck2 = (e) => {
    setFeedback2(e.target.value);
  };

  const logout = async () => {
    try {
      setIsloading(true);
      setTimeout(function () {}, 5000);
      await httpClient.post("//localhost:5000/logout");
      setIsloading(false);
      window.location.href = "/";
    } catch (error) {
      setIsloading(false);
      console.error(error);
    }
  };
  // console.log(feedback1);

  const handleSubmitSurvey = async () => {
    try {
      await httpClient.post("///localhost:5000/submitSurvey", {
        feedback1,
        feedback2,
        feedback3,
      });
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.loadingMain}>
      <div className={styles.surveyCard}>
        <ol>
          <li className={styles.surveyCardList}>
            <p>Did your CV analysis's results match your skills?</p>
            <div className={styles.radioContainer}>
              <div className={styles.radioBtnContainer}>
                <input
                  type="radio"
                  name="Excellent"
                  value="Excellent"
                  id="Excellent"
                  checked={feedback1 === "Excellent"}
                  onChange={handleCheck1}
                />
                <label htmlFor="Excellent">Excellent</label>
              </div>
              <div className={styles.radioBtnContainer}>
                <input
                  type="radio"
                  name="Good"
                  value="Good"
                  id="Good"
                  checked={feedback1 === "Good"}
                  onChange={handleCheck1}
                />
                <label htmlFor="Good">Good</label>
              </div>
              <div className={styles.radioBtnContainer}>
                <input
                  type="radio"
                  name="Average"
                  value="Average"
                  id="Average"
                  checked={feedback1 === "Average"}
                  onChange={handleCheck1}
                />
                <label htmlFor="Average">Average</label>
              </div>
            </div>
          </li>
          <li className={styles.surveyCardList}>
            <p>Did the job recommendation match your prefrenece?</p>
            <div className={styles.radioContainer}>
              <div className={styles.radioBtnContainer}>
                <input
                  type="radio"
                  name="Excellent2"
                  value="Excellent"
                  id="Excellent"
                  checked={feedback2 === "Excellent"}
                  onChange={handleCheck2}
                />
                <label htmlFor="Excellent2">Excellent</label>
              </div>
              <div className={styles.radioBtnContainer}>
                <input
                  type="radio"
                  name="Good2"
                  value="Good"
                  id="Good"
                  checked={feedback2 === "Good"}
                  onChange={handleCheck2}
                />
                <label htmlFor="Good2">Good</label>
              </div>
              <div className={styles.radioBtnContainer}>
                <input
                  type="radio"
                  name="Average2"
                  value="Average"
                  id="Average"
                  checked={feedback2 === "Average"}
                  onChange={handleCheck2}
                />
                <label htmlFor="Average2">Average</label>
              </div>
            </div>
          </li>
          <li className={styles.surveyCardList}>
            <p>What would you like to suggest to imporve?</p>
            <textarea
              className={styles.comment}
              onChange={(e) => setFeedback3(e.target.value)}
            />
          </li>
        </ol>
        <div className={styles.surveyCardBtnContainer}>
          <button className={styles.surveyCardBtn} onClick={handleSubmitSurvey}>
            Submit
          </button>
          <button className={styles.skipbutton} onClick={logout}>
            Skip
          </button>
        </div>
      </div>
      {isLoading && <LoadingPopUp />}
    </div>
  );
};
