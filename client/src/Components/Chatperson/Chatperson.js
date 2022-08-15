import React, { useState, useEffect } from "react";
import "../Chatperson/chatperson.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
const config = require("../../config.json");

const Chatperson = () => {
  const navigate = useNavigate();
  const [person, setperson] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const gettoken = localStorage.getItem("token");
    if (!gettoken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const id = jwt_decode(localStorage.getItem("token")).user_info[0]._id;
    axios
      .get(`${config.api_url}auth/getAllUsers/${id}`)
      .then((response) => setperson(response.data))
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="chatperson_main">
      <div className="conversation_head">
        <div className="conversation_arrow">
          <IoArrowBackOutline
            className="conversation_ICON"
            onClick={() => navigate("/message")}
          />
        </div>
        <div className="conversation_heading">
          <p>Start Conversation</p>
        </div>
      </div>
      <div className="logoutheading" onClick={() => navigate("/logout")}>
        <p>Logout</p>
      </div>
      <div className="conversation_search">
        <div className="saerch_bar">
          <div>
            <AiOutlineSearch className="sarch_icon" />
          </div>
          <div className="saerch_bar_inputdiv">
            <input
              type="text"
              className="search_input"
              placeholder="Search By Name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="total_person">
        <p> total person:{person.length}</p>
      </div>
      <div className="person_data_div">
        {person
          ?.filter((e) => {
            if (
              e?.fullName?.toLowerCase().includes(searchValue?.toLowerCase())
            ) {
              return e;
            }
          })
          .map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="conversation_persondiv" 
                  onClick={(e) => {
                    item.profile_image ?    navigate(
                      `/type-message/${item._id}/${item.fullName}/${item.profile_image}`
                      ) :    navigate(
                        `/type-message/${item._id}/${item.fullName}/no-image`
                        )
                  }
                 
                    }
                    >
                  <div className="person_img_div">
                    <img
                      src={`${config?.image_url}${item?.profile_image}`}
                      alt="image"
                      className="person_img_main"
                    />
                  </div>
                  <div className="person_name_div">{item?.fullName}</div>
                </div>
                <div></div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Chatperson;
