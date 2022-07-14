import React, { useState, useEffect, useRef } from "react";
import "../Typemesssage/messagetype.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";
const config = require("../../config.json");

const Messagetype = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [chatArray, setchatArray] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { chatid, chatname, chatpic } = useParams();
  const scrollRef = useRef();

  const from = jwt_decode(localStorage.getItem("token")).user_info[0]._id;
  const fromImage = localStorage.getItem("currentUserImage");
  const to = chatid;

  const handleMessage = async (e) => {
    e.preventDefault();
    await axios
      .post(`${config.api_url}chat/postchat`, {
        to: to,
        from: from,
        message: message,
      })
      .then((data) => setMessage(""))
      .catch((error) => console.log(error));
    socket.current.emit("send-msg", {
      to: to,
      from: from,
      message: message,
    });
    const messagesArray =
      chatArray === undefined ? [chatArray] : [...chatArray];
    messagesArray.push({ message: message, from: from });
    setchatArray(messagesArray);
  };

  useEffect(() => {
    const response = async () => {
      if (to) {
        await axios
          .get(`${config.api_url}chat/getChat/${from}/${to}`)
          .then((response) => setchatArray(response?.data?.message))
          .catch((error) => console.log(error));
      }
    };
    response();
  }, [to]);

  useEffect(() => {
    if (from) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("add-user", from);
    }
  }, [from]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message", (msg) => {
        setArrivalMessage({ from: to, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (chatArray !== undefined) {
      arrivalMessage && setchatArray((prev) => [...prev, arrivalMessage]);
    } else {
      arrivalMessage && setchatArray((prev) => [arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatArray]);

  return (
    <>
      <div className="chattype_head">
        <div className="conversation_head">
          <div className="conversation_arrow">
            <IoArrowBackOutline
              className="conversation_ICON"
              onClick={(e) => navigate("/chat-conversation")}
            />
          </div>
          <div className="conversation_heading">
            <p>Start Conversation</p>
          </div>
        </div>
        <div className="messaegtype_div">
          <div className="before_messsage">
            <p>Start conversation with {chatname}</p>
          </div>
          {chatArray !== undefined ? (
            <>
              {chatArray?.map((item, index) => {
                return (
                  <div
                    ref={scrollRef}
                    key={index}
                    className={
                      item?.from === from
                        ? "chat_message_send"
                        : "chat_message_recieve"
                    }
                  >
                  <div className="chat_text_container">
                    <p  className={
                      item?.from === from
                        ? "chat_text_send"
                        : "chat_text_recieve"
                    }>{item?.message}</p>
                  </div>
                    <img
                      src={
                        item?.from === from
                          ? `${config?.image_url}${fromImage}`
                          : `${config?.image_url}${chatpic}`
                      }
                      alt="error"
                      className="chat_image"
                    />
                  </div>
                );
              })}{" "}
            </>
          ) : (
            <p>Welcome to Chat app</p>
          )}

          <div className="typeinput_div">
            <div className="type_input_div">
              <div className="send_input_div">
                <textarea
                  rows="1"
                  cols="10"
                  name="comment"
                  form="usrform"
                  className="send_input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="send_icon_div">
                <AiOutlineSend className="send_icon" onClick={handleMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messagetype;
