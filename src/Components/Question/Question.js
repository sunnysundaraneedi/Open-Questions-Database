import React from "react";
import { Link } from "react-router-dom";

const Question = ({ question, profile }) => {
  return (
    <tr>
      {profile && <td>{question.qID}</td>}
      <td>{question.category}</td>
      <td>{question.type}</td>
      <td>{question.difficulty}</td>
      <td>{question.question}</td>
      {profile && (
        <td>
          <Link to={`/profiles/${question.userID}`} className="links">
            {question.username}
          </Link>
        </td>
      )}
    </tr>
  );
};

export default Question;
