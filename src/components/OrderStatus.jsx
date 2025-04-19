// client/src/components/OrderStatus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://agrobackend-7s2o.onrender.com/api/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Buyer: {order.buyerName}</p>
          <p>Address: {order.deliveryAddress}</p>
          <ul>
            {order.OrderItems.map(item => (
              <li key={item.id}>
                {item.Product.name} - {item.quantity} units
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;