var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const axios = require("axios");
const qs = require("qs");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user) {
      res.status(200).json({
        messege: "User not Found Email does not exist",
        status: false,
      });
    } else {
      if (
        (user[0].payerId === "FALSE" || user[0].paymentMethod === "FALSE") &&
        (user[0].payerId !== "FALSE" || user[0].paymentMethod === "FALSE")
      ) {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(200).json({
              messege: "failed for login",
              status: false,
            });
          }
          if (result) {
            const token = jwt.sign({ user_info: user }, "secretsecret");
            return res.status(200).json({
              messege: "Your are successfully login",
              status: true,
              token: token,
            });
          }
          res.status(200).json({
            messege: "auth faild",
            status: false,
          });
        });
      } else if (
        user[0].paymentMethod === "TRUE" ||
        user[0].payerId === "FALSE"
      ) {
        const date = user[0].date;
        const result = new Date(date);
        var Difference_In_Time = new Date().getTime() - result.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days.toFixed(0) < 14) {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(200).json({
                messege: "failed for login",
                status: false,
              });
            }
            if (result) {
              const token = jwt.sign({ user_info: user }, "secretsecret");
              return res.status(200).json({
                messege: "Your are successfully login",
                status: true,
                token: token,
              });
            }
            res.status(200).json({
              messege: "auth faild",
              status: false,
            });
          });
        } else {
          res
            .status(200)
            .send({ message: "You Cannt Login.Pay First", status: false });
        }
      }
    }
  } catch (error) {
    res.status(200).json({ message: "Something went wrong", error: error });
  }
});

router.post("/updatepaymentdetails", async (req, res, next) => {
  try {
    const finduser = await User.find({ email: req.body.fields.email });
    if (finduser.length <= 0) {
      res.status(200).send({ messasge: "No User Found", status: false });
    } else {
      finduser[0].paymentMethod = "TRUE";
      finduser[0].date = new Date();
      await finduser[0].save();
      res.status(200).send({
        messasge: "Success",
        status: true,
        date: finduser[0].date,
      });
    }
  } catch (error) {
    res.status(200).send({ message: "Something went wrong" });
  }
});

router.post("/addpaypalpayment", async (req, res, next) => {
  try {
    var username =
      "AcnK9PqPq5N-netusmItGorX_LQ1aLczMGvqXXqnnUvkBxi26eq2c9Bnb0Q_uVEQB4B5Wc0ma77KbZdi";
    var password =
      "EJs2yLGX592N9oHJWAWfkYke0rLjjp5GkXDkw9agJwb3MvyQyk3mHYBPvUQTP5KFSgOWvcSHhAX83Asa";
    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString("base64");
    const session_url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

    var config = {
      method: "post",
      url: session_url,
      headers: { Authorization: "Basic " + encodedToken },
      data: qs.stringify({
        grant_type: "client_credentials",
      }),
    };

    const getAccess_Token = await axios(config);
    const accessToken = getAccess_Token.data.access_token;
    const subscription_details = await axios.get(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${req.body.data.subscriptionID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const findUser = await User.find({
      email: subscription_details.data.subscriber.email_address,
    });
    if (findUser.length <= 0) {
      res.status(200).send({ message: "No User Found", status: false });
    } else {
      findUser[0].payerId = subscription_details.data.subscriber.payer_id;
      findUser[0].paymentMethod = "TRUE";
      await findUser[0].save();
      res
        .status(200)
        .send({ message: "Payment Done Successfully", status: true });
    }
  } catch (error) {
    res.status(200).send({ message: "Something went wrong", status: false });
  }
});

router.post("/register", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  const getName = await User.find({ fullName: req.body.fullName });
  if (user.length >= 1 || getName.length >= 1) {
    return res.status(422).json({
      messege: "Email or Name Already Exists",
    });
  } else {
    bcrypt.hash(req.body.password, 12, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const register = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          fullName: req.body.fullName,
        });
        register
          .save()
          .then((result) => {
            res.status(201).json({
              messege: "User Created",
              result,
            });
          })
          .catch((err) => {
            res.status(404).send({ message: "Something went wrong", err });
          });
      }
    });
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    const getUser = await User.findById({ _id: req.params.id });
    res.status(200).send(getUser);
  } catch (error) {}
});

router.get("/getAllUsers/:id", async (req, res) => {
  try {
    const AllUsers = await User.find({ _id: { $ne: req.params.id } });
    res.status(200).send(AllUsers);
  } catch (error) {}
});

module.exports = router;
