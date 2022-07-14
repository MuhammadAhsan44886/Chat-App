import React, { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineTextsms } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "../chat-message/message.css";
const Message = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const gettoken = localStorage.getItem("token");
    if (!gettoken) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="message_main">
        <div className="message_head">
          <div>
            <p className="messaeg_name"> chat app</p>
          </div>
          <div className="profile_icon">
            <BsPersonFill className="icon" />
          </div>
        </div>
        <div className="main_mesagediv">
          <div className="mesage_person">
            <div className="notice_mesage">
              <MdOutlineTextsms className="sms_icon" />
              <h5>No conversation</h5>
              <p>click the plus to start a new conversation</p>
            </div>
          </div>
          <div className="add_person">
            <div className="plus_div">
              <AiOutlinePlus className="plus_icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
