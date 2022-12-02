import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error_msg">
      <span className="error">ERROR!</span> You must be logged in to submit a
      trivia question.
    </div>
  );
};

export default Error;
