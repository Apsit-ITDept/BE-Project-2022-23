import { useState } from "react";
import httpClient from "../../../../httpClient";

export default function Test() {
  const [candidates, setCandidates] = useState([]);
  const [recommedations, setRecommendations] = useState([])
  const get_candidates = async (event) => {
    try {
      let jobId = 0;
      // let jobId = event.target.value;
      const resp = await httpClient.get(
        "///localhost:5000/candidatesApplied/" + jobId
      );
      setCandidates(resp.data.candidates);
      setRecommendations(resp.data.recommend)
    } catch (error) {
      console.log(error);
    }
  };
  console.log("candidates", candidates)
  console.log("recommedations", recommedations)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <button
        style={{
          width: "200px",
          height: "50px",
          background: "black",
          color: "white",
          fontWeight: "bolder",
          fontSize: "18px",
        }}
        onClick={get_candidates}
      >
        Test
      </button>
    </div>
  );
}
