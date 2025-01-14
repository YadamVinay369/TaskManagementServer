const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const task = require("../models/taskSchema");

beforeAll(async () => {
  await mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await new task({ description: "First Task" }).save();
  await new task({ description: "Second Task" }).save();
});

afterAll(async () => {
  await mongoose.connection.close();
  app.close();
});

describe("GET /api/getTasks", () => {
  it("should fetch all tasks", async () => {
    const res = await request(app).get("/api/getTask");

    expect(res.status).toBe(200);
    expect(res.body.tasks.length).toBeGreaterThan(0);
  });

  it("should return an empty array if no tasks are available", async () => {
    await task.deleteMany({}); // Clean up all tasks

    const res = await request(app).get("/api/getTask");

    expect(res.status).toBe(200);
    expect(res.body.tasks).toEqual([]);
  });

  it("should handle server error when fetching tasks", async () => {
    jest.spyOn(task, "find").mockRejectedValueOnce(new Error("Database error"));

    const res = await request(app).get("/api/getTask");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error fetching tasks: Database error");
  });
});
