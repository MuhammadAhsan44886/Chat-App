import React, { useState } from "react";
import "../Signup-page/signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const config = require("../../config.json");

const Signup = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [option, setOption] = useState("");

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
        option: option,
      };
      console.log(item);

      const regex_pattern =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (
        item.email === "" ||
        item.password === "" ||
        item.fullName === "" ||
        item.option === ""
      ) {
        Swal.fire("Fill Every Field");
      } else if (!regex_pattern.test(item.email)) {
        Swal.fire("Invalid Email");
      } else {
        let result = await fetch(`${config.api_url}auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        if (result.messege === "User Created") {
          Swal.fire(result.messege);
          navigate("/paypal");
        }
        Swal.fire(result.messege);
      }
    } catch (error) {
      Swal.fire("error");
    }
  };

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken !== null) {
      navigate("/welcome");
    }
  }, []);

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

            <select
              value={option}
              className="sign_input"
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="none" selected>
                Which option fits you:
              </option>
              <option value="Investor">Investor</option>
              <option value="Agent">Agent</option>
              <option value="Attorney">Attorney</option>
              <option value="Lender">Lender</option>
              <option value="Other">Other</option>
            </select>

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
