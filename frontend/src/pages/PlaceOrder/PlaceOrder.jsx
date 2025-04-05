import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate =useNavigate()
  
   const { getTotalCartAmount, token, food_list, cartItem, url, userId } = useContext(StoreContext); 


   const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  

   const onChangeHander = (event) => {
         const name = event.target.name;
         const value = event.target.value;
         setData(data => ({
          ...data,[name]:value
         }))
   }

   const placeOrder = async (event) => {
    event.preventDefault();

    if (!userId) {
        alert("User not authenticated. Please log in.");
        return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
        if (cartItem[item._id] > 0) {
            let itemInfo = { ...item, quantity: cartItem[item._id] };
            orderItems.push(itemInfo);
        }
    });

    let orderData = {
        userId,  // Ensure userId is sent
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
    };

    try {
        let response = await axios.post(url + "/api/order/place", orderData, {
            headers: { token },
        });

        if (response.data.success) {
            window.location.replace(response.data.session_url);
        } else {
            alert("Error placing order");
        }
    } catch (error) {
        console.error("Order placement error:", error);
        alert("Failed to place order. Try again.");
    }
};


   useEffect(()=>{  
     if(!token){
       navigate("/cart")
     }
     else if(getTotalCartAmount()===0){
       navigate("/cart")
     }
   },[token])
      
   

  return (
    <form onSubmit={placeOrder} className='place-order'>
 <div className='place-order-left'>
    <p className='title'>Delivery Information</p>
    <div className='multi-fields'>
      <input 
      name='firstName'
       onChange={onChangeHander}
        type='text'
         placeholder='First Name'
          value={data.firstName}
         />
      <input 
      name='lastName'
      type='text'
       placeholder='Last Name'
        onChange={onChangeHander}
        value={data.lastName}
       />
    </div>
    <input 
    name='email'
    onChange={onChangeHander}
    value={data.email}

    type='text' placeholder='Email address'/>
    <input
     name='street'
     value={data.street}
     onChange={onChangeHander}
     type='text' 
     placeholder='Street'

     />
    <div className='multi-fields'>
      <input required name='city' onChange={onChangeHander} value={data.city} type='text' placeholder='City'/>
       <input required name='state' onChange={onChangeHander} value={data.state}
      type='text' placeholder='State'/>
    </div>
    <div required className='multi-fields'>
      <input required name='zipcode' onChange={onChangeHander} value={data.zipcode}
       type='text' placeholder='Zip Code'/>

      <input required 
       name='country' onChange={onChangeHander} value={data.country}
      type='text' placeholder='Country'/>
    </div>
    <input required
     name='phone' onChange={onChangeHander} value={data.phone}
    type='text' placeholder='Phone'/>


    </div>

    <div className='place-order-right'>
    <div className='cart-total'>
              <h2>Cart Total</h2>
              <div>
    <div className='cart-total-details'>
            <p>Subtotal</p>
            <b>${getTotalCartAmount()}</b>
     </div>
     <hr/>
        <div className='cart-total-details'>
        <p>Delivery Fee</p>
        <b>${getTotalCartAmount()===0?0:2}</b>
         </div>
         <hr/>
     <div className='cart-total-details'>

     <p>Total</p>
     <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>

        </div>
         
              </div>
             <button type='submit'>PROCEED TO PAYMENT</button>

            </div>


    </div>
    </form>
  )
}

export default PlaceOrder