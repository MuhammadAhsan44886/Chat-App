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
    toUser: {
      type: Object,
    },
    fromUser: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatModel", chatSchema);
