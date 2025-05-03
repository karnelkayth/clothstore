import React from 'react'
import '../Style/Login.css'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useState } from 'react';
import { app } from '../firebase'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
    const [phone, SetPhone] = useState('')
    const [OTP, SetOTP] = useState('')
    const [ConfirmStaus, SetConfirm] = useState('')
    const navigate = useNavigate();
    // for each phone number otp is the last six digit for each number
    const phoneNumber1 = '+91 674 959 4030'
    const phoneNumber2 = '+91 98564 75644'
    const phoneNumber3 = '+91 98463 92084'
    const sendotp = (e) => {
        const auth = getAuth(app)
        const appVerifier = new RecaptchaVerifier(auth, 'captcha', { 'size': 'invisible' });
        e.preventDefault()
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then(Response => {
                window.confirmationResult = Response;
                console.log('this is the result', Response)
                alert('OTP is send to your phone number')
                SetConfirm(Response.confirm.name)
            }).catch(err => {
                console.log(err)
            })
    }

    const verifyotp = async (e) => {
        e.preventDefault()
        window.confirmationResult.confirm(OTP).then(async (result) => {
            // User signed in successfully.
            console.log(result)
            if (result.operationType === "signIn") {
                alert('success')
                navigate('/menu')
                const userphone = result.user.phoneNumber.replace('+91', '')
                // set user phone to localStorage
                window.localStorage.setItem('PhoneNumber', userphone)
                // send user phone number to backend 
                const response = await axios.post('https://clothstore-faov.onrender.com/signin', {userphone})
                console.log(response)
                if(response.data === 'user is created'){
                    const getdata = await axios.get('https://clothstore-faov.onrender.com/getuser', {
                        params: {Phone: userphone}
                    })
                    if(getdata.data === 'User Not Exist'){
                        alert('try again')
                    }else{
                        window.localStorage.setItem('userData', JSON.stringify(getdata.data))
                    }
                }else if(response.data === 'user is not created'){
                    alert('try again')
                }else{
                    window.localStorage.setItem('userData', JSON.stringify(response.data))
                    window.location.reload()
                }
            }
            else {
                alert('failed')
            }
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.log(error)
        });
    }


    return (
        <div className='top-login-sec'>
            <div className='login-wrapper-sec'>
                <div className='t-b-arr'>
                    <Link to={'/menu'}><h1 id='back'><KeyboardBackspaceRoundedIcon /></h1></Link>
                </div>
                <div id='m-des-sec'>
                    <div className='logo-img-name'>
                        <h1 id='logo'>ella</h1>
                        <h2 id='l-title'>SignIn</h2>
                    </div>
                    <div id='form-data-handle'>
                        <p id='des'>Enter mobile number to proceed</p>
                        <form>
                            {!ConfirmStaus ?
                                <div id='user-number'>
                                    <input type="Number" name="mobilenumber" id="m-input" placeholder='Enter Mobile Number' onChange={(e) => SetPhone('+91' + e.target.value)} />
                                    <button type='submit' id='con-log-btn' onClick={sendotp}>GET OTP</button>
                                </div>
                                :
                                <div id='user-otp'>
                                    <input type="Number" name="otp" id="otp-input" placeholder='Enter otp' onChange={(e) => { SetOTP(e.target.value) }} />
                                    <button type='submit' id='con-log-btn' onClick={verifyotp}>VERIFY OTP</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
                <div id='captcha'></div>
            </div>
            <p id='notice'>We have use firebase to SignIn user using testing phone number <br /> you can not send verification to your personal phone number</p>
        </div>
    )
}

export default SignIn
