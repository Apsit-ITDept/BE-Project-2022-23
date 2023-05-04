import { useState } from "react";
import httpClient from "../../../../httpClient";
import styles from "../static/History.module.css";
import { useEffect } from "react";

export default function History() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const resp = await httpClient.get("///localhost:5000/scoreHistory");
      setData(resp.data.Historys);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ul>
          {data.map((d) => {
            return (
              <li>
                <HistoryCard
                  resumeDetails={d.filename}
                  resumeScore={d.score}
                  Date={d.date}
                  Time={d.time}
                />
                <div className={styles.separator} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const HistoryCard = ({ resumeDetails, resumeScore, Date, Time }) => {
  return (
    <div className={styles.Main}>
      <div className={styles.cardContainer}>
        <div className={styles.items}>
          <p>Resume: &emsp; {resumeDetails}</p>
          <p>Resume Score: &emsp; {resumeScore}</p>
        </div>
      </div>
      <div className={styles.dateTimeContainer}>
        <p>Date: {Date}</p>
        <p>Time: {Time}</p>
      </div>
    </div>
  );
};
