const mongoose = require("mongoose");
const schema = mongoose.Schema;
const congraSchema = new schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
});
module.exports = mongoose.model("congra", congraSchema);
