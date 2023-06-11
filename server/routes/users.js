const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const {Manufacturer,Transporter}=require('../models/user');

/*Register Manufacturer*/
router.post('/manufacturer',async(req,res)=>{
    try {
        const {name,email,password,Address}=req.body;

        const salt= await bcrypt.genSalt(Number(process.env.SALT));
        const passwordHash= await bcrypt.hash(password,salt);

        const newUser= new Manufacturer({
            name,
            email,
            password:passwordHash,
            Address
        });
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

/*Register Transporter*/
router.post('/transporter',async(req,res)=>{
    try {
        const {name,email,password,Address}=req.body;

        const salt= await bcrypt.genSalt(Number(process.env.SALT));
        const passwordHash= await bcrypt.hash(password,salt);

        const newUser= new Transporter({
            name,
            email,
            password:passwordHash,
            Address
        });
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

module.exports=router;