import React, { useState, useEffect } from "react";
import "../welcome/welccome.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageName(e.target.files[0].name);
    }
  };

  const imageUpload = async (e) => {
    e.preventDefault();
    const id = jwt_decode(localStorage.getItem('token')).user_info[0]._id;
    const formdata = new FormData();
    formdata.append("profile_image", file);
    const response = await axios.patch(`http://localhost:4000/api/upload/image/${id}`, formdata)
    localStorage.setItem("currentUserImage",response?.data?.getUser?.profile_image);
  };

  
  useEffect(() => {
    const gettoken = localStorage.getItem("token");
     if(!gettoken){
      navigate('/login')
     }
  }, []);
  return (
    <>
      <div className="welocme_main">
        <div className="welcome_heading">
          <p>welcome to chat app!</p>
        </div>

        <div className="picture_upload">
          <div className="add">
            <label for="html" className="add">
              add profile image
            </label>
          </div>
          <label htmlFor="contained-button-file" className="main_width">
            <input
              className="profile_imagebtn"
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
              className="image_button selectanimagebutton"
            >
              {image ? (
                <img src={image} alt="" className="profile_imge" />
              ) : (
                <p>Choose A Photo</p>
              )}
            </Button>
          </label>
        </div>
        <div className="mesage_continue">
          <button
            className="mesage_continuebtn"
            onClick={(e) => imageUpload(e)}
          >
            {" "}
            continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
