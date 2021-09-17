const express = require("express");
const USSDController = require("../controller/ussd");
const cors = require('cors');

const router = express.Router();

router.use(cors());

router.post("/", USSDController.postMenu);

module.exports = router;
