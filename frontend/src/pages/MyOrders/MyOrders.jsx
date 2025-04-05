import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.data) {
        setData(response.data.data);
      } else {
        setData([]); // Ensure we reset data if the response is unexpected
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]); // Handle API failure gracefully
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Order Icon" />
              <p>
                {order.items &&
                  order.items.map((item, idx) => {
                    return `${item.name} x ${item.quantity}${
                      idx === order.items.length - 1 ? "" : ", "
                    }`;
                  })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items?.length || 0}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status || "Pending"}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
       
      </div>
    </div>
  );
};

export default MyOrders;
