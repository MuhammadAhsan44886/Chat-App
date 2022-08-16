import React, { useState } from "react";
import "./Paypal.css";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
const config = require("../../config.json");

const Paypal = () => {
  const navigate = useNavigate();
  const [showpayment, setShowPayment] = useState(false);
  const [showpaypal, setShowPaypal] = useState(false);
  const [fields, setFields] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    address: "",
  });

  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFields({ ...fields, [key]: value });
  };

  const handlePaymentForm = async () => {
    const response = await axios.post(
      `${config.api_url}auth/updatepaymentdetails`,
      { fields: fields }
    );
    if (response.data.status === true) {
      Swal.fire(
        `You have only 14 days to pay. Your time starts from ${response.data.date}`
      );
      navigate("/login");
    } else {
      Swal.fire("Your Given Email is not Correct");
    }
  };

  const handleClosePayment = () => setShowPayment(false);
  const handleClosePaypal = () => setShowPaypal(false);
  const handleShowPaypal = () => setShowPaypal(true);
  const handleShowPayment = () => setShowPayment(true);

  const handleApprove = async (data, details) => {
    const response = await axios.post(
      `${config.api_url}auth/addpaypalpayment`,
      { data: data }
    );
    if (response.data.status === false) {
      Swal.fire("No User Found of this email");
    } else {
      Swal.fire("Payment Has Been Successfully Added");
      navigate("/welcome");
    }
  };
  return (
    <>
      <div className="mainbutton-container">
        <div className="subbutton-container">
          <Button
            className="buttonone"
            variant="primary"
            onClick={(e) => navigate("/welcome")}
          >
            Use App Without Payment
          </Button>
          <Button
            className="buttontwo"
            variant="primary"
            onClick={handleShowPayment}
          >
            Enter Payment Details (Valid for 14 Days Only)
          </Button>
          <Button
            className="buttonthree"
            variant="primary"
            onClick={handleShowPaypal}
          >
            Pay Through Paypal
          </Button>
        </div>
      </div>

      <Modal
        show={showpayment}
        onHide={handleClosePayment}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="paymentform-container">
          <input
            type="text"
            placeholder="Full Name"
            value={fields.fullname}
            name="fullname"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={fields.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            value={fields.address}
            name="address"
            onChange={handleChange}
          />
          <input
            type="Number"
            placeholder="Phone_Number"
            value={fields.phonenumber}
            name="phonenumber"
            onChange={handleChange}
          />
          <Button variant="secondary" onClick={handlePaymentForm}>
            SAVE
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePayment}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showpaypal}
        onHide={handleClosePaypal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pay Through Paypal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PayPalButton
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: "P-3VD25754AR0839324MLIE46Y",
              });
            }}
            onApprove={(data, details) => {
              handleApprove(data, details);
            }}
            options={{
              clientId:
                "AcnK9PqPq5N-netusmItGorX_LQ1aLczMGvqXXqnnUvkBxi26eq2c9Bnb0Q_uVEQB4B5Wc0ma77KbZdi&vault=true&intent=subscription",
            }}
            style={{
              shape: "rect",
              color: "gold",
              layout: "horizontal",
              label: "subscribe",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePaypal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Paypal;
