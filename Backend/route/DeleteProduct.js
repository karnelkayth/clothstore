const express = require('express')
const router = express.Router()
const UserModel = require('../Model/UserModel')

router.post('/deleteproduct', async (req,res) => {
    const {UserPhone, ProductName} = req.body
    console.log(UserPhone, ProductName)
    const CheckUser = await UserModel.findOne({Phone: UserPhone})
    if(CheckUser){
        const CheckProduct = CheckUser.Product.some(item => item.name === ProductName)
        if(CheckProduct){
            try{
                const DeleteProduct = await UserModel.findOneAndUpdate(
                    {Phone: UserPhone},
                    {$pull: {Product: {name: ProductName}}}
                )
                res.send('Product Deleted')
            }catch(err){
                res.send(err)
            }
        }else{
            res.send('Product Not Found')
        }
    }else{
        res.send('User Not Found')
    }
})

module.exports = router