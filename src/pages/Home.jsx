// client/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://agrobackend-7s2o.onrender.com/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Product Catalogue</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;