const mongoose = require("mongoose");
const VisaCoin = require("../utils/initBlockchain");
const Transaction = require("../model/transaction");

exports.getTransaction = (req, res, next) => {
    Transaction.find()
        .populate("sender")
        .then((result) => {
            res.json(result);
        });
};

exports.getOneTransaction = (req, res, next) => {
    Transaction.findById(req.params.id).then((result) => {
        res.json({
            payload: result,
        });
    });
};

exports.postTransaction = (req, res, next) => {
    let { amount, sender, recipient } = req.body;
    let newTransaction = new Transaction();
    newTransaction.date = Date().toString();
    newTransaction.amount = parseInt(amount);
    newTransaction.sender = sender;
    newTransaction.recipient = recipient;

    VisaCoin(blockchain => {
        newTransaction.save().then(trans => {
            if (trans.id) {
                blockchain.pendingTransaction.push(trans.id)
                blockchain.save().then(blockchain => {
                    if (blockchain) {
                        res.json({
                            message: "Transaction sent with success",
                            payload: newTransaction
                        })
                    } else {
                        res.json({
                            message: "An error has occured when sending the transaction"
                        })
                    }
                })
            } else {
                res.json({
                    message: "An error occured, please retry aigain later"
                })
            }
        })
    });
};

exports.editTransaction = (req, res, next) => {
    Transaction.findById(req.params.id)
        .then((result) => {
            let { date, amount, sender, recipient } = req.body;
            result.date = date || result.date;
            result.amount = amount || result.amount;
            result.sender = sender || result.sender;
            result.recipient = recipient || result.recipient;

            return result.save();
        })
        .then((result) => {
            res.json({ message: "transaction modified by sucess", payload: result });
        });
};

exports.deleteTransaction = (req, res, next) => {
    Transaction.findByIdAndDelete(req.params.id).then((result) => {
        res.json({
            message: "Transaction deleted with success",
            payload: result,
        });
    });
};