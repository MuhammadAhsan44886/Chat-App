import React, { useState } from "react";
import "./Paypal.css";
import { PayPalButton } from "react-paypal-button-v2";
import useScript from "./UseScript";

const Paypal = () => {
  const [showPaypal, setShowPaypal] = useState(false);
  useScript(
    "https://www.paypal.com/sdk/js?client-id=AQVg6IrL206mqyDZ1VzK4vVJLmQau-BUvKZfLFfd60zyaLh2I5AB1gLT-DLcKLVuFcSvfh0cOHPqnTUU&vault=true&intent=subscription"
  );

  const handleApprove = async (data, actions) => {
    console.log(data, actions);
  };
  return (
    <div className="paypal_main">
      <button
        onClick={() => setShowPaypal(!showPaypal)}
        className="freetrial-button"
      >
        15 Days Trial
      </button>
      {showPaypal && (
        <PayPalButton
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: "P-23098989S5324315PMKXXORQ",
            });
          }}
          onApprove={(data, actions) => {
            handleApprove(data, actions);
          }}
          onError={(error) => {
            console.log(error);
          }}
          options={{
            clientId:
              "https://www.paypal.com/sdk/js?client-id=AQVg6IrL206mqyDZ1VzK4vVJLmQau-BUvKZfLFfd60zyaLh2I5AB1gLT-DLcKLVuFcSvfh0cOHPqnTUU&currency=USD",
          }}
        />
      )}
    </div>
  );
};

export default Paypal;
