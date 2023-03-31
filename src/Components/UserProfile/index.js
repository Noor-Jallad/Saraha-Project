import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import findUser from "../../utilities/FindUsers";
import { toast } from "react-toastify";
const UserProfile = ({users}) => {
    const {id}=useParams();
    console.log(id);
    const [inputField,setInputField]=useState("");
    const [user,setUser]=useState(findUser(users,id));
    const onChange=(event)=>{
     const {value}=event.target;
     setInputField(value);
    }

    const submitForm=async (event)=>{
      event.preventDefault();
      const apiUrl= `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`;
      const result= await axios.post(apiUrl, {message: inputField});
      if(result.data.message==="success")
      {
        toast.success("Sent Successfully");
      }
      console.log(result.data);
    }
    const shareProfile=(event,url)=>{
      event.preventDefault();
      copy(url);
    }
    console.log(user);
  return (
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <a href data-toggle="modal" data-target="#profile">
          <img src="/assets/images/avatar.png" className="avatar " alt />
        </a>
        <h3 className="py-2 text-capitalize">{user.userName}</h3>
        <div className="container w-50 m-auto">
          <form action method="post" onSubmit={submitForm}>
            <textarea
              className="form-control"
              name
              id
              cols={10}
              rows={9}
              onChange={onChange}
              placeholder="Send Your Message!!"
              defaultValue={inputField}
            />
            <button className="btn btn-outline-info mt-3">
              <i className="far fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
      <button
        data-toggle="modal"
        data-target="#share"
        className="btn btn-default-outline share "
        onClick={(e)=>shareProfile(e,window.location)}
      >
        <i className="fas fa-share-alt" /> Share Profile
      </button>
    </div>
  );
};

export default UserProfile;
