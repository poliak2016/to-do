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
    const newTodo = new todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   


module.exports = {
  getAllTodos,
  createTodo
};