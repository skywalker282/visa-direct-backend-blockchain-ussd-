const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.post("/user", userController.postUser);
router.put("/user/:id", userController.editUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
