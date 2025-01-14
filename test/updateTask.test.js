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
  const newTask = new task({ description: "Initial Task" });
  const savedTask = await newTask.save();
  taskId = savedTask._id.toString();
});

afterAll(async () => {
  await mongoose.connection.close();
  app.close();
});

describe("PUT /api/updateTask", () => {
  it("should update a task successfully", async () => {
    const res = await request(app)
      .put("/api/updateTask")
      .query({ id: taskId })
      .send({ description: "Updated Task Description" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task updated successfully");
    expect(res.body.task.description).toBe("Updated Task Description");
  });

  it("should return an error if task is not found", async () => {
    const res = await request(app)
      .put("/api/updateTask")
      .query({ id: new mongoose.Types.ObjectId().toString() })
      .send({ description: "Non-existent Task" });

    expect(res.status).toBe(404);
    expect(res.body).toBe("No such task is present!");
  });

  it("should handle server error when updating task", async () => {
    jest
      .spyOn(task, "findOne")
      .mockRejectedValueOnce(new Error("Database error"));

    const res = await request(app)
      .put("/api/updateTask")
      .query({ id: taskId })
      .send({ description: "Updated Task Description" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error updating task: Database error");
  });
});
