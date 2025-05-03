import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../Style/ProductDetail.css'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from 'react';
import axios from 'axios'

const ProductDetail = () => {
  const product = useLocation()
  const item = product.state
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }
  const [Productt, SetProduct] = useState(item)
  const [Size, SetSize] = useState('')
  const handleSizeChange = (size) => {
    SetSize(size);
    SetProduct((prevProduct) => ({
      ...prevProduct,
      selectsize: size, // Update the selectsize property
    }));
  };

  // send product detail to backend product route click on add btn
  const addtocart = async () => {
    const userphone = localStorage.getItem('PhoneNumber')
    if(userphone){
      if(Size === ''){
        alert('Plz Select Size')
      }else{
        const SendProduct = await axios.post('https://clothstore-faov.onrender.com/product', {userphone, Productt})
        if(SendProduct.data === 'Add Product'){
          const SendData = await axios.get('https://clothstore-faov.onrender.com/cart', {
            params: {userphone: userphone}
          })
          if(SendData){
            localStorage.setItem('userData', JSON.stringify(SendData.data));
            window.location.reload()  
          }
        }else if(SendProduct.data === 'Product Already Exist'){
          alert('Product Already Exist')
        }
      }
    }else{
      alert("SignIn First")
    }
  }

  return (
    <div id='top-productt-sec'>
      <div id='mini-product-w-s'>
        <div id='p-d-top-header'>
          <p id='go-home' onClick={()=>back()}>HOME</p>
          <span id='arrow'><KeyboardArrowRightRoundedIcon /></span>
          <p id='top-product-name'>{item.name}</p>
        </div>
        <div id='display-product-sec'>
          {/* product image section */}
          <div className='product-img-section'>
            {/* product main img */}
            <div className='product-big-img-sec'>
              <img src={item.image} alt="" id='product-i' />
            </div>
            {/* product more img section */}
            <div className='product-more-img-sec'>
              <div className='more-img-sec'>
                <img src={item.image} alt="" id='mini-product-img' />
              </div>
              <div className='more-img-sec'>
                <img src={item.image} alt="" id='mini-product-img' />
              </div>
              <div className='more-img-sec'>
                <img src={item.image} alt="" id='mini-product-img' />
              </div>
            </div>
          </div>
          {/* product detail */}
          <div className='product-warpper-detail-sec'>
            <div id='product-name-dec-price'>
              <h1 id='p-name'>{item.name}</h1>
              <p id='p-des'>{item.des}</p>
              <p id='p-price'><CurrencyRupeeRoundedIcon fontSize='extrasmall' />{item.price}</p>
            </div>
            <div id='size-chart'>
              <div className='size-title'>
                <p id='s-title'>Select Size</p>
              </div>
              <div id='all-size'>
                {
                  item.sizes.map((size,index) => {
                    return(
                      <div id='size-box'>
                          <input type="radio" name="size" id="input-field" value={size} onChange={()=>(handleSizeChange(size))}/>
                          <label for="input-field">{size}</label>
                      </div>
                    )
                  })
                }
              </div>

              {/* add to cart and favorite btn */}
              <div id='add-cart-favorite'>
                <button id='add-cart-btn' onClick={()=>addtocart()}>ADD</button>
                <button id='favourite-btn'><FavoriteRoundedIcon/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
