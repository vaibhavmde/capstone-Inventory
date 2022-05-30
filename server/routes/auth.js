const router = require("express").Router();
const handleController = require("../controllers/auth");

router.post("/register", handleController.handleRegister);

router.post("/login", handleController.handleLogin);

router.post("/forgot", handleController.handleForget);

router.post("/reset", handleController.handleReset);

module.exports = router;
