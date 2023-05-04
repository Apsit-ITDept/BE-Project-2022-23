import styles from "../static/utilityFunctions.module.css";
import { useState } from "react";
import httpClient from "../../../../httpClient";
import stylesLog from "../static/login.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailVerification = () => {
  const [email, setEmail] = useState();
  const [userType, setUserType] = useState("candidate");
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const resp = await httpClient.post("///localhost:5000/checkEmail", {
        userType,
        email,
      });
      navigate('/fpOtp', { state: { email, userType } });
    } catch (error) {
      if (error.response.status === 404) {
        alert("User doesn't exists!");
      }
    }
  };

  const handleCheck = (e) => {
    setUserType(e.target.value);
  };


  return (
    <div className={styles.Body}>
      <div className={styles.Card}>
        <div style={{ marginBottom: "0px" }} className={stylesLog.cardHeader}>
          <div className={stylesLog.radioContainer}>
            <div className={stylesLog.radioBtnContainer}>
              <input
                type="radio"
                name="candidate"
                value="candidate"
                id="candidate"
                checked={userType === "candidate"}
                onChange={handleCheck}
              />
              <label htmlFor="candidate">candidate</label>
            </div>
            <div className={stylesLog.radioBtnContainer}>
              <input
                type="radio"
                name="recruiter"
                value="recruiter"
                id="recruiter"
                checked={userType === "recruiter"}
                onChange={handleCheck}
              />
              <label htmlFor="recruiter">recruiter</label>
            </div>
          </div>
        </div>
        <input
          placeholder="Enter email..."
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => verifyEmail()}>Submit</button>
      </div>
    </div>
  );
};

export const ForgetPassOTP = () => {
  const [otp, setOtp] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const verifyOtp = async () => {
    try {
      const resp = await httpClient.post("///localhost:5000/verifyFpOtp", {
        email,
        otp,
      });
      alert('OTP verified');
      navigate('/forgetPassword', { state: { email, userType } });
      //   if (userType === "candidate") window.location.href = "/user";
      //   else if (userType === "recruiter") window.location.href = "/recruiter";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Enter valid otp!");
      }

    }
  };

  const email = location.state.email;
  const userType = location.state.userType;

  // const verifyOtp = () => {
  //     navigate('/forgetPassword', {state: {email, userType}});
  // }

  console.log(location.state.email, location.state.userType);

  return (
    <div className={styles.Body}>
      <div className={styles.Card}>
        <div className={styles.header}>Verify</div>
        <input
          placeholder="Enter OTP..."
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={() => verifyOtp()}>Verify</button>
      </div>
    </div>
  );
};

export const ForgetPasswordForm = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassowrd] = useState();
  const location = useLocation();
  const email = location.state.email;
  const userType = location.state.userType;

  const updatePassword = async () => {
    try {
      const resp = httpClient.post("///localhost:5000/forgetPassword", { email, password, userType });
      alert('Password Changed!');
      window.location.href = '/login';
    }
    catch (error) {
      if (error.response.status === 401) {
        console.log('Invalid UserType!');
      }
      if (error.response.state === 404) {
        alert('No user found!');
      }
    }
  }

  const validatePassword = () => {
    if ((password === undefined || password === '') && (confirmPassword === undefined || confirmPassword === '')) {
      alert("Enter valid password!");
    }
    else if (password === confirmPassword) {
      // alert('password matched!');
      updatePassword();
    }
    else {
      alert('passwrod not matched');
    }
  }

  console.log(password, confirmPassword)

  return (
    <div className={styles.fpBody}>
      <div className={styles.Card}>
        <input placeholder="Enter new password ..." type="password" required onChange={(e) => setPassword(e.target.value)} />
        <input
          placeholder="Re-enter new password ..."
          type="password"
          required
          onChange={(e) => setConfirmPassowrd(e.target.value)}
        />
        <button onClick={() => validatePassword()}>Submit</button>
      </div>
    </div>
  );
};
