// src/App.jsx
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CouponComponent from './components/CouponComponent';
import ShippingBypass from './components/ShippingBypass';
import LoyaltyPoints from './components/LoyaltyPoints';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const updateCartItem = (index, field, value) => {
    const updatedCart = [...cart];
    updatedCart[index][field] = value;
    setCart(updatedCart);
  };

  const removeCartItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ecommerce Simple con Fake Store API y Django Backend</h1>
      <ProductList addToCart={addToCart} />
      <hr />
      <ShoppingCart
        cart={cart}
        updateCartItem={updateCartItem}
        removeCartItem={removeCartItem}
      />
      <hr />
      <CouponComponent />
      <hr />
      <ShippingBypass />
      <hr />
      <LoyaltyPoints />
    </div>
  );
}

export default App;
