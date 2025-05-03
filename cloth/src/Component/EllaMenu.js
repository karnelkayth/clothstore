import React from 'react'
import '../Style/EllaMenu.css'
import menfashion from '../Image/menfashion.jpg'
import menpant from '../Image/menbotfashion.jpg'
import womenfashion from '../Image/womenfashion.jpg'
import womenpant from '../Image/womenpant.jpg'
import ethnic from '../Image/ethnic.webp'
import tshirt from '../Image/tshirtboth.jpg'
import shorts from '../Image/shorts.jpg'
import brand from '../Image/brand.jpg'
import menstyle from '../Image/menstyle.jpg'
import newarrival from '../Image/newarrival.avif'
import { Link } from 'react-router-dom'
import Header from './Header'
import PopularProduct from './PopularProduct'

const EllaMenu = () => {
    return (
        <div>
            <Header />
            <div className='top-menu'>
                <div className='wrapper-menu-section'>
                    <div id='top-title-section'>
                        <button id='see-all-btn'>See All</button>
                    </div>
                    <div id='all-product-category-sec'>
                        <div id='main-product-category'>
                            {/* product category box */}
                            <Link to={'/menshirt'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={menfashion} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Men Fashion</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/menpant'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={menpant} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Men Fashion</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/womenshirt'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={womenfashion} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Women Fashion</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/womenpant'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={womenpant} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Women Pant</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/ethnic'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={ethnic} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Ethnic Fashion</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/tshirt'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={tshirt} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>tShirt</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/short'} id='link'> 
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={shorts} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Short</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/brand'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={brand} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>Brand</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/menstyle'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={menstyle} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>MenStyle</h2>
                                    </div>
                                </div>
                            </Link>
                            {/* product category box */}
                            <Link to={'/newarrival'} id='link'>
                                <div id='product-cat-box'>
                                    <div id='cat-img-sec'>
                                        <img src={newarrival} alt="" id='product-cat-img' />
                                    </div>
                                    <div id='product-cat-title'>
                                        <h2 id='product-cat-name'>New Arrival</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <PopularProduct />
        </div>
    )
}

export default EllaMenu
