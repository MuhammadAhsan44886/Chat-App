const express = require("express");
const router = express.Router();
const chat = require("../Model/Chat");
const User = require("../Model/User");
router.post("/postchat", async (req, res) => {
  const { from, to, message, toUserInfo, fromUserInfo } = req.body;
  try {
    const messages = await chat.find();
    for (let i = 0; i <= messages.length - 1; i++) {
      if (
        (await messages[i].Users.indexOf(to)) !== -1 &&
        (await messages[i].Users.indexOf(from)) !== -1
      ) {
        if (messages[i]) {
          await messages[i].messagee.push({ message, from });

          await messages[i].save();
          return res.status(200).send({ message: "Chat Saved Successfully" });
        }
      }
    }
    const newChat = new chat({
      Users: [from, to],
      messagee: { message, from },
      toUser: toUserInfo,
      fromUser: fromUserInfo,
    });
    await newChat.save();
    return res.status(200).send({ message: "New Chat Saved Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
});

router.get("/getChat/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  try {
    const messages = await chat.find();
    for (let i = 0; i <= messages.length - 1; i++) {
      if (
        (await messages[i].Users.indexOf(to)) !== -1 &&
        (await messages[i].Users.indexOf(from)) !== -1
      ) {
        if (messages[i]) {
          return res.status(200).send({
            message: messages[i].messagee,
            createdAt: messages[i].createdAt,
          });
        }
      }
    }
    return res.status(200).send([{ message: "Start New Chat" }]);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
});

router.get("/getFromImage/:from", async (req, res) => {
  console.log("GOOD")
  try {
    const { from } = req.params;
    const getUser = await User.findById({ _id: from });
    res.status(200).send({
      message: "Profile Image Found",
      status: true,
      image: getUser.profile_image,
    });
  } catch (error) {
    console.log(error)
  }
});

router.get("/previousconversations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getChat = await chat.find();
    var result = getChat.filter((e) => {
      if (e.Users.includes(id)) {
        return e;
      }
    });
    if (result.length > 0) {
      return res
        .status(200)
        .send({ message: "Chats", status: true, conversations: result });
    } else {
      return res.status(200).send({ message: "No Chats Found", status: false });
    }
  } catch (error) {
    return res.status(200).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
