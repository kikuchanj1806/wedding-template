const mongoose = require("mongoose");
const schema = mongoose.Schema;
const congraSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  attachment: {
    type: Number,
  },
  eventOption: {
    type: String,
  },
  greetings: {
    type: String,
  },
  image: {
    type: [String],
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("congra", congraSchema);
