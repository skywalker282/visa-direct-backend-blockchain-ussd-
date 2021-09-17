const express = require("express");
const cors = require('cors');

const transactionController = require("../controller/transaction");

const router = express.Router();

router.use(cors());

router.get("/transaction", transactionController.getTransaction);
router.get("/transaction/:id", transactionController.getOneTransaction);
router.post("/transaction", transactionController.postTransaction);
router.put("/transaction/:id", transactionController.editTransaction);
router.delete("/transaction/:id", transactionController.deleteTransaction);

module.exports = router;
