const { registerPost, registerGet } = require("../controllers/userController");
const User = require("../models/userModel");
const router = require("express").Router();

router.post("/register", registerPost);
router.get("/register", registerGet);

module.exports = router;
