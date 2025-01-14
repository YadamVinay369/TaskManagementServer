const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const task = require("../models/taskSchema");

beforeAll(async () => {
  await mongoose.connect(process.env.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await app.close();
});

describe("POST /api/createTask", () => {
  it("should create a new task successfully", async () => {
    const taskData = {
      description: "Test Task",
      status: "progress",
    };

    const res = await request(app).post("/api/createTask").send(taskData);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task created successfully");
    expect(res.body.task.description).toBe(taskData.description);
    expect(res.body.task.status).toBe(taskData.status);
  });

  it("should return an error when description is missing", async () => {
    const res = await request(app).post("/api/createTask").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Description for the task is missing!");
  });

  it("should handle server error when saving task", async () => {
    jest
      .spyOn(task.prototype, "save")
      .mockRejectedValueOnce(new Error("Database error"));

    const taskData = {
      description: "Test Task",
    };

    const res = await request(app).post("/api/createTask").send(taskData);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error creating task: Database error");
  });
});
