const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Booking = require("../../model/user/booking.model");

app.post("/booking", async (req, res) => {
  try {
    // const {time,date} = req.body
    const bookingData = await Booking.find({
      date: req.body.date,
      time: req.body.time,
    });
    if (bookingData) {
      res.status(200).json({ message: "Alredy booking" });
    }

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    let Month = months[date.getMonth()];
    console.log("Month", Month);
    const Otp = Math.floor(Math.random() * 100 + 1000);
    console.log("otp", Otp);
    const merge = `${Month}-${Otp}`;
    console.log("merge", merge);

    const result = await new Booking(req.body, { bookingId: merge });
    console.log("result",result)
    res.send(result);
  } catch (error) {
    console.log("error",error)
    console.log(error);
  }
});

app.post("/getAllBooking",async(req,res)=>{
  try {
    const getAllData = await Booking.find({status:"active"})
    if(getAllData>0){
      res.status(200).json(getAllData)
    }
    
  } catch (error) {
    console.log(error)
    
  }
})

app.post("/getById",async(req,res)=>{
  try {
    const getAllData = await Booking.find({_id:re.body.id})
    if(getAllData){
      res.status(200).json(getAllData)
    }
    
  } catch (error) {
    console.log(error)
    
  }
})

app.post("/deleteById",async(req,res)=>{
  try {
    const getAllData = await Booking.findByIdAndDelete({_id:re.body.id})
    if(getAllData){
      res.status(200).json(getAllData._id)
    }
    
  } catch (error) {
    console.log(error)
    
  }
})

app.post("/updateAppoinment",async(req,res)=>{
  try {
    const getAllData = await Booking.findOne({date:req.body.date,time:req.body.time})
    if(getAllData){
      res.status(200).json({message:"Alredy present"})
    }
    else{
      const updateResult = await Booking.findByIdAndUpdate({_id:req.body.id},req.body,{$new:true})
      res.status(200).json({message:"updateResult"})
    }
    
  } catch (error) {
    console.log(error)
    
  }
})

module.exports = app;
