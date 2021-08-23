const mongoose = require("mongoose");
const Blockchain = require("../model/blockchain");
const Transaction = require("../model/transaction");

const VisaCoin = async () => {
  return await Blockchain.findOne({ name: "VisaCoin" }).then((result) => {
    if (result) {
      return result;
    } else {
      let newBlockchain = new Blockchain({
        name: "VisaCoin",
        chain: [Blockchain.createGenesis()],
        processorKey: 1,
        hardness: 2,
        pendingTransaction: Transaction.find({ status: "pending" }).then(
          (result) => {
            return result.map((trans) => trans.id);
          }
        ),
        miningReward: 5000,
      });

      newBlockchain.save().then((err) => {
        if (!err) {
          return await Blockchain.findOne(
            { name: "VisaCoin" }.then((result) => {
              return result;
            })
          );
        }
      });
    }
  });
};

module.exports = VisaCoin;
