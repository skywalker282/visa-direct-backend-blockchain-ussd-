const mongoose = require("mongoose");
const User = require("../model/user");

exports.getUsers = (req, res, next) => {
  User.find()
    .populate("transaction")
    .then((result) => {
      res.json(result);
    });
};

exports.getOneUser = (req, res, next) => {
  User.findById(req.params.id).then((result) => {
    res.json({
      payload: result,
    });
  });
};

exports.postUser = (req, res, next) => {
  let { fullName, accountNumber } = req.body;
  let newUser = new User();

  newUser.fullName = fullName;
  newUser.accountNumber = parseInt(accountNumber);

  newUser.save((result) => {
    res.json({
      message: "User registered with success",
      payload: result,
    });
  });
};

exports.editUser = (req, res, next) => {
  User.findById(req.params.id).then((result) => {
    let { fullName, accountNumber } = req.body;

    result.fullName = fullName || result.fullName;
    result.accountNumber = accountNumber || result.accountNumber;
    result.save().then((result) => {
      res.json({
        message: "User successfuly",
        payload: result,
      });
    });
  });
};

exports.deleteUser = (req, res, next) => {
  User.findOneAndDelete(req.params.id).then((result) => {
    res.json({ message: "user deleted successfuly", payload: result });
  });
};
