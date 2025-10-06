const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true, minlength: 2 },
    done: { type: Boolean, default: false }
  }, { timestamps: true }
);

todoSchema.pre('validate', function (next) {
  if (this.text.length < 2) {
    console.error("text is too short");
    next(new Error("text is too short"));
  } else {
    next();
  }
});

todoSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const todo = mongoose.model('Todo', todoSchema);
module.exports = todo;