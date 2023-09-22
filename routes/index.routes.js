// module.exports = (app) => {

//   let authRoute = require("./auth.routes");
//   let userRoute = require("./user/user.routes");
//   let uploadRoute = require("./upload.routes");

//   app.use("/api/authentication", authRoute);
//   app.use("/api/user", userRoute);
//   app.use("/api/upload", uploadRoute);
// };


module.exports = (app) =>{
    let user = require("./user/user.routes")
    let booking = require("./booking/booking")
    let customer = require("./customer/customer")



    app.use("/api/v1",user)
    app.use("/api/v1",booking)
    app.use("/api/v1",customer)


}