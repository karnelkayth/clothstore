import React, { useEffect, useRef} from 'react'
import '../Style/Cart.css'
import { Link, useAsyncError } from 'react-router-dom'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import axios from 'axios'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const Cart = () => {
  const [CartProduct, SetProduct] = useState([])
  const [Price, SetPrice] = useState()
  const [TotalPrice, SetTotalPrice] = useState([])
  const UserPhones = localStorage.getItem('PhoneNumber')
  const [CartItem, SetCartItem] = useState()
  // set user address into the address state
  const [Address, SetAddress] = useState({
    City:"",
    State:"",
    Landmark:"",
    Phone:"",
    Name:"",
    OrderType:"",
    PaymentMethod:""
  })
  const HandleData = (e) => {
    const name = e.target.name
    const value = e.target.value
    SetAddress((prev) => ({...prev, [name]: value}))
  }

  const PO = useRef()
  // show display of address and payment method when user click on make payment btn
  const ShowAddress = () => {
    PO.current.style.display = 'block'
  }
  // show display of address and payment method when user click on make payment btn
  const HideAddress = () => {
    PO.current.style.display = 'none'
  }

  // retrieve current user data from localstorage
  useEffect(() => {
    const GetUserData = () => {
      const UserCart = localStorage.getItem('userData')
      if (UserCart) {
        const CartData = JSON.parse(UserCart)
        SetProduct(CartData.Product)
      } else {
        //
      }
    }
    GetUserData()
  }, [])

  useEffect(() => {
    const prices = CartProduct.map(outfit => { return outfit.price * outfit.quantity });
    SetPrice(prices)
    const OrderProductName = CartProduct.map(itemname => {return itemname.name + ', Quantity ' + itemname.quantity + ', Price ' + itemname.price})
    SetCartItem(OrderProductName)
  }, [CartProduct])

  useEffect(() => {
    // total price
    const totalprice = Price && Price.reduce((curr, next) => curr + next, 0)
    SetTotalPrice(totalprice)
  }, [Price])



  // handle quantity
  const DecQuantity = (index) => {
    const NewQuantity = [...CartProduct]
    if (NewQuantity[index].quantity === 1) {
      alert('you reach the minimum quantity')
    } else {
      NewQuantity[index].quantity -= 1;
      SetProduct(NewQuantity)
      const UpdateCart = async () => {
        const UserPhone = localStorage.getItem('PhoneNumber')
        const Response = await axios.post('https://clothstore-m2ww.onrender.com/quantity', {
          userPhone: UserPhone,
          ProductName: NewQuantity[index].name,
          ProductQuantity: NewQuantity[index].quantity
        })
        if (Response.data === 'Product Update') {
          const ProductUpdateRes = await axios.get('https://clothstore-m2ww.onrender.com/cart', {
            params: { userphone: UserPhone }
          })
          localStorage.setItem('userData', JSON.stringify(ProductUpdateRes.data));
          window.location.reload()
        }
      }
      UpdateCart()
    }
  }

  const IncQuantity = (index) => {
    const NewQuantity = [...CartProduct]
    if (NewQuantity[index].quantity <= 9 && NewQuantity[index].quantity > 0) {
      NewQuantity[index].quantity += 1;
      SetProduct(NewQuantity)
      const UpdateCart = async () => {
        const UserPhone = localStorage.getItem('PhoneNumber')
        const Response = await axios.post('https://clothstore-m2ww.onrender.com/quantity', {
          userPhone: UserPhone,
          ProductName: NewQuantity[index].name,
          ProductQuantity: NewQuantity[index].quantity
        })
        console.log('quantity upadate respone', Response)
        if (Response.data === 'Product Update') {
          const ProductUpdateRes = await axios.get('https://clothstore-m2ww.onrender.com/cart', {
            params: { userphone: UserPhones }
          })
          localStorage.setItem('userData', JSON.stringify(ProductUpdateRes.data));
          window.location.reload()
        }
      }
      UpdateCart()
    } else {
      alert('You can not add more than 10 items')
    }
  }

  //delete product from DB when user click on cross btn of each product
  const DeleteProduct = async (item) => {
    const ProductName = item.name
    const UserPhone = localStorage.getItem('PhoneNumber')
    const DeleteProduct = await axios.post('https://clothstore-m2ww.onrender.com/deleteproduct', { UserPhone, ProductName })
    // console.log('this is delete product res', DeleteProduct)
    if (DeleteProduct.data === 'Product Deleted') {
      const SendData = await axios.get('https://clothstore-m2ww.onrender.com/cart', {
        params: { userphone: UserPhones }
      })
      // console.log('this is senddata', SendData)
      localStorage.setItem('userData', JSON.stringify(SendData.data));
      window.location.reload()
    } else if (DeleteProduct === 'Product Not Found') {
      alert('Product Not Found')
    }
  }

  const PlaceOrder = async (e) => {
    e.preventDefault()
    const UserPhone = localStorage.getItem('PhoneNumber')
    try{
      if(Address.PaymentMethod === ''){
        alert('Select Payment Method')
      }else{
        const SendOrder = await axios.post('https://clothstore-m2ww.onrender.com/order', {UserPhone,Address,CartItem,TotalPrice})
        console.log('this is send order', SendOrder)
        if(SendOrder.data === 'Online Payment Not Support'){
          alert('Online Payment Not Support')
        }else if(SendOrder.data === 'Your Order Is Placed'){
          const OrderData = await axios.get('https://clothstore-m2ww.onrender.com/cart', {
            params: {userphone: UserPhone}
          })
          if(OrderData){
            localStorage.setItem('userData', JSON.stringify(OrderData.data));
            window.location.reload()  
          }
        }
      }
    }catch(arror){
      console.log(arror)
    }
  }



  return (
    <div className='top-cart'>
      <div className='wrapper-cart-section'>
        <div id='alert'>
          <div id='go-to-home'>
            <span id='home'><Link to={'/menu'} id='link'>Home</Link></span>
            <span id='left-arrow'><KeyboardArrowLeftRoundedIcon /></span>
            <button id='go-back'>Cart</button>
          </div>
          <p id='notice'>Please check your cart before place order</p>
        </div>
        <div id='cart-main-sec'>

          {/* cart product */}
          <div className='user-cart-sec'>
            <div id='top-header-title-clear-cart'>
              <h2 id='title'>Your Cart</h2>
              <button id='clear-cart'>All Clear</button>
            </div>
            <div id='wrapper-cart-product-sec'>

              {/* product */}
              {
                CartProduct && CartProduct.map((item, index) => {
                  return (
                    <div id='cart-product' key={index}>
                      <div id='cart-product-img-sec'>
                        <img src={item.image} alt="" className='cart-product-img' />
                      </div>
                      <div id='cart-product-w-d-s'>
                        {/* product name des */}
                        <div id='product-name-des'>
                          <div className='item-n-d-btn'>
                            <h1 id='cart-product-name'>{item.name}</h1>
                            <button className='p-d-btn' onClick={() => DeleteProduct(item)}><CloseRoundedIcon fontSize='small' /></button>
                          </div>
                          <p id='cart-product-des'>{item.des}</p>
                          <p id='product-size'>Size: {item.selectsize}</p>
                        </div>
                        {/* product detail */}
                        <div id='product-price-quantity-sec'>
                          <h2 id='cart-product-price'><CurrencyRupeeRoundedIcon fontSize='extrasmall' />{item.price * item.quantity}</h2>
                          <div id='cart-product-quantity-sec'>
                            <button id='quantity-btn' onClick={() => DecQuantity(index)}><RemoveRoundedIcon fontSize='small' /></button>
                            <span id='cart-quantity'>{item.quantity}</span>
                            <button id='quantity-btn' onClick={() => IncQuantity(index)}><AddRoundedIcon fontSize='small' /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </div>
          {/* cart product order and price  */}
          <div id='cart-price-payment-order-sec'>

            {/* cart price detail */}
            <div className='cart-price-detail-sec'>
              <div id='cart-total-price-sec'>
                <h1 id='cart-icon'><ShoppingCartRoundedIcon /></h1>
                <h2 id='cart-total-price'><CurrencyRupeeRoundedIcon fontSize='extrasmall' />{TotalPrice}</h2>
              </div>
              <button id='make-payment-btn' onClick={ShowAddress}>Make Payment</button>
            </div>

            <div id='cart-w-p-a' ref={PO}>
              {/* cart payment method */}
              <div id='top-payment-method-sec'>
                <h2 id='titlle'>Select Payment Method</h2>
                <div id='wrapper-payment-section'>
                  <div id='payment-box'>
                    <label for="payment-method-name" id='label'>COD</label>
                    <input type="radio" name="PaymentMethod" id="payment-method-name" value={'COD'} onChange={HandleData}/>
                  </div>
                  <div id='payment-box'>
                    <label for="payment-method-name" id='label'>Phone Pe</label>
                    <input type="radio" name="PaymentMethod" id="payment-method-name" value={'PhonePe'} onChange={HandleData}/>
                  </div>
                </div>
              </div>

              {/* cart order section */}
              <div id='top-order-section'>
                <h2 id='titlle'>Address</h2>
                <div id='wrapper-address-section'>

                  <form>
                    <div id='add-input-field'>
                      <div id="user-city-state">
                        <input type="text" name="City" id="user-city-address" placeholder='City' onChange={HandleData}/>
                        <input type="text" name="State" id="user-city-address" placeholder='State' onChange={HandleData}/>
                      </div>
                      <div id='user-landmark-phone'>
                        <input type="text" name="Landmark" id="user-address" placeholder='Landmark' onChange={HandleData}/>
                        <input type="number" name="Phone" id="user-address" placeholder='Phone' onChange={HandleData}/>
                        <input type="text" name="Name" id="user-address" placeholder='Enter Your Name' onChange={HandleData}/>
                      </div>

                      <div id='user-order-type-sec'>
                        <div id='user-order-type'>
                          <label for="order-type" id='ot'>Home</label>
                          <input type="radio" name="OrderType" id="order-type" value={'Home'} onChange={HandleData}/>
                        </div>
                        <div id='user-order-type'>
                          <label for="Order-type" id='ot'>Office</label>
                          <input type="radio" name="OrderType" id="order-type" value={'Office'} onChange={HandleData}/>
                        </div>
                      </div>
                    </div>
                    {/* place order button */}
                    <button id='cancel-place-order-btn' onClick={HideAddress}>Cancel</button>
                    <button id='place-order-btn' onClick={PlaceOrder}>Place Order</button>
                  </form>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart
