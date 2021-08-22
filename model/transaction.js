const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactioSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactioSchema);

module.exports = Transaction;
