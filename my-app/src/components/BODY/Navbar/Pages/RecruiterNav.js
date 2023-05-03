import styles from "../static/Navbar.module.css";
import { recruiterNav } from "../../../../utils/navItems";
import { useNavigate } from "react-router-dom";
import img from "../static/60111.jpg";
import httpClient from "../../../../httpClient";

export default function Navbar({ active, setActive }) {
  const navigate = useNavigate();
  function navigatePage(e) {
    navigate(e);
  }

  const logout = async () => {
    try {
      await httpClient.post("//localhost:5000/logout");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navtitle}>
        <h3>CVAnalyser</h3>
      </div>
      <ul style={{ flex: 0.675 }} className={styles.navItems}>
        {recruiterNav.map((item) => {
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
      <div className={styles.profileLogBtn}>
        {/* <div className={styles.profileBtn}>
          <button onClick={() => navigatePage("/user")}>
            Omkar
            <div className={styles.profileIcon}>
              <img alt="" src={img} />
            </div>
          </button>
        </div> */}
        <div className={styles.logBtn}>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
}
