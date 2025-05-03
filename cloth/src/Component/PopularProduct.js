import React from 'react'
import '../Style/PopularProduct.css'
import Populars from '../API/Popular'
import { useState } from 'react'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

const PopularProduct = () => {
    const [PopularP, SetPopularP] = useState(Populars)

    return (
        <div id='top-popular-product-sec'>
            <div id='wrapper-popular-sec'>
                <h2 id='title'>Popular Product</h2>
                <div id='all-popular-product'>
                    {/* product box */}
                    {
                        PopularP.map((Product, Index) => {
                            return(
                                <div id='popular-product-box'>
                                    <div id='product-img-sec'>
                                        <img src={Product.image} alt="" id='product-image'/>
                                    </div>
                                    <div id='product-detail'>
                                        <h1 id='product-name'>{Product.name}</h1>
                                        <p id='product-des'>{Product.des}</p>
                                        <p id='product-price'><CurrencyRupeeRoundedIcon fontSize='small'/>{Product.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PopularProduct
