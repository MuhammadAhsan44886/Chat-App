import React, { useState } from "react";
import "../Logout/logout.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import profile from "../images/signup.gif";

const Logout = () => {
  const [logoutstate, setLogoutState] = useState({
    name: "",
    email: "",
  });
const handlechnage =(e)=>{
setLogoutState({
  ...logoutstate,
[e.target.name]:e.target.value,
});
}
console.log("logout", logoutstate)
  return (
    <>
      <div className="logout_main">
        <div className="logout_head">
          <div className="back_icon">
            <IoArrowBackOutline />
          </div>
          <div>
            <p className="logout_heading"> profile</p>
          </div>
          <div className="edit_icon">
            <MdModeEditOutline />
          </div>
        </div>
        <div className="profile_data">
          <div className="profilediv_img">
            {" "}
            <img src={profile} alt="" />
          </div>
        </div>
        <div className="profile_input">
          <label for="fname" className="proilediv_label">
            Name:
          </label>
          <input
            type="text"
            id="fname"
            name="name"
            value={logoutstate.name}
            onChange={(e)=>handlechnage(e)}
            placeholder="QHAMANI Ketani"
            className="proilediv_input"
          />
          <label for="lname" className="proilediv_label1">
            Email:
          </label>
          <input
            type="email"
            id="lname"
            name="email"
            onChange={(e)=>handlechnage(e)}
            placeholder="Ketaniqhamani@gmail.com"
            className="proilediv_input"
          />
        </div>
        <div className="logoutbutton_div">
          <button className="loout_btn">LOGOUT</button>
        </div>
      </div>
    </>
  );
};

export default Logout;
