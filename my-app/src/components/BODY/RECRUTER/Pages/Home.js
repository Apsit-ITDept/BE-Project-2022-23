import { useState } from "react";
import styles from "../static/Home.module.css";
import httpClient from "../../../../httpClient";

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [mark_x, setMark_X] = useState();
  const [mark_XII, setMark_XII] = useState();
  const [mark_degree, setMark_Degree] = useState();
  const [skills, setSkills] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = async () => {
    try {
      const resp = await httpClient.post("///localhost:5000/jobs", {
        jobTitle,
        jobDescription,
        mark_x,
        mark_XII,
        mark_degree,
        skills,
        dueDate,
      });
      alert('Job Posted Successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.titleInputField}>
          <input
            type="text"
            placeholder="Enter Job Title eg. Python Developer"
            required
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className={styles.detailsField}>
          <textarea
            placeholder="Enter Job details"
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div className={styles.optionMenu}>
          <div className={styles.internalContainer}>
            <div>
              <label>Xth: &emsp;&emsp;&emsp;</label>
              <input
                type="text"
                placeholder="Enter Xth %"
                onChange={(e) => {
                  setMark_X(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label>XIIth : &emsp; &emsp;</label>
              <input
                type="text"
                placeholder="Enter XIIth"
                onChange={(e) => {
                  setMark_XII(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label>Degree: &emsp;</label>
              <input
                type="text"
                placeholder="Enter Degree %"
                onChange={(e) => {
                  setMark_Degree(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className={styles.internalContainer}>
            <div>
              <label>Skills: &emsp;&emsp;&nbsp;</label>
              <input
                type="text"
                required
                placeholder="Enter skills..."
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <label>Due Date:&ensp;</label>
              <input
                className={styles.inputDateTime}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.jobPost}>
          <button onClick={handleSubmit}>Post Job</button>
        </div>
      </div>
    </div>
  );
}
