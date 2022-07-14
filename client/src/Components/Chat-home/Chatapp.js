import React, {useState, useEffect} from "react";
import '../Chat-home/chatapp.css'
import signup from "../images/signup.gif";
import { Link } from "react-router-dom";

const Chatapp = () => {
  return (
    <>
      <div className="chatapp_main">
        <div className="chatapp_heading">
          <p>chat app</p>
        </div>
        <div className="chatapp_img">
        <img src={signup} alt="" className="image_signup" />
        </div>
        <div className="chatapp_btn">
       <Link to="/signup" > <button className="btn_home">Signup</button></Link>
        </div>
        <div className="chatapp_btn">
        <p className="chatapp_alrready">already have an account?</p>
        </div>
      </div>
    </>
  );
};

export default Chatapp;
