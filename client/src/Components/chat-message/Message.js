import React, { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineTextsms } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../chat-message/message.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
const config = require("../../config.json");

const Message = () => {
  const navigate = useNavigate();
  const [localuserdata, setlocaluserdata] = useState("");
  const [conversations, setconversations] = useState([]);
  const [userimage, setuserimage] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken === null) {
      navigate("/login");
    } else {
      const getUser = jwt_decode(localStorage.getItem("token"));
      const id = getUser?.user_info[0]?._id;
      setlocaluserdata(getUser.user_info[0]);
      axios
        .get(`${config.api_url}chat/getFromImage/${id}`)
        .then((response) => setuserimage(response?.data?.image))
        .catch((error) => console.log(error));
      axios
        .get(`${config.api_url}chat/previousconversations/${id}`)
        .then((response) => {
          setconversations(response.data);
        })
        .catch((error) => console.log(error));
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
            <img
              src={`${config.image_url}${userimage}`}
              alt=""
              className="icon"
              onClick={() => navigate("/edit-profile")}
            />
            {/* <BsPersonFill
              className="icon"
              onClick={() => navigate("/edit-profile")}
            /> */}
          </div>
        </div>
        <div className="main_mesagediv">
          {conversations.status === true ? (
            <div className="conversationcontainer">
              <Grid container>
                {conversations.conversations.map((item, index) => {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                      <div
                        className="subconversationcontainer"
                        onClick={() =>
                          navigate(
                            item?.toUser?.toid === localuserdata?._id
                              ? `/type-message/${item?.fromUser?.fromid}/${item?.fromUser?.fromname}/${item?.fromUser?.frompic}`
                              : `/type-message/${item?.toUser?.toid}/${item?.toUser?.chatname}/${item?.toUser?.chatpic}`
                          )
                        }
                      >
                        <div className="imagecontainer">
                          <img
                            src={`${config.image_url}${
                              item?.toUser?.toid === localuserdata?._id
                                ? item?.fromUser?.frompic
                                : item?.toUser?.chatpic
                            }`}
                            alt="noimage"
                          />
                        </div>
                        <div className="textcontainer">
                          <h1>
                            {item?.toUser?.toid === localuserdata?._id
                              ? item?.fromUser?.fromname
                              : item?.toUser?.chatname}
                          </h1>
                          <Typography
                            component="div"
                            noWrap="true"
                            className="messagetext"
                          >
                            {item?.messagee?.pop()?.message}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          ) : (
            <div className="mesage_person">
              <div className="notice_mesage">
                <MdOutlineTextsms className="sms_icon" />
                <h5>No conversation</h5>
                <p>click the plus to start a new conversation</p>
              </div>
            </div>
          )}

          <div className="plus_div">
            <AiOutlinePlus
              className="plus_icon"
              onClick={() => navigate("/chat-conversation")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
