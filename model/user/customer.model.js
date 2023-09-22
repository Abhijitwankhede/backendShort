const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  handle: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
},
{timestamps:true}
);

module.exports = mongoose.model("Customer", Customer);
