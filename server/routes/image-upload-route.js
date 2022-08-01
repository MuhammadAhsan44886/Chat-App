var express = require("express");
var router = express.Router();
var User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.patch("/image/:id", async (req, res) => {
  console.log(req.params)
  try {
    console.log(req.file)
    const getUser = await User.findById({ _id: req.params.id });
    getUser.profile_image = req.file.filename;
    await getUser.save();
    res.status(200).json({ status: true, getUser });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.patch("/editprofile/:getid", async (req, res) => {
  try {
    const { getid } = req.params;
    const getUser = await User.find({ _id: getid });
    const hashSalt = 10;
    const encryptpassword = bcrypt.hashSync(req.body.password, hashSalt);
    getUser[0].password = encryptpassword;
    getUser[0].email = req.body.email;
    getUser[0].fullName = req.body.fullName;
    getUser[0].profile_image =
      req.body.profile_image !== undefined
        ? req.body.profile_image
        : req.file.filename;
    await getUser[0].save();

    const token = jwt.sign({ user_info: getUser }, "secretsecret");
    res.status(200).send({
      message: "User Updated Successfully",
      status: true,
      token: token,
    });
  } catch (error) {
    res.status(200).send({ message: "Something went wrong", status: false });
  }
});

module.exports = router;
