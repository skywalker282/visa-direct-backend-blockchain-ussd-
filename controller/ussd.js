const mongoose = require("mongoose");
const User = require("../model/user");
const Transaction = require("../model/transaction");

exports.postMenu = (req, res, next) => {
  const { phoneNumber, text, sessionId } = req.body;

  let response;

  if (text == "") {
    response = "CON Enter your full name";
    res.send(response);
    res.end();
  } else if (text !== "") {
    let responseArray = text.split("*");
    if (responseArray.length === 1) {
      response = "CON Enter your visa account number";
      res.send(response);
      res.end;
    }
    if (responseArray.length > 1) {
      if (responseArray[1] > 0 && responseArray.length === 2) {
        response = "CON Please confirm to register \n1. Confirm \n2. Cancel";
        res.send(response);
        res.end();
      }
      if (responseArray.length === 3) {
        if (parseInt(responseArray[2]) === 1) {
          let register = new User();
          register.fullName = responseArray[0];
          register.accountNumber = responseArray[1];
          register.save(() => {
            response = `END Account created\nName: ${responseArray[0]} \nAccount Number: ${responseArray[1]}`;
            res.send(response);
            res.end();
          });
        } else if (parseInt(responseArray[2]) === 2) {
          response =
            "END Data was not saved \nWe wish to come back when you are ready !";
          res.send(response);
          res.end();
        }
      }
    }
  } else {
    response = "END There is something that went wrong, please retry";
    res.send(response);
    res.end();
  }
};
