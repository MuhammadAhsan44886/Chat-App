var express = require("express");
var router = express.Router();
var User = require("../Model/User");

router.patch("/image/:id", async (req, res) => {
  try {
    const getUser = await User.findById({ _id: req.params.id });
    getUser.profile_image = req.file.filename;
    await getUser.save();
    res.status(200).json({ status: true, getUser });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
