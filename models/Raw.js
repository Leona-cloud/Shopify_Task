const mongoose = require('mongoose');

const rawSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    numberIn: {
        type: Number,
        required: true
    },

    numberOut: {
        type: Number,
        required: true
    }, 

    numberRemaining:{
        type: Number
    },

    comments: {
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
  
},   {timestamps: true});


const RawMaterials = mongoose.model('RawMaterials', rawSchema);

module.exports = RawMaterials;