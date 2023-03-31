import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ResetPassword = () => {
    const [inputFields,setInputFields]=useState({code:"",newPassword:""});
    const {email}=useParams();
    console.log(email);
    const onChange=(event)=>{
       const {name,value}=event.target;
       setInputFields({...inputFields,[name]:value});
    }
    const navigate=useNavigate();
    const submitForm=async(event)=>{
      event.preventDefault();
      const {data}=await axios.patch(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword`,{...inputFields,email});
      if(data.message==="success"){
        toast.success("Password changed successfully!");
        navigate("/login");
      }else if(data.message==="fail"){
        toast.error("Please enter the right code!!");
      }
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
          className="form-control my-3"
          placeholder="Please enter the code"
          type="text"
          name="code"
          value={inputFields.code}
          onChange={onChange}
        />
          <input
          className="form-control my-3"
          placeholder="Please enter the new-password"
          type="text"
          name="newPassword"
          value={inputFields.newPassword}
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

export default ResetPassword