const router = require("express").Router();
const userController = require("./controllers/userController");
const opinionController = require("./controllers/opinionController");
const authenticateToken = require("./middlewares/authMiddleware");

router.get("/me", authenticateToken, userController.getMe);
router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/opinions",  authenticateToken, opinionController.createOpinion);

router.get("/opinions", opinionController.getAllOpinions);

router.delete("/opinions/:id", authenticateToken, opinionController.deleteOpinion);

router.put("/opinions/:id",  authenticateToken, opinionController.updateOpinion);

module.exports = router;
