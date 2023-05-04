import { React, useState } from "react";
import styles from "../static/Upload.module.css";
import {
  uploadIcon,
  trashIcon,
  fileAltIcon,
  spinnerIcon,
} from "../../../../utils/Icons";
import httpClient from "../../../../httpClient";
import { AvailableTempCard } from "./AvailableJobs";
import { LoadingPopUp } from "../../Authentication/Pages/Forms";

export default function Upload({
  isOpen,
  togglePopup,
  setScore,
  setSkills,
  setRecommendation,
  setUserData,
  setEduScore,
  setExpScore,
  setSkillScore,
  setJobRole,
}) {
  return (
    <div>
      {isOpen && (
        <>
          <FileUpload
            setScore={setScore}
            togglePopup={togglePopup}
            setSkills={setSkills}
            setRecommendation={setRecommendation}
            setUserData={setUserData}
            setEduScore={setEduScore}
            setExpScore={setExpScore}
            setSkillScore={setSkillScore}
            setJobRole={setJobRole}
          />
        </>
      )}
    </div>
  );
}

const FileUpload = ({
  setScore,
  togglePopup,
  setSkills,
  setRecommendation,
  setUserData,
  setEduScore,
  setExpScore,
  setSkillScore,
  setJobRole,
}) => {
  const [file, setFile] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const uploadHandler = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsFetching(true);
      const resp = await httpClient.post(
        "http://localhost:5000/upload",
        formData
      );
      // console.log(resp.data.score.edu_score);
      console.log(resp.data);
      setScore(resp.data.score.Score);
      setEduScore(resp.data.score.edu_score);
      setSkillScore(resp.data.score.skill_score);
      setExpScore(resp.data.score.exp_score);
      setSkills(resp.data.skills);
      setRecommendation(resp.data.recommendations);
      setUserData(resp.data.user_data);
      setJobRole(resp.data.jobTitle);
      togglePopup();
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const get_recommendation = async () => {
    try {
      const resp = await httpClient.get("http:///localhost:5000/job_recommend");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.uploadWindow}>
      <div className={styles.box}>
        <span className={styles.closeIcon} onClick={togglePopup}>
          X
        </span>
        <div>
          <div className={styles.fileSelector}>
            <input
              className={styles.fileInput}
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              required
            />
          </div>
          <div className={styles.uploadbtn}>
            <button onClick={uploadHandler}>{uploadIcon} &nbsp; Upload</button>
          </div>
          <p style={{color:"red", fontSize:"13px", textAlign:"center"}}>
          Specify the desired experience level in years using the phrase "years of experience".
          </p>
        </div>
      </div>
      {isFetching && <LoadingPopUp />}
    </div>
  );
};

export const Recommnedation = ({ recommendations, togglePopup }) => {
  console.log("Recommendations: ", recommendations);
  return (
    <div className={styles.uploadWindow}>
      <div className={styles.recommendBox}>
        <span className={styles.recCloseIcon} onClick={togglePopup}>
          X
        </span>
        <div className={styles.recommendHeader}>Available Jobs</div>
        <div className={styles.recommendationList}>
          <ul>
            {recommendations.map((recommendation) => {
              return (
                <li>
                  <AvailableTempCard
                    orgName={recommendation.orgName}
                    jobTitle={recommendation.jobTitle}
                    marks_x={recommendation.marks_x}
                    marks_xii={recommendation.marks_xii}
                    marks_degree={recommendation.marks_degree}
                    skills={recommendation.skills}
                    jobDescription={recommendation.jobDescription}
                    jobId={recommendation.jobId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

// {recommendations.map((val, key) => {
//   return (
//     <tr key={key}>
//       <td>{val.orgName}</td>
//       <td>{val.jobTitle}</td>
//       <td>
//         <div
//           style={{
//             display: "flex",
//             flexDirection:"column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "2px",
//           }}
//         >
//           <p>Xth:{val.mark_x}</p>
//           <p>XIIth:{val.mark_xii}</p>
//           <p>Engineering:{val.mark_degree}</p>
//         </div>
//       </td>
//       <td>{val.skill}</td>
//       <td>{val.jobDescription}</td>
//     </tr>
//   );
// })}
