import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
        <div className='footer-content-left'>
<div className='logo'>

        <img  src={assets.fi_logo} alt=''/> </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        <div className='footer-social-icons'>

        <img src={assets.facebook_icon} alt=''/>
        <img src={assets.twitter_icon} alt=''/>
        <img src={assets.linkedin_icon} alt=''/>

        </div>
          

        </div>
     <div className='footer-content-center'>
       <h2>COMPANY</h2>
       <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
       </ul>




        </div>
        <div className='footer-content-right'>

        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+91 6397991951</li>
            <li>navneetrajput@gmail.com</li>
           
        </ul>


        

        </div>
    </div>
       
      <hr/>
      <p className='footer-copyright'>
        Copyright 2025 © Twiggy.com -All Right Reserved.
      </p>

    </div>
  )
}

export default Footer