const express = require('express');
const todo = require('../models/todoModels');
const logger = require('../logger');

// Get all todos
async function getAllTodos(req, res, next) {
  try {
    const todos = await todo.find();
    logger.info(`Retrieved ${todos.length} todos`);
    res.status(200).json(todos);
  } catch (error) {
    logger.error(`Error retrieving todos: ${error.message}`);
    next(error);
  }
 } 

// Create a new todo
async function createTodo(req, res) {
  const { text, done } = req.body;
  try {
    if (!text) {
      return res.status(400).json({ message: "text is required" });
    }
    const newTodo = new todo({ 
      text,
      done: typeof done === 'boolean' ? done : false
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Update an existing todo
async function updateTodo(req, res, next) {
    
  try {
   const {id} = req.params;
   const updates = {};
   if (typeof req.body.done !== 'undefined') {
     updates.done = !! req.body.done;
   }
    if (typeof req.body.text !== 'undefined') {
     updates.text = String(req.body.text);
   }
   if(Object.keys(updates).length === 0) {
     return res.status(400).json({ message: "No valid fields to update" });
   }

   const updateTodo = await todo.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true,
        runValidators: true,
        context: 'query'
       }
   );
    if (!updateTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const deletedTodo = await todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};