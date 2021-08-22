const sha256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.processorKey = 0;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.computeHash();
  }

  computeHash() {
    return sha256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.processorKey
    ).toString();
  }

  processMining(hardness) {
    while (this.hash.substring(0, hardness) !== Array(hardness + 1).join("0")) {
      this.processorKey++;
      this.hash = this.computeHash();
    }
    console.log(this.hash);
  }
}

module.exports = Block;
