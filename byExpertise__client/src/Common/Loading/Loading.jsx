import React from "react";
import "../../styles/loading.css";
import ClipLoader from "react-spinners/ClipLoader"; //import ClipLoader component

//Loading Component. Would create a full screen overlay with a spinner
export const Loading = () => {
  return (
    <div className="overlay">
      <div className="center">
        <ClipLoader size={50} />
      </div>
    </div>
  );
};
