import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import cookie from 'react-cookies'
import { Link } from 'react-router-dom';
const Login = ({setUserToken}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const validateUser = () => {
    let schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  };
  // const schema = Joi.object({
  //   email: Joi.string().required(),
  //   password: Joi.string().required(),
  // });
  // return schema.validate(user, { abortEarly: false });

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  //  console.log(validateUser());
  const submitForm = async (e) => {
    e.preventDefault();
    const errorsList = [];
    const validation = validateUser();

    if (validation.error) {
      validation.error.details.map((err) => {
        errorsList.push(err.message);
      });
      setErrors(errorsList);
    } else {
      setErrors([]);
      const { data } = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
        user
      );
      // console.log(data);
      if (data.message === "success") {
        console.log(data.token);
        
        const expires=new Date();
        const futureDay=expires.getDate()+1;
        expires.setDate(futureDay);
        console.log(expires);
        cookie.save("token",data.token, {expires});
        setUserToken(data.token);
      } else {
        data.err.map((err) => {
          errorsList.push(err[0].message);
        });
        setErrors(errorsList);
      }
    }
  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={submitForm}>
          {errors.map((err, index) => (
            <div class="alert alert-danger" role="alert" key={index}>
              {err}
            </div>
          ))}
          <input
            className="form-control"
            placeholder="Enter your email"
            type="text"
            name="email"
            onChange={onChange}
          />
          <input
            className="form-control my-4 "
            placeholder="Enter your Password"
            type="text"
            name="password"
            onChange={onChange}
          />
          <button className="btn btn-default-outline my-4 w-100 rounded">
            Login
          </button>
          <p>
            <Link className="text-muted forgot btn" to="/forgetPassword">
              I Forgot My Password
            </Link>
          </p>
          <Link className="btn btn-default-outline" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
