import React from 'react'
import '../Style/Profile.css'
import { useState, useEffect } from 'react'
import Header from './Header'
import { Navigate, useNavigate } from 'react-router-dom'

const Profile = () => {

  const nevigate = useNavigate()
  const [Userphone, SetUserphone] = useState()
  const [Order, SetOrder] = useState([])
  // retrieve userphone and user recent order form localstorage
  useEffect(() => {
    const UserPhone = localStorage.getItem('PhoneNumber')
    SetUserphone(UserPhone)
    const UserOrder = localStorage.getItem('userData')
    if (UserOrder) {
      const CartOrder = JSON.parse(UserOrder)
      SetOrder(CartOrder.UserOrder)
    }
  }, [])

  // logoutuser
  const LogoutUser = () => {
    const UserPhone = localStorage.getItem('PhoneNumber')
    if(UserPhone){
      window.localStorage.clear()
      window.location.reload()
      Navigate('/login')
    }else{
      alert('Login First')
    }
  }

  return (
    <>
    <Header/>
      <div id='top-profile-section'>
        <div id='wrapper-profile-section'>
          <h2 id='logo'>ella</h2>
          <div id='wrapper-user-profile-sec'>
            <h2 id='tittle'>Hii {Userphone}</h2>
            <h2 id='title'>Order</h2>
            <div id='user-order-section'>
              {
                Order.cart ? Order.cart.map((orderitem, index) => {
                  return (
                    <ul id='user-order' key={index}>
                      <li id='o-item-name'>{orderitem}</li>
                    </ul>
                  )
                }) : <h2>No Recent Order For Current User</h2>
              }
            </div>
            <button id='logout' onClick={LogoutUser}>Logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
