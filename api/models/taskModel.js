// Importation de Mongoose
const mongoose = require("mongoose");
const User = require("./userModel");

// Définition du schéma pour une tâche
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Task must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please give a short description of the task"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
});

// Création du modèle de tâche basé sur le schéma
const Task = mongoose.model("Task", taskSchema);

// Exportation du modèle
module.exports = Task;
