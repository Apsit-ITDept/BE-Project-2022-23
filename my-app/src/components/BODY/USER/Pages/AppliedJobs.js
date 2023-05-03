import { delay } from "framer-motion";
import httpClient from "../../../../httpClient";
import styles from "../static/AppliedJobs.module.css";
import { useEffect, useState } from "react";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const getApplied = async () => {
    try {
      const resp = await httpClient.get("///localhost:5000/jobapply");
      setJobs(resp.data.jobs);
      console.log(jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getApplied();
    if(jobs == 0){
      getApplied();
    }
  });

  // console.log(jobs)
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ul>
          {jobs.map((job) => {
            return (
              <li>
                <AppliedJobsTemplateCard
                  orgName={job.orgName}
                  jobTitle={job.jobTitle}
                  jobDetails={job.jobDescription}
                  resumeDetails={job.filename}
                  approvalStatus={job.status}
                  jobId={job.jobId}
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

const AppliedJobsTemplateCard = ({
  orgName,
  jobTitle,
  jobDetails,
  resumeDetails,
  approvalStatus,
  jobId,
}) => {

  const download = async () => {
    try{
      const resp = httpClient.get("///localhost:5000/download/"+jobId);
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className={styles.cardContainer}>
      <div className={styles.items}>
        <p>Job Title: {jobTitle}</p>
        <p>Company: {orgName}</p>
        <p style={{display:"flex", gap:"3px", alignItems:"flex-start"}}>Job Details: &nbsp;<p style={{display:"flex", alignItems:"center", justifyContent:"center"}}>{jobDetails}</p></p>
        <p>Resume: <a onClick={download}>{resumeDetails}</a></p>
        <p>Resume: <a onClick={download}>{jobId}</a></p>
      </div>
      <p>Status: {approvalStatus}</p>
    </div>
  );
};
