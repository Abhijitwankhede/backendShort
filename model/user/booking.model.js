const mongoose = require("mongoose");
const Booking = mongoose.Schema({
  bookingId: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
  },
  time: {
    type: String,
    enum: [
      "12:00PM",
      "1:00PM",
      "2:00PM",
      "3:00PM",
      "4:00PM",
      "5:00PM",
      "6:00PM",
      "7:00PM",
      "8:00PM",
    ],
  },
  status:{type:String,default:"active"}
},{timestamps:true}
);

module.exports = mongoose.model("Booking", Booking);
