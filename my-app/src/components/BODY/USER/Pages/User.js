import AppliedJobs from "./AppliedJobs";
import AvilableJobs from "./AvailableJobs";
import Body from "../../../BODY/cvgenerator/Body/Body";
import History from "./History";
import Navbar from "../../Navbar/Pages/UserNav";
import styles from "../static/Home.module.css";
import { useState } from "react";
import Home from "./Home";
// import Upload, { UploadForm } from "../UploadFiles/Upload";

export default function User() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Home setActive={setActive} />;
      case 2:
        return <AppliedJobs />;
      case 3:
        return <AvilableJobs />;
      case 4:
        return <History />;
      case 5:
        return <Body />;
      default:
        return <User />;
    }
  };

  return (
    <div className={styles.body}>
      <Navbar active={active} setActive={setActive} />
      <main>{displayData()}</main>
    </div>
  );
}
