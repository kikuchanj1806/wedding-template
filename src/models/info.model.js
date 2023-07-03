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
        validate: {
          validator: function (value) {
            const regex = /^0\d{9,10}$/;
            return regex.test(value);
          },
          message: "Số điện thoại không hợp lệ",
        },
      },
    attachment: {
      type: Number,
      default: 0,
    },
    eventOption: {
      type: String,
    },
    greetings: {
        type: String,
        validate: {
          validator: function (value) {
            return value.length >= 10;
          },
          message: "Please enter at least 10 characters",
        },
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
