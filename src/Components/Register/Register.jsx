import React from "react";
import Joi from "joi";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CustomInput from "./../Common/CustomInput";
import { toast } from 'react-toastify';

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const registerSchema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    cPassword: Joi.string().required(),
  });
  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    const validation = validateInput(value, registerSchema.extract(name));
    if (validation.error) {
      setErrors({ ...errors, [name]: validation.error.details[0].massage });
    } else {
      const err = { ...errors };
      delete err[name];
      setErrors({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      const result = await axios.post(
        `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup`,
        inputs
      );
      toast.success("You're registered successfully, please confirm your email");
      console.log(result);
    }
    // console.log(result);
  };
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
          <CustomInput
            text="Enter your name"
            type="text"
            name="name"
            onChange={onChange}
            error={errors.name}
          />

          <CustomInput
            text="Enter your email"
            type="email"
            name="email"
            onChange={onChange}
            error={errors.email}
          />

          <CustomInput
            text="Enter your password"
            type="password"
            name="password"
            onChange={onChange}
            error={errors.password}
          />

          <CustomInput
            text="Enter your cPassword"
            type="password"
            name="cPassword"
            onChange={onChange}
            error={errors.cPassword}
          />

          <button className="btn btn-default-outline my-4 w-100 rounded">
            Login
          </button>
          <p>
            <a className="text-muted forgot btn" href>
              I Forgot My Password
            </a>
          </p>
          <Link className="btn btn-default-outline" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
