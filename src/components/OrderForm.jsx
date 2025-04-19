// client/src/components/OrderForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    buyerName: '',
    contactInfo: '',
    deliveryAddress: '',
    items: [{ productId: '', quantity: '' }],
  });

  useEffect(() => {
    axios.get('https://agrobackend-7s2o.onrender.com/api/products').then(res => setProducts(res.data));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://agrobackend-7s2o.onrender.com/api/orders', formData);
    alert('Order placed successfully!');
    setFormData({
      buyerName: '',
      contactInfo: '',
      deliveryAddress: '',
      items: [{ productId: '', quantity: '' }],
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: '', quantity: '' }],
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.buyerName}
        onChange={e => setFormData({ ...formData, buyerName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={formData.contactInfo}
        onChange={e => setFormData({ ...formData, contactInfo: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Delivery Address"
        value={formData.deliveryAddress}
        onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
        required
      />
      {formData.items.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px' }}>
          <select
            value={item.productId}
            onChange={e => handleItemChange(index, 'productId', e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={e => handleItemChange(index, 'quantity', e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add Item
      </button>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;