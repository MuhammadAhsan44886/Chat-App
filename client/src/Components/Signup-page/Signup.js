import React, { useState } from "react";
import "../Signup-page/signup.css";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Signup = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const handlechnage = (e) => {
    setSignState({
      ...signState,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      let item = {
        email: signState.email,
        password: signState.password,
        fullName: signState.fullName,
      };
      if (item.email === "" || item.password === "" || item.fullName === "") {
        Swal.fire("Fill Every Field");
      } else {
        let result = await fetch("http://localhost:4000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        Swal.fire(result.messege);
        navigate('/paypal')
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <div className="signup_main">
        <div className="signup_heading">
          <p>Signup</p>
        </div>
        <div className="signup_form">
          <div className="form_input">
            <label for="email" className="sign_label">
              <b>Email</b>
            </label>
            <input
              className="sign_input"
              type="email"
              name="email"
              value={signState.email}
              onChange={(e) => handlechnage(e)}
              placeholder="Enter Email..."
              required
            />

            <label for="password" className="sign_label">
              <b>Password</b>
            </label>
            <input
              className="sign_input"
              type="password"
              name="password"
              value={signState.password}
              onChange={(e) => handlechnage(e)}
              placeholder="Enter Password..."
              required
            />

            <label for="full-name" className="sign_label">
              <b>Full Name</b>
            </label>
            <input
              className="sign_input"
              type="text"
              name="fullName"
              value={signState.fullName}
              onChange={(e) => handlechnage(e)}
              placeholder="enter full name..."
              required
            />

            <button className="signup_btn" onClick={handleClick}>
              SIGNUP
            </button>
          </div>
        </div>
        <div className="already_account">
          <Link to="/login">
            {" "}
            <p>already have an account?</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
