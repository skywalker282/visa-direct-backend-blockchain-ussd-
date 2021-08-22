const express = require("express");
const USSDController = require("../controller/ussd");

const router = express.Router();

router.post("/", USSDController.postMenu);

module.exports = router;
