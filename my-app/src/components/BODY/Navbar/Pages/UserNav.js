import styles from "../static/Navbar.module.css";
import { userNav } from "../../../../utils/navItems";
import { useNavigate } from "react-router-dom";
import httpClient from "../../../../httpClient";
import { useState } from "react";
import { SurveyForm } from "../../Authentication/Pages/Forms";

export default function Navbar({ active, setActive }) {
  const [isSurvey, setIsSurvey] = useState(false);
  const navigate = useNavigate();
  function navigatePage(e) {
    navigate(e);
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navtitle}>
        <h3>CVAnalyser</h3>
      </div>
      <ul style={{ flex: 0.9 }} className={styles.navItems}>
        {userNav.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? styles.active : ""}
            >
              {" "}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className={styles.profileBtn}></div>
      <div style={{ marginRight: "30px" }} className={styles.logBtn}>
        <button onClick={() => setIsSurvey(true)}>Logout</button>
      </div>
      {isSurvey && <SurveyForm/>}
    </div>
  );
}
