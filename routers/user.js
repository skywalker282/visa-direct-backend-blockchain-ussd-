const express = require("express");
const cors = require('cors')
const userController = require("../controller/user");

const router = express.Router();

router.use(cors());

router.get("/user", userController.getUsers);
router.get("/user/login/:userName/:userCardNumber/:userPassword", userController.logUser)
router.get("/user/:id", userController.getOneUser);
router.post("/user", userController.postUser);
router.put("/user/:id", userController.editUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
