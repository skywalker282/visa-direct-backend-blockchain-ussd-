const mongoose = require("mongoose");
const sha256 = require("crypto-js/sha256");

const Schema = mongoose.Schema;

const blockSchema = new Schema({
  processorKey: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  transactions: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  previousHash: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
});

blockSchema.methods.computeHash = () => {
  return sha256(
    this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.processorKey
  ).toString();
};

blockSchema.methods.processMining = (hardness) => {
  while (this.hash.substring(0, hardness) !== Array(hardness + 1).join("0")) {
    this.processorKey++;
    this.hash = this.computeHash();
  }
};

const Block = mongoose.model("Block", blockSchema);

module.exports = Block;
