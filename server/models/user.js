const mongoose=require('mongoose');

const ManufacturerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    Address:{
        type:String,
        required:true,
        min:2,
        max:50,
    },

});

const TransporterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    Address:{
        type:String,
        required:true,
        min:2,
        max:50,
    },

});

const Manufacturer=mongoose.model("Manufacturer",ManufacturerSchema);
const Transporter=mongoose.model("Transporter",TransporterSchema);

module.exports={Manufacturer,Transporter};

