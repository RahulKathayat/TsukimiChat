const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  coords: {
    type: String,
    default: "30.6848559 76.6654045"
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Coordinates = mongoose.model('Coordinates',coordinateSchema);

module.exports = Coordinates;