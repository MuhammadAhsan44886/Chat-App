import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import "../Chat-home/chatapp.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
const api = require("../../config.json");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EmailModal({ open, handleClose }) {
  const [email, setEmail] = useState("");

  const handleEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      axios
        .post(`${api.api_url}auth/submitemail`, {
          email: email,
        })
        .then((res) => {
          if (res) {
            Swal.fire({
              customClass: {
                container: "my-swal",
              },
              icon: "success",
              title: "Email Sent",
              showConfirmButton: false,
              timer: 1500,
            });
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        icon: "error",
        title: "Invalid Email",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="email_wrapper">
              <TextField
                id="outlined-basic"
                label="Enter your email address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="sendButton" onClick={handleEmail}>
                Send
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
