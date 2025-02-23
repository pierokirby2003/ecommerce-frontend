// src/components/LoyaltyPoints.jsx
import React, { useState } from 'react';

function LoyaltyPoints() {
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  const handleRedeemPointsInsecure = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/canjear-puntos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, points })
      });
      const data = await response.json();
      setMessage(`Inseguro: ${data.message}`);
    } catch (error) {
      console.error('Error canjeando puntos inseguro:', error);
      setMessage('Error al canjear puntos inseguro');
    }
  };

  const handleRedeemPointsSafe = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/canjear-puntos_safe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, points })
      });
      const data = await response.json();
      console.log(data)
      setMessage(`Seguro: ${data.error}`);
    } catch (error) {
      console.error('Error canjeando puntos seguro:', error);
      setMessage('Error al canjear puntos seguro');
    }
  };

  return (
    <div className="component-section">
      <h2>Canjear Puntos de Fidelidad</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        style={{ marginRight: '10px' }}
      />
      <div>
        <button onClick={handleRedeemPointsInsecure}>Canjear Puntos Inseguro</button>
        <button onClick={handleRedeemPointsSafe} style={{ marginLeft: '10px' }}>
          Canjear Puntos Seguro
        </button>
      </div>
      {message && <p>{message}</p>}
      <p style={{ fontStyle: 'italic', color: 'red' }}>
        Nota: El endpoint inseguro no valida saldo; el seguro verifica que el usuario tenga suficientes puntos.
      </p>
    </div>
  );
}

export default LoyaltyPoints;
