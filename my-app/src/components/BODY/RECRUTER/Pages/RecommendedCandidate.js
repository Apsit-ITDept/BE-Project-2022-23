import { useEffect, useState } from "react";
import httpClient from "../../../../httpClient";
import styles from './../static/RecommendedCandidate.module.css'

export default function RecommendedCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const getJobs = async () => {
    try {
      const resp = await httpClient.get("///localhost:5000/postedJobs");
      setJobs(resp.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (jobs == 0) {
      getJobs();
    }
  });

  const getRecommendations = () => {
    try{
        const resp = httpClient.get("///localhost:5000/getRecommendedCandidates");
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <div className={styles.main}>
      <div className={styles.dropDown}>
        <select onClick={getRecommendations} name="" id="jobs">
          {jobs.map((job) => {
            return <option className={styles.options} value={job.jobId}>{job.jobTitle}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
