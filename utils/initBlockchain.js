const mongoose = require("mongoose");
const Blockchain = require("../model/blockchain");
const Transaction = require("../model/transaction");

const VisaCoin = async(cb) => {
    await Blockchain.findOne({ name: "VisaCoin" }).then(async(result) => {
        if (result) {
            cb(result);
        } else {
            let newBlockchain = new Blockchain({
                name: "VisaCoin",
                chain: [],
                processorKey: 1,
                hardness: 2,
                miningReward: 5000,
            });
            Transaction.find({ status: "pending" }).then(
                (result) => {
                    if (!result) {
                        return null
                    }
                    newBlockchain.pendingTransaction = result.map((trans) => trans.id);
                }
            )
            await newBlockchain.createGenesisBlock(blockID => {
                newBlockchain.chain.push(blockID);
                newBlockchain.save().then((visacoin) => {
                    if (visacoin) {
                        Blockchain.findOne({ name: "VisaCoin" }).then((result) => {
                            cb(result);
                        });
                    }
                });
            });
        }
    });
};

module.exports = VisaCoin;