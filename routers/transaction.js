const express = require("express");

const transactionController = require("../controller/transaction");

const router = express.Router();

router.get("/transaction", transactionController.getTransaction);
router.get("/transaction/:id", transactionController.getOneTransaction);
router.post("/transaction", transactionController.postTransaction);
router.put("/transaction/:id", transactionController.editTransaction);
router.delete("/transaction/:id", transactionController.deleteTransaction);

module.exports = router;
