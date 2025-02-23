// src/components/ShoppingCart.jsx
import React, { useState } from 'react';

function ShoppingCart({ cart, updateCartItem, removeCartItem }) {
  const [message, setMessage] = useState('');

  // Endpoint inseguro: envía directamente el array de cart
  const handleOrderSubmitInsecure = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/order/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
      });
      const data = await response.json();
      setMessage(`Inseguro: ${data.message} - Orden ID: ${data.order_id} - Total: ${data.total_price}`);
    } catch (error) {
      console.error('Error enviando la orden insegura:', error);
      setMessage('Error al enviar la orden insegura');
    }
  };

  // Endpoint seguro: envía un objeto con "items" que contiene el cart
  const handleOrderSubmitSafe = async () => {
    try {
      const payload = { items: cart };
      const response = await fetch('http://127.0.0.1:8000/api/order_safe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setMessage(`Seguro: ${data.error} `);
      console.log(data)
    } catch (error) {
      console.error('Error enviando la orden segura:', error);
      setMessage('Error al enviar la orden segura');
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 && <p>No hay productos en el carrito</p>}
      {cart.map((item, index) => (
        <div key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <h3>{item.title}</h3>
          <p>
            Precio: $
            <input
              type="number"
              value={item.price}
              onChange={(e) => updateCartItem(index, 'price', Number(e.target.value))}
              style={{ width: '80px' }}
            />
          </p>
          <p>
            Cantidad:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateCartItem(index, 'quantity', Number(e.target.value))}
              style={{ width: '50px', marginLeft: '10px' }}
            />
          </p>
          <button onClick={() => removeCartItem(index)}>Eliminar</button>
        </div>
      ))}
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleOrderSubmitInsecure}>Enviar Orden Insegura</button>
        <button onClick={handleOrderSubmitSafe} style={{ marginLeft: '10px' }}>
          Enviar Orden Segura
        </button>
      </div>
      {message && <p>{message}</p>}
      <p style={{ fontStyle: 'italic', color: 'red' }}>
        Nota: La orden insegura confía en los datos del cliente; la segura recalcula precios y valida stock.
      </p>
    </div>
  );
}

export default ShoppingCart;
