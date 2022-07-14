import React, { useState, useEffect } from "react";
import "../Editprofile/editprofile.css";
import { Button } from "@material-ui/core";
import { IoArrowBackOutline } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const config = require("../../config.json");

const Editprofile = () => {
  const [userdata, setUserData] = useState();
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageName(e.target.files[0].name);
    }
  };

  const id = jwt_decode(localStorage.getItem("token")).user_info[0]._id;
  useEffect(() => {
    const response = async () => {
      const data = await axios.get(`${config.api_url}auth/getUser/${id}`);
      setUserData(data.data);
    };
    response();
  }, []);

  useEffect(() => {
    const gettoken = localStorage.getItem("token");
    if (!gettoken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="edit_profile">
        <div className="edit_profile_head">
          <div className="edit_profile_arrow">
            <IoArrowBackOutline className="EDIT_PROFILE_ICON" />
          </div>
          <div className="edit_profile_heading">
            <p>Edit profile</p>
          </div>
        </div>
        <div className="editprofile_input">
          <div className="input_editable">
            <label for="fname" className="editable_lable">
              First name:
            </label>
            <input
              type="text"
              className="editable_input"
              id="fname"
              name="fname"
              placeholder="KeTANIqhamani@gmail.com"
            />
            <label for="lname" className="editable_lable">
              Last name:
            </label>
            <input
              type="text"
              className="editable_input"
              id="lname"
              name="lname"
              placeholder="password"
            />
            <label for="lname" className="editable_lable">
              Full name:
            </label>
            <input
              type="text"
              className="editable_input"
              id="lname"
              name="lname"
              placeholder="Qhamani Ketani"
            />
          </div>
          <div className="profile_picture_chnage">
            <div className="changeimage_headig">profile picture</div>
            <div className="profilehnage_div">
              <div className="editeable_picture_upload">
                <label
                  htmlFor="contained-button-file"
                  className="profilechnage_main_width"
                >
                  <input
                    className="change_profile_imagebtn"
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className="chnageprofile_image_button selectanimagebutton"
                  >
                    <span className="change">change photo</span>
                  </Button>
                </label>
                {image ? (
                  <img src={image} alt="" className="chnage_profile_imge" />
                ) : (
                  <img
                    src={`${config.image_url}${userdata?.profile_image}`}
                    alt=""
                    className="chnage_profile_imge"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="update_profilediv">
          <button className="update_btn">update profile</button>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
