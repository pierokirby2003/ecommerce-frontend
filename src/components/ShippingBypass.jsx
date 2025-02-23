// src/components/ShippingBypass.jsx
import React, { useState } from 'react';

function ShippingBypass() {
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirmShippingInsecure = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/confirmar-envio/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      const data = await response.json();
      setMessage(`Inseguro: ${data.message}`);
    } catch (error) {
      console.error('Error confirmando envío inseguro:', error);
      setMessage('Error al confirmar envío inseguro');
    }
  };

  const handleConfirmShippingSafe = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/confirmar-envio_safe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      const data = await response.json();
      console.log(data)
      setMessage(`Seguro: ${data.error}`);
    } catch (error) {
      console.error('Error confirmando envío seguro:', error);
      setMessage('Error al confirmar envío seguro');
    }
  };

  return (
    <div className="component-section">
      <h2>Confirmación de Envío</h2>
      <input
        type="text"
        placeholder="ID de Orden"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <div>
        <button onClick={handleConfirmShippingInsecure}>Confirmar Envío Inseguro</button>
        <button onClick={handleConfirmShippingSafe} style={{ marginLeft: '10px' }}>
          Confirmar Envío Seguro
        </button>
      </div>
      {message && <p>{message}</p>}
      <p style={{ fontStyle: 'italic', color: 'red' }}>
        Nota: El endpoint inseguro confirma envío sin validar el pago; el seguro verifica el estado.
      </p>
    </div>
  );
}

export default ShippingBypass;
