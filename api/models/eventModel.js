const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An Event must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please give a short description of the event"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "An Event must have a location"],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, "An Event must have a startdate"],
  },
  startTime: {
    type: String,
    required: [true, "An Event must have a startTime"],
    trim: true,
  },
  endDate: {
    type: Date,
    required: [true, "An Event must have a enddate"],
  },
  endTime: {
    type: String,
    required: [true, "An Event must have a endtime"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Event must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
