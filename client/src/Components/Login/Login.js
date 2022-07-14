import React, { useState } from "react";
import "../Login/login.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: loginState.email,
      password: loginState.password,
    };
    if (data.email === "" || data.password === "") {
      Swal.fire("Field cannot be empty");
    } else {
      const result = await axios.post("http://localhost:4000/api/auth/login", {
        password: data.password,
        email: data.email,
      });
      if (result.data.status === true) {
        localStorage.setItem("token", result.data.token);
        Swal.fire("Login Successfully");
        navigate("/");
      } else {
        Swal.fire("Auth Failed");
      }
    }
  };

  return (
    <>
      <div className="login_main">
        <div className="login_heading">
          <p>LOGIN</p>
        </div>
        <div className="login_form">
          <div className="form_input">
            <label for="email" className="login_label">
              <b>Email</b>
            </label>
            <input
              className="login_input"
              type="email"
              name="email"
              value={loginState.email}
              onChange={(e) => handlechange(e)}
              placeholder="Enter Email..."
              required
            />

            <label for="psw" className="login_label">
              <b>Password</b>
            </label>
            <input
              className="login_input"
              type="password"
              name="password"
              value={loginState.password}
              onChange={(e) => handlechange(e)}
              placeholder="Enter Password..."
              required
            />

            <button className="login_btn" onClick={handleLogin}>
              LOGIN
            </button>
          </div>
        </div>
        <div className="already_account">
          <Link to="/signup">
            <p>Dont Have an Account?</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
