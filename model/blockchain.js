const mongoose = require("mongoose");
const Block = require("./block");
const Transaction = require("./transaction");

const Schema = mongoose.Schema;

const blockchainSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  chain: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  hardness: {
    type: Number,
    required: true,
  },
  pendingTransaction: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  miningReward: {
    type: Number,
    required: true,
  },
});

blockchainSchema.methods.createGenesisBlock = () => {
  let genesidBlock = new Block({
    processorKey: 1,
    timestamp: 340000,
    transactions: ["34ekiE234et4Jk8"],
    previousHash: "er34fFffddFgsAaaadg58",
    hash: "e346tlpfRpe1Dg5op",
  });
  genesidBlock.save().then((err) => {
    if (!err) {
      return this.name;
    }
  });
};

blockchainSchema.methods.minePendingTransaction = (miningRewardAdress) => {
  let block = new Block({
    processorKey: 1,
    timestamp: 340000,
    transactions: [this.pendingTransaction.map((trans) => trans.id)],
  });

  block.processMining(this.hardness);

  Transaction.find({ status: "pending" }).then((result) => {
    result.forEach((trans) => {
      Transaction.findOne({ id: trans.id }).then((result) => {
        result.status = "mined";
        result.save();
      });
    });
  });

  block.previousHash = this.chain[this.chain.length - 1].hash;

  this.chain.push(block.id);
  this.save();
  let rewardTransaction = new Transaction({
    date: Date().toString(),
    amount: this.miningReward,
    sender: "000000000000000",
    recipient: miningRewardAdress,
    status: "pending",
  });

  rewardTransaction.save();

  createTransaction(rewardTransaction);
};

blockchainSchema.methods.getLatestBlock = () => {
  return this.chain[this.chain.length - 1];
};

blockchainSchema.methods.createTransaction = (transaction) => {
  let pendingTransactions = [];
  pendingTransactions = Transaction.find({ status: "pending" }).then((result) =>
    result.map((trans) => trans.id)
  );
  if (pendingTransactions.length === 50) {
    this.minePendingTransaction("111111111111111");
  }
};

blockchainSchema.methods.getAccountBalance = (accountNumber) => {
  let balance = 0;

  for (const block of this.chain) {
    for (const trans of block.transactions) {
      let transaction = Transaction.findOne({ id: trans });
      if (transaction.sender === accountNumber) {
        balance -= parseFloat(trans.amount);
      }
      if (transaction.recipient === accountNumber) {
        balance += parseFloat(trans.amount);
      }
    }
  }
  return balance;
};

blockchainSchema.methods.testValidity = () => {
  for (let index = 1; index < this.chain.length; index++) {
    let currentBlock = Block.findOne({ id: index });
    let previousBlock = Block.findOne({ id: index - 1 });

    if (currentBlock.hash !== currentBlock.computeHash()) {
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }

    return true;
  }
};

const BlockChain = mongoose.model("BlockChain", blockchainSchema);

module.exports = Blockchain;
