const express = require('express')
const router = express.Router()
const UserModel = require('../Model/UserModel')

router.post('/order', async (req,res) => {
    const {UserPhone,Address,CartItem,TotalPrice} = req.body
    const Userorder = {
        address: Address,
        cart: CartItem,
        totalprice: TotalPrice
    }
    console.log('order', Userorder)
    try{
        if(Address.PaymentMethod === 'PhonePe'){
            res.send('Online Payment Not Support')
        }else if(Address.PaymentMethod === 'COD'){
            const CheckUser = await UserModel.findOne({Phone: UserPhone})
            if(CheckUser){
                const PlaceOrder = await UserModel.findOneAndUpdate(
                {Phone: UserPhone},
                {$push: {UserOrder: Userorder}}   
            )  
            res.send('Your Order Is Placed')
            }else{
                res.send('Order Not Placed')
            }
        }
    }catch(error){
        res.send(error)
    }
})

module.exports = router