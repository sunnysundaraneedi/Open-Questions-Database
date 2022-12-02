import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddNew from "./Components/AddNew/AddNew";
import Browse from "./Components/Browse/Browse";
import Error from "./Components/Error/Error";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import Profiles from "./Components/Profiles/Profiles";
import Register from "./Components/Register/Register";
import { fetchQuestions, fetchUsers } from "./store/fetchUsers";

const App = () => {
  const users = useSelector((state) => state.users.users);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data);
    };
    getProducts();
  }, []);

  console.log(users);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addnew" element={<AddNew categories={categories} />} />

        <Route path="/browse" element={<Browse />} />
        <Route path="/error" element={<Error />} />

        <Route path="/profiles">
          <Route path=":profileID" element={<Profiles />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
