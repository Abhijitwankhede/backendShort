const mongoose = require("mongoose")
const express = require("express")
const app = express()
const Customer = require("../../model/user/customer.model")

app.post("/addCustomer",async(req,res)=>{
    try {
        const result = await new Customer(req.body).save()
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
        
    }
})


app.get("/getAllCustomer",async(req,res)=>{
    try {
        const result = await Customer.find({})
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
        
    }
})




module.exports = app;

