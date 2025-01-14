const router = require("express").Router();

const {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  updateTaskStatus,
} = require("../controllers/taskControllers");

router.post("/createTask", createTask);
router.put("/updateTask", updateTask);
router.put("/updateTaskStatus", updateTaskStatus);
router.delete("/deleteTask", deleteTask);
router.get("/getTask", getTask);

module.exports = router;
