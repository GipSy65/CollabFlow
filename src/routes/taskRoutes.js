const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/authMiddleware");
const { assignTask } = require("../controllers/taskContoller");
const taskController = require("../controllers/taskContoller")

router.put("/:taskId/assign/:userId", assignTask); 


router.post("/", verifyAuth,taskController.createTask);
router.get("/", verifyAuth, taskController.getTasks);
router.get("/:id", verifyAuth, taskController.getTaskById);
router.put("/:id", verifyAuth, taskController.updateTask);
router.delete("/:id", verifyAuth, taskController.deleteTask);

module.exports = router;