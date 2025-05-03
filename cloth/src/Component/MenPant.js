import React from 'react'
import '../Style/MenShirt.css'
import { useState } from 'react'
import menpant from '../API/PantsApi'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MenPant = () => {
    const [Pant, SetPant] = useState(menpant)
    const nevigate = useNavigate()
    const handleproduct = (Product) => {
        nevigate('/product', { state: Product })
    }

    return (
        <div id='top-section'>
            <div id='mini-product-section'>
                <div id='top-title-section'>
                    <div id='go-to-home'>
                        <span id='home'>Home</span>
                        <span id='left-arrow'><KeyboardArrowLeftRoundedIcon /></span>
                        <button id='go-back'><Link to={'/menu'} id='link'>Go To Home</Link></button>
                        <div />
                    </div>
                </div>
                <div id='wrapper-product-section'>
                    <h1 id='titlle'>MEN PANT</h1>
                    <p id='notice'>All image are download from Pinterest and Blackbox AI is use for generating Name,Des and Price for each Product.</p>
                    <div id='top-main-product-section'>
                        {
                            Pant.map((Product, index) => {
                                return (
                                    <div id='popular-product-box' onClick={() => handleproduct(Product)}>
                                        <div id='product-img-sec'>
                                            <img src={Product.image} alt="" id='product-image' />
                                        </div>
                                        <div id='product-detail'>
                                            <h1 id='product-name'>{Product.name}</h1>
                                            <p id='product-des'>{Product.des}</p>
                                            <p id='product-price'><CurrencyRupeeRoundedIcon fontSize='small' />{Product.price}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenPant
