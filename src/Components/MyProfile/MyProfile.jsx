import React, { useEffect, useState } from "react";
import findUser from "./../../utilities/FindUsers";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from 'react-toastify';
import styles from "./styles.module.css"
import copy from "copy-to-clipboard";

const MyProfile = ({ users, userToken }) => {
  const [profileUser, setProfileUser] = useState({});
  const [messages, setMessages] = useState([]);
  const tokenApi = `tariq__${userToken}`;
  const getMessages = async () => {
    const { data } = await axios.get(
      `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages`,
      { headers: { token: tokenApi } }
    );
    if (data.message == "success") {
      setMessages(data.messages);
    }
    console.log(data);
  };
  const getUser = () => {
    const decoded = jwtDecode(userToken);
    // console.log(decoded);
    setProfileUser(findUser(users, decoded.id));
  };
  const deleteMessage=async(id)=>{
    const {data} = await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{headers:{token:tokenApi}});
    console.log(data);
    toast.success("Deleted Successfully");
    getMessages();
  }

  useEffect(() => {
    getUser();
    getMessages();
  }, []);
  // console.log(profileUser);

  const ShareProfile=(event,url)=>{
    event.preventDefault();
    copy(url);
  }

  return (
    <div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="/assets/images/avatar.png" className="avatar " alt />
          </a>
          <h3 className="py-2 text-capitalize">{profileUser.userName}</h3>
          <button
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
            onClick={(e)=>ShareProfile(e,`http://localhost:3000/user/${profileUser._id}`)}
          >
            <i className="fas fa-share-alt" /> Share Profile
          </button>
        </div>
      </div>
      <div className="container text-center my-5 text-center">
        {messages.length == 0 ? (
          <div className="row">
            <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div className="row my-4">
              <div className="col-md-12">
                <div className="card py-5 position-relative">
                  <p>{message.text} </p>
                  <div className={styles.deleteBtn} onClick={()=>deleteMessage(message._id)}><i className="fa-solid fa-trash" />
</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProfile;
