import React, { useState } from "react";
import "../Logout/logout.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const config = require("../../config.json");

const Logout = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [userimage, setuserimage] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken === null) {
      navigate("/login");
    } else {
      const userinfo = jwt_decode(localStorage.getItem("token")).user_info[0];
      setuser(userinfo);
      const id = userinfo._id;
      axios
      .get(`${config.api_url}chat/getFromImage/${id}`)
      .then((response) => setuserimage(response?.data?.image))
      .catch((error) => console.log(error));
    }
  }, []);
  
  console.log(user)
  return (
    <>
      <div className="logout_main">
        <div className="logout_head">
          <div className="back_icon">
            <IoArrowBackOutline
              onClick={() => navigate("/chat-conversation")}
            />
          </div>
          <div>
            <p className="logout_heading"> profile</p>
          </div>
          <div className="edit_icon">
            <MdModeEditOutline onClick={() => navigate("/edit-profile")} />
          </div>
        </div>
        <div className="profile_data">
          <div className="profilediv_img">
            {" "}
            <img src={`${config?.image_url}${userimage}`} alt="" />
          </div>
        </div>
        <div className="profile_input">
          <label for="fname" className="proilediv_label">
            Name:
          </label>
          <p>{user.fullName}</p>

          <label for="lname" className="proilediv_label1">
            Email:
          </label>
          <p>{user.email}</p>

          <label for="lname" className="proilediv_label1">
            Option:
          </label>
          <p>{user.option}</p>
        </div>
        <div className="logoutbutton_div">
          <button className="loout_btn" onClick={() => handleLogout()}>
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
