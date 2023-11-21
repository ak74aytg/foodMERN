const mongoose = require('mongoose');
const express = require('express');

const schema = mongoose.Schema;


const orderSchema = new schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    orders:{
        type:Array,
        required:true
    }
})


module.exports = mongoose.model('Order', orderSchema);

