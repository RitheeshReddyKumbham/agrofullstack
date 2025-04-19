// client/src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>${product.price}/unit</p>
  </div>
);

export default ProductCard;