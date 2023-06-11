const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const {Manufacturer,Transporter}=require('../models/user');
const { use } = require('./users');

router.post('/manufacturer',async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user= await Manufacturer.findOne({email:email});
        
        if(!user) return res.status(400).json({message: "User does not exists"})

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token =jwt.sign({id:user._id}, process.env.JWTSECRETKEYM);
        res.cookie("MToken",token,{
            expires:new Date(Date.now()+2996000000),
            httpOnly:true
        })
        delete user.password;
        res.status(200).json({token:token,user:user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

router.post('/transporter',async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user= await Transporter.findOne({email:email});
        
        if(!user) return res.status(400).json({message: "User does not exists"})

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token =jwt.sign({id:user._id}, process.env.JWTSECRETKEYT);
        res.cookie("TToken",token,{
            expires:new Date(Date.now()+2996000000),
            httpOnly:true
        })
        delete user.password;
        res.status(200).json({token,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

router.get('/Manufacturer',async(req,res)=>{
    try {
        const user=await Manufacturer.find();
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
})

module.exports=router;