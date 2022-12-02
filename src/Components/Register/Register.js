import React from "react";
import "./Register.css";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setInputFields((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "users"), {
        ...inputFields,
        questions: [],
        created: Timestamp.now(),
      });
      navigate("/login");
    } catch (error) {
      console.log("Something went wrong : ", error);
    }
  };
  return (
    <div className="register_container login_container">
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          value={inputFields.username}
          onChange={changeHandler}
          name="username"
          type="text"
          placeholder="Username"
        />

        <label htmlFor="password">Password</label>
        <input
          value={inputFields.password}
          onChange={changeHandler}
          name="password"
          type="password"
          placeholder="Password"
        />

        <label htmlFor="email">Email Address</label>
        <input
          value={inputFields.email}
          onChange={changeHandler}
          name="email"
          type="email"
          placeholder="Email Address"
        />

        <div className="action_btns">
          <button className="btn action_btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
