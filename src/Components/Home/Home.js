import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  return (
    <Fragment>
      <div className="home_container">
        <div className="img_container">
          <img src="https://opentdb.com/images/logo.png" alt="" />
        </div>
        <h2>Free to use, user-contributed trivia question database.</h2>
        <h4>4,072 Verified Questions and 9,529 Pending Questions</h4>
        <div className="home_action_btns">
          <Link to="/browse" className="btn home_action_btn">
            <i className="uil uil-bars" /> BROWSE
          </Link>
          <Link
            to={`${isAuthenticated ? "/addnew" : "/error"}`}
            className="btn home_action_btn"
          >
            <i className="uil uil-plus" /> ADD NEW QUESTIONS
          </Link>
        </div>
      </div>

      <div className="footer">
        <h4>OTHER LINKS</h4>
        <span className="links">Forums</span>
        <br />
        <span className="links">Tower Unite</span>
        <br />
        <span className="copyright">
          <b>Open Trivia DB</b> is created and maintained by the good folks at{" "}
          <span className="links">PIXELTAIL GAMES LLC</span>.
        </span>
      </div>
    </Fragment>
  );
};

export default Home;
