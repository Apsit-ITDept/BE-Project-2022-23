import PDFViewer from "./PDFViewer";
import styles from "../static/Home.module.css";
import Upload, { Recommnedation } from "./Upload";
import { useState } from "react";
import httpClient from "../../../../httpClient";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecommend, setIsRecommend] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [user_data, setUserData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [recommnedation, setRecommendation] = useState([]);
  const [eduScore, setEduScore] = useState();
  const [skillScore, setSkillScore] = useState();
  const [expScore, setExpScore] = useState();
  const [jobRole, setJobRole] = useState();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleRecommend = () => {
    setIsRecommend(!isRecommend);
  };
  
  return (
    <div className={styles.main}>
      <div className={styles.display}>
        <ProgressBar percentage={percentage} circleWidth="200" />
        {skills.length != 0 && (
          <DisplaySkills user_data={user_data} skills={skills} />
        )}
        {skills.length != 0 && (
          <ShowAllScores
          jobRole={jobRole}
          eduScore={eduScore}
          expScore={expScore}
          skillScore={skillScore}
        />
        )}
      </div>
      <div className={styles.buttons}>
        <div className={styles.btn}>
          <button onClick={togglePopup}>Upload</button>
        </div>
        {recommnedation != 0 && (
          <div style={{ width: "250px" }} className={styles.btn}>
            <button onClick={toggleRecommend}>Recommended Jobs</button>
          </div>
        )}
      </div>
      {isOpen && (
        <Upload
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          togglePopup={togglePopup}
          score={percentage}
          setScore={setPercentage}
          setSkills={setSkills}
          setRecommendation={setRecommendation}
          setUserData={setUserData}
          setEduScore={setEduScore}
          setExpScore={setExpScore}
          setSkillScore={setSkillScore}
          setJobRole={setJobRole}
        />
      )}
      {isRecommend && (
        <Recommnedation
          recommendations={recommnedation}
          togglePopup={toggleRecommend}
        />
      )}
    </div>
  );
}

const ShowAllScores = ({ eduScore, expScore, skillScore, jobRole }) => {
  return (
    <div className={styles.allScoreCard}>
      <p className={styles.allScoreCardHeader}>
        Job Title: &emsp;&emsp;{jobRole}
      </p>
      <div className={styles.allScoreCardScores}>
        <p>Education Score: &emsp;&emsp;{eduScore} / 30</p>
        <p>Skills Score: &emsp;&emsp;&emsp;&emsp;&nbsp;{skillScore} / 60</p>
        <p>Experience Score: &emsp;&ensp;&nbsp;{expScore} / 10</p>
      </div>
    </div>
  );
};

const ProgressBar = ({ percentage, circleWidth }) => {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  return (
    <div className={styles.SkillCard}>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="10%" stopColor="#12c2e9" />
            <stop offset="50%" stopColor="#c471ed" />
            <stop offset="100%" stopColor="#f64f59" />
          </linearGradient>
        </defs>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className={styles.circleBackground}
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className={styles.circularProgress}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate (-90 ${circleWidth / 2} ${circleWidth / 2} )`}
          stroke="url(#gradient)"
        />
        <text
          x="50%"
          y="50%"
          dy="0.3rem"
          textAnchor="middle"
          className={styles.circleText}
          fill="url(#gradient)"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

const DisplaySkills = ({ skills, user_data }) => {
  return (
    <div style={{ width: "80vh" }} className={styles.SkillCard}>
      {/* <DisplayUserData user_data={user_data} /> */}
      <ul>
        {skills.map((skill, i) => (
          <li className={styles.listItem} key={i}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DisplayUserData = ({ user_data }) => {
  return (
    <div>
      <div>User name: {user_data.name}</div>
      <div>
        Education:
        <ul>
          {user_data.education.map((edu) => (
            <li>{edu}</li>
          ))}
        </ul>
      </div>
      <div>
        Projects:
        {user_data.project.map((proj) => (
          <li>{proj}</li>
        ))}
      </div>
      <div>
        Certificates:
        {user_data.certificate.map((proj) => (
          <li>{proj}</li>
        ))}
      </div>
    </div>
  );
};

// <div className={styles.recHeader}>
//   <div className={styles.recHeaderItems}>
//     Company
//   </div>
//   <div className={styles.recHeaderItems}>
//     Job Role
//   </div>
//   <div className={styles.recHeaderItems}>
//     Education
//   </div>
//   <div className={styles.recHeaderItems}>
//     Skills
//   </div>
//   <div className={styles.recHeaderItems}>
//     Job Description
//   </div>
