const express = require('express')
const router = express.Router()
const dbconnection = require('../DBConnection')
const UserModel = require('../Model/UserModel')

router.post('/signin', async (req,res) => {
    const UserPhone = req.body.userphone
    const CheckUser = await UserModel.findOne({'Phone':UserPhone})
    if(CheckUser){
        res.send(CheckUser)
    }else{
        const CreateUser = await UserModel.insertMany({
            Phone:UserPhone,
            Product:Array,
            UserOrder:Array,
            SigninTime:Array
        })
        if(CreateUser){
            res.send('user is created')
        }else{
            res.send('user is not created')
        }
    }
})

module.exports = router