import React from "react";
import Question from "../Question/Question";
import "./Profile.css";

const Profile = ({ user }) => {
  const error = (
    <div className="error_msg profile_error">No questions found.</div>
  );
  const date = user.created.toDate().toDateString();
  console.log(user);
  return (
    <div className="profile">
      <h2>
        <span className="username">{`${user.username.split(" ")[0]}`}</span>'s
        Profile
      </h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Verified Questions</th>
            <th>Unverified Questions</th>
            <th>User Rank</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.questions.length}</td>
            <td>0</td>
            <td>Standard Profile</td>
            <td>{date}</td>
          </tr>
        </tbody>
      </table>
      <h2>Verified Questions</h2>
      {user.questions.length !== 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Difficulty</th>
              <th>Question / Statement</th>
            </tr>
          </thead>
          <tbody>
            {user.questions.length !== 0 &&
              user.questions.map((question, index) => (
                <Question question={question} key={index} profile={false} />
              ))}
          </tbody>
        </table>
      ) : (
        error
      )}
      <h2>Unverified Questions</h2>
      {error}
    </div>
  );
};

export default Profile;
