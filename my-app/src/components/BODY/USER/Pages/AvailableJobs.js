import styles from "../static/AvailableJobs.module.css";
import styles1 from "../static/Upload.module.css";
import { search, uploadIcon } from "../../../../utils/Icons";
import httpClient from "../../../../httpClient";
import { useEffect, useState } from "react";

export default function AvilableJobs() {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try {
      const resp = await httpClient.get("///localhost:5000/jobs");
      setJobs(resp.data.jobs);
    } catch (error) {
      if (error.response.status === 409) {
        alert("Invalid credintials");
      }
    }
  };

  useEffect(() => {
    // getJobs();
    if (jobs == 0) {
      getJobs();
    }
  });

  // console.log(jobs);
  return (
    <div className={styles.main}>
      {/* <SearchBar /> */}
      <div className={styles.container}>
        <ul>
          {jobs.map((job) => {
            return (
              <li>
                <AvailableTempCard
                  orgName={job.orgName}
                  jobTitle={job.jobTitle}
                  marks_x={job.mark_x}
                  marks_xii={job.mark_xii}
                  marks_degree={job.mark_degree}
                  skills={job.skills}
                  jobDescription={job.jobDescription}
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

const SearchBar = () => {
  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <input placeholder="search" />
        <div className={styles.searchButton}>
          <button type="button">{search}</button>
        </div>
      </div>
    </div>
  );
};

export const AvailableTempCard = ({
  orgName,
  jobTitle,
  jobDescription,
  marks_x,
  marks_xii,
  marks_degree,
  skills,
  lastDate,
  jobId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId", jobId);
    formData.append("jobId", skills);
    console.log(file, jobId);
    try {
      const resp = await httpClient.post("http://localhost:5000/jobapply", formData);
      togglePopup();
    } catch (error) {
      if (error.response.status === 409) {
        alert("Already applied!");
        togglePopup();
      }
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.items}>
        <p>
          Company: <p>{orgName}</p>
        </p>
        <p>
          Job Role: <p>{jobTitle}</p>
        </p>
        <p>
          Education:{" "}
          <p>
            Xth: {marks_x} XIIth: {marks_xii} Degree: {marks_degree}
          </p>
        </p>
        <p>
          Skills: <p>{skills} Years.</p>
        </p>
        <p className={styles.descriptionText}>
          Job Description: <p>{jobDescription}</p>
        </p>
      </div>
      <div className={styles.rightContainer}>
        <p>Due Date: {lastDate}</p>
        <button onClick={togglePopup} className={styles.applyBtn}>
          Apply
        </button>
      </div>
      {isOpen && <ApplyPopup setFile={setFile} togglePopup={togglePopup} handleApply={handleApply} />}
    </div>
  );
};

const ApplyPopup = ({ togglePopup, setFile, handleApply}) => {

  return (
    <div className={styles1.uploadWindow}>
      <div className={styles1.box}>
        <span className={styles1.closeIcon} onClick={togglePopup}>
          X
        </span>
        <div>
          <div className={styles1.fileSelector}>
            <input
              className={styles1.fileInput}
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              required
            />
          </div>
          <div className={styles1.uploadbtn}>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};
