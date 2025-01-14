const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "task description is madatory"],
      match: [/^[^<>/]+$/, " <,<,/ not allowed in description"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["done", "pending", "progress"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
