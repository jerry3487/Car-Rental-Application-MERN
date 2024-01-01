import React, { useState } from 'react';

const Payment = () => {
  const [distanceRented, setDistanceRented] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const calculateLoyaltyPoints = () => {
    const points = Math.floor(distanceRented / 50);
    setLoyaltyPoints(points);
  };

  return (
    <div>
      <h1>Loyalty Bonus Calculator</h1>
      
      <label>
        Distance Rented (in KM):
        <input
          type="number"
          value={distanceRented}
          onChange={(e) => setDistanceRented(parseFloat(e.target.value))}
        />
      </label>

      <br />

      <button onClick={calculateLoyaltyPoints}>Calculate Loyalty Points</button>

      {loyaltyPoints > 0 && (
        <p>You have earned {loyaltyPoints} loyalty point(s).</p>
      )}
    </div>
  );
};

export default Payment;
