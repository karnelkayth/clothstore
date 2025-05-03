const express = require('express')
const mongoose = require('mongoose')

const dbconnection = async () => {
    const connect = mongoose.connect('mongodb://localhost:27017/ClothClone')
}
dbconnection()
module.exports = dbconnection