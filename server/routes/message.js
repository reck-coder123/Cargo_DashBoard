const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const {Manufacturer}=require('../models/user');
const {MInput,TReply}=require('../models/message');


function generateRandomKeyword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let keyword = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      keyword += characters.charAt(randomIndex);
    }
    
    return keyword;
  }
  
  
  //For Manufacturer to place order
  
  router.post('/manufacturer',async(req,res)=>{
      try {
        const randomKeyword = generateRandomKeyword(6);

       const {To,from,Quantity,Transporter,Address}=req.body;
    //    const user= await Manufacturer.findById(ManufacturerId);

       const order= new MInput({
        orderId:randomKeyword,
        To,
        from,
        Quantity,
        Transporter,
        Address,
       })
       await order.save();
       const Order=await MInput.find();
       res.status(201).json(Order);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})

// For Transporter to post reply
router.post('/transporter', async(req,res)=>{
    try {
        const {orderId,Price}=req.body;

        const reply= new TReply({
            orderId,
            Price,
        })
        await reply.save();
        const Reply = await TReply.find();
        res.status(201).json(Reply);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})

//to view manufacturer's message

router.get('/manufacturer/view', async(req,res)=>{
    try {
        const msgs=await MInput.find();
        res.status(201).json(msgs);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
})

// to view transporter's reply
router.get('/transporter/view', async(req,res)=>{
    try {
        const reply=await TReply.find();
        res.status(201).json(reply);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
})

module.exports=router;