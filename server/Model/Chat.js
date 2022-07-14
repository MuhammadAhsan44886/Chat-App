const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    Users: [
      {
        type: String,
        required: true,
      },
    ],
    messagee: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatModel", chatSchema);
