const mongoose=require('mongoose');
const ManufacturerInput=mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },
    To:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    },
    Quantity:{
        type:Number,
        required:true,
    },
    Address:{
        type: String,
        required:true,
    },
    Transporter:{
        type:String,
        required:true,
    }
})

const TransporterReply=mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    }
})

const MInput=mongoose.model('MInput',ManufacturerInput);
const TReply=mongoose.model('TReply',TransporterReply);

module.exports={MInput,TReply};