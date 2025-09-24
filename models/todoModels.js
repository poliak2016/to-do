const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false }
  }, { timestamps: true }
);

todoSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const todo = mongoose.model('Todo', todoSchema);
module.exports = todo;