const express=require('express');
const router=express.Router();

router.delete('/manufacturer',async(req,res)=>{
    try {
        res.cookie('Mtoken', '', {expires: new Date(0)} );

    res.sendStatus(200);
    console.log('logout successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

router.delete('/transporter',async(req,res)=>{
    try {
        res.cookie('Ttoken', '', {expires: new Date(0)} );

    res.sendStatus(200);
    console.log('logout successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})
module.exports=router;