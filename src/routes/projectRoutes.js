const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const verifyAuth = require("../middleware/authMiddleware");

router.post("/", verifyAuth, projectController.createProject); 
router.get("/", verifyAuth, projectController.getAllProjects);  
router.get("/:id", verifyAuth, projectController.getProjectById);  
router.put("/:id", verifyAuth, projectController.updateProject);  
router.delete("/:id", verifyAuth, projectController.deleteProject); 

module.exports = router;

