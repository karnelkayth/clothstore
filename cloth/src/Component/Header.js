import React from 'react'
import '../Style/Header.css'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import {useEffect,useState,useRef} from 'react'

const Header = () => {
  const Login = useRef()
  // useEffect(() => {
  //   const User = localStorage.getItem('userData')
  //   if(User){
  //     Login.current.style.display = 'none'
  //   }
  // })

  return (
    <div className='top-main-header'>
      <div id='top-header'>
        <div id='logo-section'>
            <h1 className='Logo'>ella</h1>
        </div>
        <div id='cart-profile'>
            <ul>
                <li><span id='span'><PersonRoundedIcon fontSize='small'/></span><Link to={'/profile'} id='lin'>PROFILE</Link></li>
                <li><span id='span'><FavoriteRoundedIcon fontSize='small'/></span>FAVORITE</li>
                <li><span id='span'><ShoppingCartRoundedIcon fontSize='small'/></span><Link to={'/cart'} id='lin'>CART</Link></li>
                <li ref={Login}><span id='span'><PersonRoundedIcon fontSize='small'/></span><Link to={'/login'} id='lin'>LOGIN</Link></li>
            </ul>
        </div>
      </div>
      <div id='bot-header'>
        <p id='my-notice'>This project is build on my begginer level using mern stack and i can custmize my code through the practice</p>
      </div>
    </div>
  )
}

export default Header
