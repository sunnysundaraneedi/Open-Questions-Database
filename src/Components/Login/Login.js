import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(userActions.logUserIn({ loginEmail, loginPassword }));
    navigate(`/`);
  };

  return (
    <div className="login_container">
      <h2>Sign In</h2>
      <form onSubmit={submitHandler}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          name="email"
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <div className="action_btns">
          <button className="btn action_btn">Sign In</button>
          <button type="button" className="btn action_btn">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
