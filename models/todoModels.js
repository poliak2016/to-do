const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false }
  }, { timestamps: true }
);

const todo = mongoose.model('Todo', todoSchema);
module.exports = todo;