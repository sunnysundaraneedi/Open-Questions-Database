import { doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import "./AddNew.css";

const AddNew = ({ categories }) => {
  const navigate = useNavigate();
  const questionss = useSelector((state) => state.users.questions);
  const currentUser = useSelector((state) => state.users.currentUser);
  const { trivia_categories } = categories;
  //
  const [user, setUser] = useState(currentUser.data);
  // Current User

  useEffect(() => {
    const user = async () => {
      const docRef = doc(db, "users", currentUser.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    user();
  }, [currentUser.id]);
  // The End

  // inputs
  const [inputFields, setInputFields] = useState({
    category: trivia_categories[0].name,
    type: "Multiple Choice Questions",
    difficulty: "Easy",
    question: "",
    correctAnswer: "",
    incorrectAnswer1: "",
    incorrectAnswer2: "",
    incorrectAnswer3: "",
    references: "",
  });
  const [trueFalse, setTrueFalse] = useState(false);

  const changeHandler = (event) => {
    setInputFields((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  useEffect(() => {
    if (inputFields.type === "True or False") {
      setTrueFalse(true);
    } else {
      setTrueFalse(false);
    }
  }, [inputFields]);
  // submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    const userID = currentUser.id;
    const username = currentUser.data.username;
    const qID = questionss[0].data.questions.length + 1;

    //document reference
    const userDocRef = doc(db, "users", currentUser.id);
    const questionsDocRef = doc(db, "questions", questionss[0].id);
    try {
      await updateDoc(userDocRef, {
        questions: [...user.questions, { ...inputFields }],
      });
      console.log([...currentUser.data.questions, { ...inputFields }]);
      await updateDoc(questionsDocRef, {
        questions: [
          ...questionss[0].data.questions,
          { ...inputFields, userID, username, qID },
        ],
      });
      console.log([
        ...questionss[0].data.questions,
        { ...inputFields, userID },
      ]);
      alert("Question Added");
      navigate("/");
    } catch (error) {
      console.log("Something Went Wrong : ", error);
    }
  };

  return (
    <div className="addnew_container">
      <h2>Add new question</h2>
      <div className="form_container">
        <form onSubmit={submitHandler}>
          {/* row_1 */}
          <div className="row_1">
            {/* categories */}
            <div>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={inputFields.category}
                onChange={changeHandler}
              >
                {trivia_categories.map((category) => (
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            {/* type */}
            <div>
              <label htmlFor="">Type</label>
              <select
                name="type"
                value={inputFields.type}
                onChange={changeHandler}
              >
                <option>Multiple Choice Questions</option>
                <option>True or False</option>
              </select>
            </div>
            {/* difficulty */}
            <div>
              <label htmlFor="">Difficulty</label>
              <select
                name="difficulty"
                value={inputFields.difficulty}
                onChange={changeHandler}
              >
                <option>Easy</option>
                <option>Meduim</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
          {/* row_2 */}
          <div className="row_2">
            <div>
              <label htmlFor="">Question</label>
              <input
                type="text"
                name="question"
                value={inputFields.question}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* row_3 */}
          {!trueFalse ? (
            <div className="row_3">
              <div>
                <label htmlFor="">Correct Answer</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={inputFields.correctAnswer}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <label htmlFor="">Incorrect Answer #1</label>
                <input
                  type="text"
                  name="incorrectAnswer1"
                  value={inputFields.incorrectAnswer1}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <label htmlFor="">Incorrect Answer #1</label>
                <input
                  type="text"
                  name="incorrectAnswer2"
                  value={inputFields.incorrectAnswer2}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <label htmlFor="">Incorrect Answer #1</label>
                <input
                  type="text"
                  name="incorrectAnswer3"
                  value={inputFields.incorrectAnswer3}
                  onChange={changeHandler}
                />
              </div>
            </div>
          ) : (
            <div className="row_3 radio_row">
              <input
                type="radio"
                id="html"
                name="fav_language"
                className="radio_btn"
              />
              <label htmlFor="html">True</label>
              <input
                type="radio"
                id="css"
                name="fav_language"
                className="radio_btn"
              />
              <label htmlFor="css">False</label>
            </div>
          )}
          {/* row_4 */}
          <div className="row_4">
            <div>
              <label htmlFor="">
                References [Provide Links to Respected Sources] [Videos must
                have Timestamps]
              </label>
              <input
                type="text"
                name="references"
                value={inputFields.references}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="add">
            <button className="btn add_btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNew;

// <input
//               type="text"
//               value={inp}
//               onChange={(event) => setInp(event.target.value)}
//             />
