const Event = require("./../models/eventModel");
const factory = require("./handlerFactory");
// const catchAsync = require('./../utils/catchAsync');

exports.getAllEvents = factory.getAll(Event);
exports.getEvent = factory.getOne(Event);
exports.createEvent = factory.createOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
