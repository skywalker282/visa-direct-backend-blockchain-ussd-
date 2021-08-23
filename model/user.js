const mongoose = require("mongoose");
const blockchain = require("./blockchain");
const transaction = require("./transaction");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  transaction: {
    type: [Schema.Types.ObjectId],
    ref: "Transaction",
    required: false,
  },
});

userSchema.methods.sendTransaction = (amount, recipient) => {
  let newTransaction = new Transaction({
    date: Date().toString(),
    amount: amount,
    sender: this._id,
    recipient: recipient,
    status: "pending",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
