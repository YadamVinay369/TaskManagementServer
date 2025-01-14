const task = require("../models/taskSchema.js");

const createTask = async (req, res) => {
  try {
    if (!req.body.description || req.body.description.length == 0) {
      return res
        .status(400)
        .json({ message: "Description for the task is missing!" });
    }
    const newtask = new task(req.body);
    await newtask.save();
    return res.status(200).json({
      success: true,
      message: "Task created successfully",
      task: newtask,
    });
  } catch (error) {
    console.log("Error in CreateTask Controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: `Error creating task: ${error.message}`,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json("Task Id is missing!");
    } else {
      const taskId = req.query.id;
      const oldtask = await task.findOne({ _id: taskId });

      if (!oldtask) {
        return res.status(404).json("No such task is present!");
      }

      if (!req.body.description || req.body.description.length === 0) {
        return res.status(400).json("Description is missing!");
      }

      oldtask.description = req.body.description;

      if (req.body.status) {
        oldtask.status = req.body.status;
      } else {
        oldtask.status = new task().status;
      }

      await oldtask.save();

      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task: oldtask,
      });
    }
  } catch (error) {
    console.log("Error in UpdateTask Controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: `Error updating task: ${error.message}`,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json("Task Id is missing!");
    }

    const taskId = await task.findOne({ _id: req.query.id });

    if (!taskId) {
      return res.status(404).json("No such task is present!");
    }

    await task.findByIdAndDelete(req.query.id);
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteTask Controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: `Error updating task: ${error.message}`,
    });
  }
};

const getTask = async (req, res) => {
  try {
    let filter = {};
    if (req.query.status) {
      filter = { status: req.query.status };
    }
    const tasks = await task.find(filter);
    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.log("Error in getTask Controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: `Error fetching tasks: ${error.message}`,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json("Task Id is missing!");
    }
    const oldTask = await task.findOne({ _id: req.query.id });
    if (!oldTask) {
      return res.status(404).json({
        message: "No such task exists!",
      });
    }

    if (!req.query.status) {
      return res.status(400).json("Status is missing!");
    }

    oldTask.status = req.query.status;
    await oldTask.save();
    return res.status(200).json({
      success: true,
      message: "Status updated!",
      oldTask,
    });
  } catch (error) {
    console.log("Error in UpdateTaskStatus Controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: `Error updating task status: ${error.message}`,
    });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  updateTaskStatus,
};
