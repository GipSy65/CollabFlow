const express = require("express");
const router = express.Router();
const { assignTask } = require("../controllers/taskContoller");
const taskController = require("../controllers/taskContoller")

router.put("/:taskId/assign/:userId", assignTask); 


router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;