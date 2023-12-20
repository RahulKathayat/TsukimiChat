const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    require:true,
    ref: "User",
  },
  coords: {
    type: String,
    require:true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Coordinates = mongoose.model('Coordinates',coordinateSchema);

module.exports = Coordinates;