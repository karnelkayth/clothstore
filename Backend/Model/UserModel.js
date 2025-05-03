const express = require('express')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Phone:Number,
    Product:Array,
    UserOrder:Array
})

const UserModel = mongoose.model('Cloth', UserSchema)
module.exports = UserModel