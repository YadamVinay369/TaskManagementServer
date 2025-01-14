const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const task = require("../models/taskSchema");

let taskId;

beforeAll(async () => {
  await mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const newTask = new task({ description: "Task to delete" });
  const savedTask = await newTask.save();
  taskId = savedTask._id.toString();
});

afterAll(async () => {
  await mongoose.connection.close();
  app.close();
});

describe("DELETE /api/deleteTask", () => {
  it("should delete a task successfully", async () => {
    const res = await request(app)
      .delete("/api/deleteTask")
      .query({ id: taskId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });

  it("should return an error if task is not found", async () => {
    const res = await request(app)
      .delete("/api/deleteTask")
      .query({ id: new mongoose.Types.ObjectId().toString() });

    expect(res.status).toBe(404);
    expect(res.body).toBe("No such task is present!");
  });
});
