const mongoose = require("mongoose");
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
  let { date, amount, sender, recipient } = req.body;
  let newTransaction = new Transaction();
  newTransaction.date = date;
  newTransaction.amount = parseInt(amount);
  newTransaction.sender = sender;
  newTransaction.recipient = recipient;

  newTransaction.save((result) => {
    res.json({
      message: "Transaction transferred with success",
      payload: result,
    });
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
