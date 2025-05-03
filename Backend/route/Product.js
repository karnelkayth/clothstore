const express = require('express');
const router = express.Router()
const UserModel = require('../Model/UserModel');
const dbconnection = require('../DBConnection');

router.post('/product', async (req, res) => {
    const UserPhone = req.body.userphone;
    const Products = req.body.Productt
    console.log(UserPhone, Products)
    const CheckUser = await UserModel.findOneAndUpdate({ 'Phone': UserPhone })
    try{
        if (CheckUser) {
            const CheckProduct = CheckUser.Product.some(item => item.name == Products.name)
            if (CheckProduct) {
                res.send('Product Already Exist')
            } else {
                const AddProduct = await UserModel.findOneAndUpdate(
                    { 'Phone': UserPhone },
                    { $push: { Product: Products } }
                )
                res.send('Add Product')
            }
        } else {
            res.send('Login First')
        }
    }catch(err){
        console.log(err)
    }
})
module.exports = router