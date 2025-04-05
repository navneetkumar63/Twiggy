import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";
//import { log } from "console";

const Order = ({ url }) => {
  const [order, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success && response.data.data) {
        setOrder(response.data.data);
        console.log(response.data.data);
      } else {
        setOrder([]); // Ensure reset on error
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      setOrder([]);
      toast.error("Failed to fetch orders");
    }
  };
  const stausHandler = async(event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
       await fetchAllOrders();

    }
     
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.length > 0 ? (
          order.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items &&
                    order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} x {item.quantity}
                        {idx !== order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </p>

                {order.address && (
                  <>
                    <p className="order-item-name">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <div className="order-item-address">
                      <p>{order.address.street},</p>
                      <p>
                        {order.address.city}, {order.address.state},{" "}
                        {order.address.country}, {order.address.zipcode}
                      </p>
                    </div>
                    <p className="order-item-phone">{order.address.phone}</p>
                  </>
                )}
              </div>

              <p>Items: {order.items?.length || 0}</p>
              <p>${order.amount}</p>

              <select onChange={(event)=>stausHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
