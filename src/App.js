import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

import NotFound from "./Components/NotFound/NotFound";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Components/Loader/Loader";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import cookie from "react-cookies";
import UsersPage from "./Components/UsersPage/UsersPage";
// import UserProfile from "./Components/UserProfile";
import UserProfile from "./Components/UserProfile";
import MyProfile from "./Components/MyProfile/MyProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState(cookie.load("token"));
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    const { data } = await axios.get(
      `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers`
    );
    console.log(data);
    // setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);
  return (
    <>
      <Navbar userToken={userToken} setUserToken={setUserToken} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          {userToken ? (
            <Route
              path="/messages"
              element={<MyProfile users={users} userToken={userToken} />}
            ></Route>
          ) : (
            <>
              <Route path="" element={<Home />}></Route>
              <Route
                path="/login"
                element={<Login setUserToken={setUserToken} />}
              ></Route>
              <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
              <Route path="/resetCode/:email" element={<ResetPassword />}></Route>

              <Route path="/register" element={<Register />}></Route>
            </>
          )}

          <Route path="/list" element={<UsersPage users={users} />}></Route>

          <Route
            path="/user/:id"
            element={<UserProfile users={users} />}
          ></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
