const express = require('express')
const router = express.Router()
const UserModel = require('../Model/UserModel')

router.post('/quantity', async (req, res) => {
    const { userPhone, ProductName, ProductQuantity } = req.body;
    // console.log(userPhone, ProductName, ProductQuantity);
    // Check if the user exists
    const checkUser = await UserModel.findOne({ Phone: userPhone });
    if (checkUser){
        UserModel.findOneAndUpdate({Phone: userPhone}, {
            $set: { "Product.$[updateitem].quantity": ProductQuantity },
        }, { arrayFilters: [{ "updateitem.name": ProductName }] })
            .then(updatecart => {
                res.send('Product Update')
            })
            .catch(err => {
                res.send('Product Not Updated')
                console.log(err)
            })
    
    }else{
        console.log('User Not Found')
    }
})
module.exports = router