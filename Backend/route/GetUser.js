const express = require('express')
const router = express.Router()
const UserModel = require('../Model/UserModel')

router.get('/getuser', async (req,res) => {
    const UserPhone = req.query.Phone
    console.log('this is user phone cart',UserPhone)
    // check if user exist
    const CheckUser = await UserModel.findOne({Phone: UserPhone})
    if(CheckUser){
        res.send(CheckUser)
    } else{
        res.send('User Not Exist')
    }
})

module.exports = router