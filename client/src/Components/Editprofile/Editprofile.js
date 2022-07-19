import React, { useState, useEffect } from "react";
import "../Editprofile/editprofile.css";
import { Button } from "@material-ui/core";
import { IoArrowBackOutline } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const config = require("../../config.json");

const Editprofile = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState("");
  const [getid, setgetid] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [fullName, setfullName] = useState("");

  const handleImage = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!file && !userdata) {
      Swal.fire("Select Image First");
    } else if (email === "" || password === "" || fullName === "") {
      Swal.fire("Fields Cannt be empty");
    } else {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("fullName", fullName);
      formdata.append("profile_image", file ? file : userdata);
      const response = await axios.patch(
        `${config.api_url}upload/editprofile/${getid}`,
        formdata
      );
      if (response.data.status === true) {
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
        Swal.fire("User Update Successfully");
        navigate('/chat-conversation')
      }
    }
  };

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken === null) {
      navigate("/login");
    } else {
      const id = jwt_decode(localStorage.getItem("token")).user_info[0]._id;
      axios
        .get(`${config.api_url}auth/getUser/${id}`)
        .then((data) => {
          setgetid(data.data._id);
          setemail(data.data.email);
          setfullName(data.data.fullName);
          setUserData(data.data.profile_image);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <div className="edit_profile">
        <div className="edit_profile_head">
          <div className="edit_profile_arrow">
            <IoArrowBackOutline className="EDIT_PROFILE_ICON" onClick={() => navigate('/chat-conversation')}/>
          </div>
          <div className="edit_profile_heading">
            <p>Edit profile</p>
          </div>
        </div>
        <div className="editprofile_input">
          <div className="input_editable">
            <label for="fname" className="editable_lable">
              Email
            </label>
            <input
              type="text"
              className="editable_input"
              id="Email"
              name="Email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label for="lname" className="editable_lable">
              Password
            </label>
            <input
              type="password"
              className="editable_input"
              id="Password"
              name="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <label for="lname" className="editable_lable">
              Full name:
            </label>
            <input
              type="text"
              className="editable_input"
              id="FullName"
              name="FullName"
              placeholder="Enter FullName"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="profile_picture_chnage">
            <div className="changeimage_headig">Profile Picture</div>
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
                    onChange={handleImage}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className="chnageprofile_image_button selectanimagebutton"
                  >
                    <span className="change">Change Photo</span>
                  </Button>
                </label>
                {image ? (
                  <img src={image} alt="" className="chnage_profile_imge" />
                ) : (
                  <img
                    src={`${config.image_url}${userdata}`}
                    alt=""
                    className="chnage_profile_imge"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="update_profilediv">
          <button className="update_btn" onClick={handleUpdate}>
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
