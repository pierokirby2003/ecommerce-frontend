// src/components/CouponComponent.jsx
import React, { useState } from 'react';

function CouponComponent() {
  const [coupon, setCoupon] = useState('DESCUENTO10');
  const [message, setMessage] = useState('');

  const handleApplyCouponInsecure = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/aplicar-cupon/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupon })
      });
      const data = await response.json();
      console.log(data)
      setMessage(`Inseguro: ${data.message}`);
    } catch (error) {
      console.error('Error aplicando cupón inseguro:', error);
      setMessage('Error al aplicar cupón inseguro');
    }
  };

  const handleApplyCouponSafe = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/aplicar-cupon_safe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupon })
      });
      const data = await response.json();
      console.log(data)
      setMessage(`Seguro: ${data.error}`);
    } catch (error) {
      console.error('Error aplicando cupón seguro:', error);
      setMessage('Error al aplicar cupón seguro');
    }
  };

  return (
    <div className="component-section">
      <h2>Aplicar Cupón</h2>
      <input
        type="text"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <div>
        <button onClick={handleApplyCouponInsecure}>Aplicar Cupón Inseguro</button>
        <button onClick={handleApplyCouponSafe} style={{ marginLeft: '10px' }}>
          Aplicar Cupón Seguro
        </button>
      </div>
      {message && <p>{message}</p>}
      <p style={{ fontStyle: 'italic', color: 'red' }}>
        Nota: El endpoint inseguro ignora validaciones; el seguro realiza comprobaciones.
      </p>
    </div>
  );
}

export default CouponComponent;
