var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(200).json({
          messege: "User not Found Email does not exist",
          status: false,
        });
      }

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
    })
    .catch((error) => {
      res.status(200).json({
        messege: "failed",
        status: false,
      });
    });
});

router.post("/register", async (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(422).json({
          messege: "Email Already Exists",
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
