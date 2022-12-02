import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import Question from "../Question/Question";
import "./Browse.css";

const Browse = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.users.questions);
  const [searchInput, setSearchInput] = useState("");
  const [type, setType] = useState("Question");

  // filtered
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  useEffect(() => {
    if (questions.length !== 0) {
      setFilteredQuestions(questions[0].data.questions);
    }
  }, [questions]);

  // search Handler
  const searchHandler = () => {
    if (type === "Question") {
      const filterCopy = questions[0].data.questions.filter((question) => {
        return question.question
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      console.log(filterCopy);
      if (filterCopy.length === 0) {
        alert("no questions found");
        return;
      }
      setFilteredQuestions(filterCopy);
    } else if (type === "User") {
      console.log("hit");
      const filterCopy = questions[0].data.questions.filter((question) => {
        return question.username
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      if (filterCopy.length === 0) {
        alert("no categories found");
        return;
      }
      setFilteredQuestions(filterCopy);
    } else if (type === "Category") {
      console.log("hit");
      const filterCopy = questions[0].data.questions.filter((question) => {
        return question.category
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      if (filterCopy.length === 0) {
        alert("no categories found");
        return;
      }
      setFilteredQuestions(filterCopy);
    }
  };
  const sortHandler = () => {
    dispatch(userActions.sortQuestions());
  };
  // If condition
  if (questions.length === 0 || filteredQuestions.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="browse_container">
      <div className="searchbar">
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <select
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option>Question</option>
          <option>User</option>
          <option>Category</option>
        </select>
        <button onClick={searchHandler}>
          <i className="uil uil-search"></i>Search
        </button>
      </div>
      <h2>Browse Questions</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              ID
              <i className="uil uil-direction" onClick={sortHandler}></i>
            </th>
            <th>Category</th>
            <th>Type</th>
            <th>Difficulty</th>
            <th>Question / Statement</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {questions.length !== 0 &&
            filteredQuestions.map((question) => (
              <Question question={question} key={question.qID} profile={true} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Browse;

// useEffect(() => {
//     const user = async () => {
//       const docRef = doc(db, "users", currentUser.id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         setUser(docSnap.data());
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//       }
//     };
//     user();
//   }, []);

// {questions[0].data.questions.map((question) => (
//   <p key={question}>{question.question}</p>
// ))}
