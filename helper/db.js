const mongoose = require("mongoose")

  mongoose.connect("mongodb://localhost:27017/ALLINONE",{}).then(()=>{
    console.log("Mongodb connected")
}).catch(()=>{
    console.log("connection");
})



// let mongoose = require("mongoose");

// module.exports = {
//   connect: function () {
//     let db = mongoose
//       .connect("mongodb://localhost:27017/ALLINONE", {})
//       .then((res) => console.log("connected"));
//     mongoose.Promise = global.Promise;
//   },
//   initModels: function () {
//     require("../model/index.model");
//   },
// };