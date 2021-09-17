const mongoose = require("mongoose");
const blockchain = require("./blockchain");
const transaction = require("./transaction");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cardNumber: {
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
        sender: this.id,
        recipient: recipient,
        status: "pending",
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;