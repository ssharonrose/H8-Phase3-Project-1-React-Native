const express = require("express");
const router = express.Router();

const {
    getAllUser,
    getUserById,
    createUser,
    deleteUser
} = require("../controllers/userController");

// default /users
router.get("/", getAllUser);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

module.exports = router;