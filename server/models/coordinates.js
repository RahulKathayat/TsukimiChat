const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  coordinates: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Coordinates = mongoose.model('Coordinates',coordinateSchema);

module.exports = Coordinates;