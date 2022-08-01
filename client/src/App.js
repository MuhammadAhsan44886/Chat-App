import React from "react";
import "./App.css";
import Signup from "./Components/Signup-page/Signup";
import Login from "./Components/Login/Login";
import Chatapp from "./Components/Chat-home/Chatapp";
import Welcome from "./Components/welcome/Welcome";
import Message from "./Components/chat-message/Message";
import Messagetype from "./Components/Typemesssage/Messagetype";
import Logout from "./Components/Logout/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editprofile from "./Components/Editprofile/Editprofile";
import Chatperson from "./Components/Chatperson/Chatperson";
import Paypal from "./Components/Paypal/Paypal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatapp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/message" element={<Message />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/edit-profile" element={<Editprofile />} />
          <Route path="/chat-conversation" element={<Chatperson />} />
          <Route
            path="/type-message/:chatid/:chatname/:chatpic"
            element={<Messagetype />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/paypal" element={<Paypal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
