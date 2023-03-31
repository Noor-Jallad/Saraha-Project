import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [email,setEmail]=useState(null);
    const navigate=useNavigate();
    const onChange=(event)=>{
        const {value}=event.target;
        setEmail(value);
    }
    const submitForm=async (event)=>{
        event.preventDefault();
        if(!email || email.length < 8){
            toast.warning("Please enter your email");
            return;
        }

        const {data}=await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode",{email});
        toast.success("please check your email");
        navigate(`/resetCode/${email}`);
    }
  return (
    <div className="container text-center my-5">
    <div className="user my-3">
      <i className="fas fa-user-secret user-icon" />
      <h4 className="login">Forget Password</h4>
    </div>
    <div className="card p-5 w-50 m-auto">
      <form method="POST" action="/handleLogin" onSubmit={submitForm}>
        <input
          className="form-control"
          placeholder="Enter your email"
          type="text"
          name="email"
          onChange={onChange}
        />
      
        <button className="btn btn-default-outline my-4 w-100 rounded">
          Reset Password
        </button>
       
       
      </form>
    </div>
  </div>
  )
}

export default ForgetPassword