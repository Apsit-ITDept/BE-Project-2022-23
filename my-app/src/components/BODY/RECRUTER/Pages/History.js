import styles from "../static/History.module.css";
import { useEffect, useState } from "react";
import httpClient from "../../../../httpClient";

export default function History() {
  const [Jobs, setJobs] = useState([]);

  console.log(Jobs);

  const getJobs = async () => {
    try {
      const resp = await httpClient.get("///localhost:5000/postedJobs");
      setJobs(resp.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className={styles.main}>
      <ul className={styles.cardList}>
        {Jobs.map((job) => {
          return (
            <HistoryCard
              jobTitle={job.jobTitle}
              jobDescription={job.jobDescription}
              mark_x={job.mark_x}
              mark_xii={job.mark_xii}
              mark_degree={job.mark_degree}
              skills={job.skills}
              dueDate={job.dueDate}
            />
          );
        })}
      </ul>
    </div>
  );
}

const HistoryCard = ({
  jobTitle,
  jobDescription,
  mark_x,
  mark_XII,
  mark_degree,
  skills,
  dueDate,
}) => {
  return (
    <div className={styles.HistoryCard}>
      <div className={styles.items}>
        <p className={styles.itemTitle}>
          Title: &emsp;&emsp;&emsp;&ensp;<p>{jobTitle}</p>
        </p>
        <p className={styles.itemTitle}>
          Description: <p>{jobDescription}</p>
        </p>
        <p className={styles.itemTitle}>
          Education:{" "} &nbsp;&ensp;
          <p>
            Xth: {mark_x} XIIth: {mark_XII} Degree: {mark_degree}
          </p>
        </p>
        <p className={styles.itemTitle}>
          Skills: &emsp;&emsp;&emsp;<p>{skills} Years.</p>
        </p>
        <p className={styles.itemTitle}>
          Due Date: &emsp;&nbsp;<p>{dueDate}</p>
        </p>
      </div>
    </div>
  );
};

// const HistoryCard = ({
//   jobTitle,
//   jobDescription,
//   mark_x,
//   mark_XII,
//   mark_degree,
//   skills,
//   dueDate,
// }) => {
//   return (
//     <div className={styles.HistoryCard}>
//       <div className={styles.details}>
//         <div className={styles.jobTitle}>
//           <p>
//             Title: <p>{jobTitle}</p>
//           </p>
//         </div>
//         <div className={styles.jobDescription}>
//           <p>
//             Description: <p>{jobDescription}</p>
//           </p>
//         </div>
//         <div className={styles.education}>
//           <p>Education:</p>
//           <div className={styles.educationDetails}>
//             <p className={styles.educationP}>
//               Xth: <p>{mark_x}</p>
//             </p>
//             <p className={styles.educationP}>
//               XIIth: <p>{mark_XII}</p>
//             </p>
//             <p className={styles.educationP}>
//               Degree: <p>{mark_degree}</p>
//             </p>
//           </div>
//         </div>
//         <div className={styles.skills}>
//           <p>
//             Skills: <p>{skills}</p>
//           </p>
//         </div>
//         <div className={styles.dueDate}>
//           <p>
//             Due Date: <p>{dueDate}</p>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
