import { useState } from "react";
import styles from "../static/register.module.css";
import Navbar from "../../Navbar/Pages/NavbarT2";
import { RecruiterRegisterForm, UserRegisterForm } from "./Forms";

export default function Register() {
  return (
    <div>
      <Navbar />
      <SignupPage />
    </div>
  );
}

function SignupPage() {
  const [userType, setUserType] = useState("candidate");

  const handleCheck = (e) => {
    setUserType(e.target.value);
  };

  const handlePage = () => {
    if (userType === "candidate") {
      return <UserRegisterForm />;
    }
    if (userType === "recruiter") {
      return <RecruiterRegisterForm />;
    }
  };
  return (
    <div>
      <div className={styles.center}>
        <div className={styles.center1}>
          <div className={styles.cardHeader}>
            <div className={styles.title}>
              <h1>Signup</h1>
            </div>
            <div className={styles.radioContainer}>
              <div className={styles.radioBtnContainer}>
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
              <div className={styles.radioBtnContainer}>
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
          {handlePage()}
        </div>
        <div className={styles.center2}>
          <div className={styles.loginTitle}></div>
        </div>
      </div>
    </div>
  );
}
