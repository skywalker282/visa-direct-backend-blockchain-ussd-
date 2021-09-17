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

exports.logUser = (req, res, next) => {
  User.findOne({ "userName": req.params.userName, "cardNumber": req.params.userCardNumber, "password": req.params.userPassword},((err, result) => {
    if(result) {
        res.json({
          message: "User found in the database",
          payload: result,
          status: 100
        })
      } else {
        res.json({
          message: 'User not found',
          status: 900
        })
      }
    }))
}

exports.postUser = (req, res, next) => {
  console.log(req.body)
  let { userName, cardNumber, password } = req.body;
  let newUser = new User();

  newUser.userName = userName;
  newUser.cardNumber = cardNumber;
  newUser.password = password;

  newUser.save((result) => {
    res.json({
      message: "User registered with success",
      payload: result,
    });
  });
};

exports.editUser = (req, res, next) => {
  User.findById(req.params.id).then((result) => {
    let { userName, cardNumber, password } = req.body;

    result.full = userName || result.userName;
    result.cardNumber = cardNumber || result.cardNumber;
    result.password = password || result.password
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
