import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);

  const [drop, setDrop] = useState(false);
  const clickHandler = () => {
    console.log("hit");
    isAuthenticated && setDrop(!drop);
  };
  const logoutHandler = () => {
    dispatch(userActions.logUserOut());
    setDrop(false);
  };

  const profileButton = isAuthenticated && (
    <div className="dropdown">
      <button onClick={clickHandler} className="btn drop_btn">
        <i className="uil uil-user" /> {currentUser.data.username.split(" ")[0]}
        <i className="uil uil-angle-down"></i>
      </button>
      <div
        style={drop === true ? { display: "block" } : { display: "none" }}
        className="dropdown-content"
      >
        <Link to={`/profiles/${currentUser.id}`} onClick={() => setDrop(false)}>
          <i className="uil uil-user" /> View Profile
        </Link>
        <Link onClick={logoutHandler} to="/">
          <i className="uil uil-signin" /> Log Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="nav_container">
      <Link to="/">
        <img src="https://opentdb.com/images/logo-banner.png" alt="" />
      </Link>
      <div className="nav_links">
        <ul>
          <li className="btn">
            <Link to="/browse">
              <i className="uil uil-bars" /> BROWSE
            </Link>
          </li>
          <Link to={`${isAuthenticated ? "/addnew" : "/error"}`}>
            <li className="btn">
              <i className="uil uil-plus" /> ADD NEW QUESTIONS
            </li>
          </Link>
          {isAuthenticated ? (
            profileButton
          ) : (
            <Link to="/login">
              <li className="btn">
                <i className="uil uil-signin" /> LOGIN
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

// <Link to={`/profiles/${currentUser.id}`}>
//   <li className="btn">
//     <i className="uil uil-user" /> {currentUser.data.username.split(" ")[0]}
//   </li>
// </Link>;
