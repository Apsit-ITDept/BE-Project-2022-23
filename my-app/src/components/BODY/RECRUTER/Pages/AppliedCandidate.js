import { useEffect, useState } from "react";
import { acceptIcon, rejectIcon } from "../../../../utils/Icons";
import styles from "../static/AppliedCandidate.module.css";
import httpClient from "../../../../httpClient";

export default function AppliedCandidate() {
  const [candidates, setCandidates] = useState([]);
  const [recommedations, setRecommendations] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try {
      // const resp = await httpClient.get("///localhost:5000/jobs");
      const resp = await httpClient.get("///localhost:5000/postedJobs");
      setJobs(resp.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const get_candidates = async (event) => {
    try {
      let jobId = event.target.value;
      const resp = await httpClient.get(
        "///localhost:5000/candidatesApplied/" + jobId
      );
      setCandidates(resp.data.candidates);
      setRecommendations(resp.data.recommend);
      // console.log(candidates);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(candidates)

  useEffect(() => {
    if (jobs == 0) {
      
    }
    getJobs();
    get_candidates();
  });
  // console.log("candidates", candidates);
  console.log("recommend", recommedations);
  return (
    <div className={styles.main}>
      <div className={styles.dropDown}>
        <select onClick={get_candidates} name="" id="jobs">
          {jobs.map((job, key) => {
            return (
              <option key={key} value={job.jobId}>
                {job.jobTitle}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.window}>
        <div className={styles.operational}>
          {candidates.map((candidate, key) => {
            return (
              <CandidateDetailsCard
                key={key}
                candidateName={candidate.Name}
                candidateSkill={candidate.Skills}
                Resume={candidate.filename}
                email={candidate.email}
                // score={candidate.score}
              />
            );
          })}
        </div>
        {/* <div className={styles.seperatorBody}>
        <div className={styles.seperator}></div>
      </div> */}
        <div className={styles.displayRanking}>
          <div className={styles.rankingContainer}>
            <div className={styles.heading}>
              <p>Ranking</p>
            </div>
            <RankList candidates={recommedations}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const RankerItem = ({ name, email, jobId, status }) => {
  const handleClick = async (status) => {
    try {
      const resp = httpClient.post("///localhost:5000/applicationHandler", {
        status,
        email,
        jobId,
      });
      console.log("Status updated!");
    } catch (error) {
      if (error.response.status === 404) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <li className={styles.rankingListItem}>
        <p>&emsp;{name}</p>
        {(status === "Accepted" || status === "Rejected") && (
          <div style={((status === 'Accepted') ? {backgroundColor:'#17ffaa'} : {backgroundColor:"#ff1749"})} className={styles.status}>{status}</div>
        )}
        {status === "Pending" && <UpdationButtons handleClick={handleClick} />}
      </li>
    </div>
  );
};

const UpdationButtons = ({ handleClick }) => {
  return (
    <div className={styles.btnContainer}>
      <button
        onClick={() => handleClick(true)}
        style={{ background: "#17ffaa" }}
      >
        {acceptIcon}
      </button>
      <button
        onClick={() => handleClick(false)}
        style={{ background: "#ff1744" }}
      >
        {rejectIcon}
      </button>
    </div>
  );
};

const RankList = ({ candidates }) => {
  return (
    <div className={styles.RankList}>
      <ol>
        {candidates &&
          candidates.map((f, key) => (
            <RankerItem
              key={key}
              name={f.Name}
              email={f.email}
              jobId={f.jobId}
              status={f.Status}
            />
          ))}
      </ol>
    </div>
  );
};

const CandidateDetailsCard = ({
  candidateName,
  candidateSkill,
  Resume,
  score,
  email,
}) => {
  return (
    <div className={styles.candidateDetailsCard}>
      <div className={styles.details}>
        <span>
          Name:&emsp; &emsp;<p>{candidateName}</p>
        </span>
        <span>
          Resume:&nbsp;<p>{Resume}</p>
        </span>
        <span>
          Email:&nbsp;<p>{email}</p>
        </span>
        <span className={styles.candidateSkillsContainer}>
          Skills&emsp;&emsp;&ensp;<p>{candidateSkill}</p>
        </span>
        {/* <p>
          Score:&nbsp;<p>{score}</p>
        </p> */}
      </div>
    </div>
  );
};
