const Block = require("./block");
const Transaction = require("./transaction");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.hardness = 2;
    this.pendingTransactions = [];
    this.miningReward = 120;
  }

  createGenesisBlock() {
    return new Block(
      "01/01/2017",
      [new Transaction(null, "300049", 1000000000)],
      "0"
    );
  }

  minePendingTransactions(miningRewardAdress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.processMining(this.hardness);

    this.chain.push(block);
    this.chain[this.chain.length - 1].previousHash =
      this.chain[this.chain.length - 2].hash;

    this.pendingTransactions = [
      new Transaction(null, miningRewardAdress, this.miningReward),
    ];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  //   createBlock(newBlock) {
  //     newBlock.previousHash = this.getLatestBlock().hash;
  //     // newBlock.hash = newBlock.computeHash();
  //     newBlock.processMining(this.hardness);
  //     this.chain.push(newBlock);
  //   }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getAdressBalance(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= parseFloat(trans.amount);
        }

        if (trans.toAddress === address) {
          balance += parseFloat(trans.amount);
        }
      }
    }
    return balance;
  }

  testValidity() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

module.exports = Blockchain;
