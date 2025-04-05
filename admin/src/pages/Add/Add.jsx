import React, {  useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';



const Add = ({url}) => {

 
   
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler =(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data =>({
        ...data,[name]:value }))
  }

  const onSubmitHandler = async(event) =>{
        event.preventDefault();
        
        const formdata=new FormData();
        formdata.append("name",data.name);
        formdata.append("description",data.description);
        formdata.append("price",Number(data.price));
        formdata.append("category",data.category);
        formdata.append("image",image);
        

      const resp =await axios.post(`${url}/api/food/add`,formdata);
      
      if(resp.data.success){
            setData({
              name:"",
              description:"",
              price:"",
              category:"Salad"
      })
       setImage(false);
       toast.success(resp.data.message)
      
    }
    
   
    
      else{
         toast.error(resp.data.message);
      } 


  }
 


  return (
    <div className='add'>
    <form className='flex-col' onSubmit={onSubmitHandler}>
    <div className='add-img-upload flex-col'>
      
      <p>Upload Image</p>
      <label htmlFor='image'>
        <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>

      </label>
      <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden  />


     
    </div>
    <div className='add-product-name flex-col'>

     <p>Product Name</p>
     <input onChange={onChangeHandler} value={data.name}  type='text' name='name' placeholder='Type here' required/>

    </div>
    <div className='add-product-description flex-col'>

    <p>Product description</p>
    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here' required></textarea>

    </div>

      <div className='add-category-price'>

       <div className='add-category flex-col'>
             <p>Product category</p>
             <select onChange={onChangeHandler}name='category'>
       <option value='Salad'>Salad</option>
       <option value='Rolls'>Rolls</option>
       <option value='Deserts'>Deserts</option>
       <option value='Sandwich'>Sandwich</option>
       <option value='Cake'>Cake</option>
    <option value='Pure Veg'>Pure Veg</option>
       <option value='Pasta'>Pasta</option>
      <option value='Noodles'>Noodles</option>
             </select>
       </div>
       <div className='add-price flex-col'>
          <p>Product price</p>
          <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$20'/>
       </div>

      </div>
      <button type='submit' className='add-btn'>ADD</button>
      
    </form>
    
    </div>
  )
}

export default Add