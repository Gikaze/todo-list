// Importation de Mongoose
const mongoose = require("mongoose");

// Définition du schéma pour une tâche
const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "A Location must have an address"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "A Location must have a city"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "A Location must have a country"],
    trim: true,
  },
  flag: String,
  coordinates: [Number],
});

// Création du modèle de tâche basé sur le schéma
const Location = mongoose.model("Location", locationSchema);

// Exportation du modèle
module.exports = Location;
