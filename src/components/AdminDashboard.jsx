// client/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    axios.get('https://agrobackend-7s2o.onrender.com/api/products').then(res => setProducts(res.data));
    axios.get('https://agrobackend-7s2o.onrender.com/api/orders').then(res => setOrders(res.data));
  }, []);

  const handleAddProduct = async e => {
    e.preventDefault();
    await axios.post('https://agrobackend-7s2o.onrender.com/api/products', newProduct);
    setNewProduct({ name: '', price: '' });
    window.location.reload();
  };

  const handleUpdateStatus = async (orderId, status) => {
    await axios.put(`https://agrobackend-7s2o.onrender.com/api/orders/${orderId}`, { status });
    window.location.reload();
  };

  const handleDeleteProduct = async id => {
    await axios.delete(`https://agrobackend-7s2o.onrender.com/api/products/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <div className="admin-section">
        <h2>Add Product</h2>
        <form className="form" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
      <div className="admin-section">
        <h2>Products</h2>
        {products.map(product => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="admin-section">
        <h2>Orders</h2>
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <p>Order #{order.id} - {order.buyerName}</p>
            <p>Status: {order.status}</p>
            <p>Address: {order.deliveryAddress}</p>
            <ul>
              {order.OrderItems.map(item => (
                <li key={item.id}>
                  {item.Product.name} - {item.quantity} units
                </li>
              ))}
            </ul>
            <select
              value={order.status}
              onChange={e => handleUpdateStatus(order.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;