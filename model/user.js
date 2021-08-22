const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  transaction: {
    type: [Schema.Types.ObjectId],
    ref: "Transaction",
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
