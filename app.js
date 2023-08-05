const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const Todo = mongoose.model("Todo", { text: String });

// Create a new todo
app.post("/api/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a todo by ID
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      res.status(404).send();
    } else {
      res.send(deletedTodo);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a todo by ID
app.patch("/api/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    if (!updatedTodo) {
      res.status(404).send();
    } else {
      res.send(updatedTodo);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// List all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
