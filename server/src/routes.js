const router = require("express").Router();
const userController = require("./controllers/userController");
const authenticateToken = require('./middlewares/authMiddleware');


router.get("/me",authenticateToken,userController.getMe)
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
