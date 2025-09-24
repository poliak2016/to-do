const express = require('express');
const todo = require('../models/todoModels');

// Get all todos
async function getAllTodos(req, res) {
  try {
    const todos = await todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 } 

// Create a new todo
async function createTodo(req, res) {
  const { text } = req.body;
  try {
    if (!text) {
      return res.status(400).json({ message: "text is required" });
    }
    const newTodo = new todo({ text});
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   

async function updateTodo(req, res) {
  const { id } = req.params;
  const updates = req.body;     
  try {
    const updatedTodo = await todo.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
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
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};