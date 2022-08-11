import React, { useState } from "react";
import "../welcome/welccome.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const config = require("../../config.json");

const Welcome = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire("Select Image First");
    } else {
      const id = jwt_decode(localStorage.getItem("token")).user_info[0]._id;
      const formdata = new FormData();
      formdata.append("profile_image", file);
      const response = await axios.patch(
        `${config.api_url}upload/image/${id}`,
        formdata
      );
      if (response?.data?.status === true) {
        Swal.fire("Image Uploaded Successfully");
        navigate("/chat-conversation");
      }
    }
  };

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken === null) {
      navigate("/login");
    } else {
      const from = jwt_decode(localStorage.getItem("token")).user_info[0]._id;
      axios
        .get(`${config.api_url}chat/getFromImage/${from}`)
        .then((response) => {
          if (response.data.image !== "") {
            navigate("/chat-conversation");
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <div className="welocme_main">
        <div className="welcome_heading">
          <p>Welcome to Property Chef!</p>
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
