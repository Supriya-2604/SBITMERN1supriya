const express = require("express");
const { register, login, testToken } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/test', testToken);

module.exports = router;


