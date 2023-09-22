const express = require("express");
const mongoose = require("mongoose")
const app = express();
const UserModel = require("../../model/user/user.model");
const User = mongoose.model("User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const env = require('dotenv')
const nodemailer = require("nodemailer");



app.post("/register", async (req, res) => {
  try {
    const { email, mobileNumber,password } = req.body;
    const userFind = await User.findOne({email: email})
    if (userFind) {
      return res.status(201).json({ message: "Alredy exists !" });
    }
     const passwordInc = await bcrypt.hash(password,10)

    const store = await new User({...req.body,password:passwordInc}).save();
    res.status(200).json(store);
  } catch (error) {
    console.log("=================", error);
    res.status(500).json(error);
  }
});

app.post("/login",async (req,res)=>{
  try {
    const {email,password} = req.body
    const userPass = await User.findOne({email:email})
    if(userPass){
      const compare = await bcrypt.compare(password,userPass.password)
    if(compare== true){
      const jwtToken = await jwt.sign(req.body,"abhijitwankhede") 
      console.log("jwtToken",jwtToken)
      let data ={
        data :userPass,
        token: jwtToken
      }

      return res.status(201).json({ message: "Login successfully!", data })
    }
    else{
      return res.status(201).json({ message: "Invalid credentials!" })

    }
    }
    else{
      return res.status(201).json({ message: "Invalid credentials!" })
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
    
  }
})

app.post("/forgotPassword",async(req,res)=>{
  try {
    const {mobileNumber,email} = req.body
     const result = await User.findOne({$or:[{mobileNumber:mobileNumber},{email:email}]})
     if(result){
      let otpGen = Math.floor(Math.random() * 100 + 100000)
      // console.log("otpGen",otpGen)
      const updateOtp = await User.findByIdAndUpdate({_id:result._id},{otp:otpGen},{$new:true})
      const getOtp = await User.findById(updateOtp._id)
      console.log(getOtp)
      res.status(200).json(getOtp)

     }
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error) 
    
  }
})

app.post("/resetPassword",async(req,res)=>{
  try {
    const {mobileNumber,otp,newPassword,password} = req.body
    const resetPassword = await User.findOne({$and:[{mobileNumber:mobileNumber},{otp:otp}]})
    if(resetPassword){
      const newPasswordFind = await bcrypt.hash(newPassword,10)
      const updatePass = await User.findByIdAndUpdate(resetPassword._id,{password:newPasswordFind},{$new:true})
      console.log("updatePass",updatePass)
      res.status(200).json(updatePass)

    }
    
  } catch (error) {
    console.log(error)
    res.send(error)
    
  }

})

app.post("/changePassword",async(req,res)=>{
  try {
    const {email,newPassword,password} = req.body
    const result = await User.findOne({email:email})
    if(result){
      const updatePass = await bcrypt.compare(password,result.password)
      if(updatePass == true){
        const changePass = await bcrypt.hash(newPassword,10)
        const updatePass = await User.findByIdAndUpdate(result._id,{password:changePass},{$new:true})
        res.status(200).json(updatePass)
      }
      else{
        return res.status(500).json({message:"Invalid password"})
      }
    }
    else{
      return res.status(500).json({message:"Email is invalid"})
    }

    
  } catch (error) {
    console.log(error)
    res.send(error)
    
  }
})

app.get("/getProfile",async(req,res)=>{
  try {
    const {email,newPassword,password,id} = req.body
    const getProf = await User.findById({_id:id})
    res.status(200).json(getProf)
  } catch (error) {
    console.log(error)
    res.send(error)
    
  }
})

app.put("/updateProfile",async(req,res)=>{
  try {
    const {email,newPassword,password,id} = req.body
    const getProf = await User.findById({_id:id})
    if(getProf){
      const updateProfile = await User.findByIdAndUpdate(getProf._id,req.body,{$new:true})
      const get = await User.findById(updateProfile._id)
      res.send(get)

    }
    else{
      res.status(500).json({message:"Invalid Id"})
    }
    

    
  } catch (error) {
    console.log(error)
    res.send(error)
    
    
  }
})

app.post("/forgotPasswordSendUrl",async(req,res)=>{
  try {
    const {email} = req.body
    const result = await User.findOne({email:email})
    console.log("result",result)
    if(!result){
      res.status(500).json({message:"Email is not valid !"})
    }
    console.log(result._id)
    const jwtToken = await jwt.sign({id:result._id}, "abhijitwankhede")
    // let FRONTENDURL = "http://localhost:3003"
    let verification_url = process.env.FRONTENDURL + `/api/v1/${jwtToken}`
    console.log("url",verification_url)
    if(result){
      var transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "wankhedeabhijit6@gmail.com",
          pass: "gdoljsujldvfrrdl",
        },
      });
      var mailOptions = {
        from: "wankhedeabhijit6@gmail.com",
        to: req.body.email,
        subject: "check email and use link",
        html: verification_url,
      };
      transporter.sendMail(mailOptions, async function (error) {
        if (error) {
          res.send(error);
          console.log(error);
        } else {
          console.log("bbbb")
          res.status(200).json({message:"Verification mail send on your registered email address."})
          console.log("Mail sent successfully");
        }
      });
    } 
  } catch (error) {
    console.log(error)
    
  }
})

app.post("/verifyUrl",async(req,res)=>{
  try {
    const verifyToken = await jwt.verify(req.body.token,"abhijitwankhede")
    console.log("verifyToken",verifyToken)
    const findData = await User.findById(verifyToken.id)
    if(!findData){
      res.status(200).json({message:"Error"})
    }

    console.log("findData",findData)
    res.status(500).json(findData)
  } catch (error) {
    console.log(error)
  }
})

app.post("/resetPassurl",async(req,res)=>{
  try {
    const {email,password,id} = req.body
    const result = await User.findOne({email:email})
    if(result){
      const hashPass = await bcrypt.hash(req.body.newPassword,10)
      const updatePass = await User.findByIdAndUpdate(id,{password:hashPass},{$new:true})
      res.send(updatePass)
   }
    
  } catch (error) {
    console.log("error",error)
    
  }
})


module.exports = app;
