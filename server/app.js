var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const authRouter = require("./routes/auth-route");
const imageRouter = require("./routes/image-upload-route");
const chatRouter = require("./routes/chat-route");
const socket = require("socket.io");

require("dotenv").config(); // WHY
const cors = require("cors");

var app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/upload", express.static("public/images"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/upload", upload.single("profile_image"), imageRouter);

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL)
  .then((response) => {
    console.log("Connected To Database");
  })
  .catch((error) => {
    console.log("Not connected");
  });

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

const io = socket(server, {
  cors: {
    origin: "*",
    transports: ["websocket", "polling", "flashsocket"],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("message", data.message);
    }
  });
});

module.exports = app;
