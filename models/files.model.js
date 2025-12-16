const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    originalname:{
        type:String,
        required:true
    },
    



})