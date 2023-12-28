// import React, { useState } from 'react';
//  import './payment.css';

// export default function PayNow() {
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');

 
//   const handlePayment = (e) => {
//     e.preventDefault();
//     // Add your payment logic here
//     console.log('Payment submitted:', { cardNumber, expiryDate, cvv });
//     alert("Payment Successfull")
    
//   };

//   return (
//     <div className='pay'>
//     <div className="payment-container">
//       <h2>Payment Details</h2>
//       <form onSubmit={handlePayment}>
//         <div className="form-group">
//           <label htmlFor="cardNumber">Card Number:</label>
//           <input
//             type="text"
//             id="cardNumber"
//             name="cardNumber"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             placeholder="Enter card number"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="expiryDate">Expiry Date:</label>
//           <input
//             type="text"
//             id="expiryDate"
//             name="expiryDate"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             placeholder="MM/YY"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="cvv">CVV:</label>
//           <input
//             type="text"
//             id="cvv"
//             name="cvv"
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             placeholder="Enter CVV"
//             required
//           />
//         </div>
//         <button type="submit"  className="btn btn-primary">Pay Now</button>
//       </form>
//     </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import axios from 'axios';

// function Payment() {
//   const [odoReading, setOdoReading] = useState('');
//   const [rentedDate, setRentedDate] = useState('');
//   const [isRented, setIsRented] = useState(false);

//   const handleRentalPickup = async () => {
//     try {
//       // Assuming you have an API endpoint to mark the car as rented
//       const response = await axios.put('/api/cars/mark-as-rented', {
//         odoReading,
//         rentedDate: new Date().toISOString(), // or any date format you prefer
//       });

//       if (response.data.success) {
//         setIsRented(true);
//       } else {
//         alert('Failed to mark the car as rented.');
//       }
//     } catch (error) {
//       console.error('Error marking car as rented:', error);
//       alert('An error occurred while marking the car as rented.');
//     }
//   };

//   return (
//     <div>
//       <h1>Rental Pickup</h1>
      
//       {!isRented ? (
//         <div>
//           <label>
//             ODO Meter Reading:
//             <input
//               type="number"
//               value={odoReading}
//               onChange={(e) => setOdoReading(e.target.value)}
//             />
//           </label>

//           <label>
//             Date of Rental:
//             <input
//               type="date"
//               value={rentedDate}
//               onChange={(e) => setRentedDate(e.target.value)}
//             />
//           </label>

//           <button onClick={handleRentalPickup}>Mark as Rented</button>
//         </div>
//       ) : (
//         <p>Car has been marked as rented.</p>
//       )}
//     </div>
//   );
// }

// export default Payment;


// import React, { useState } from 'react';

// function Payment() {
//   const [loyaltyPoints, setLoyaltyPoints] = useState(0);
//   const [ridesTaken, setRidesTaken] = useState(0);
//   const [totalDiscount, setTotalDiscount] = useState(0);

//   const takeRide = () => {
//     setRidesTaken(ridesTaken + 1);
//     setLoyaltyPoints(loyaltyPoints + 10); // Assuming 10 points per ride for simplicity

//     if (ridesTaken >= 2 && loyaltyPoints >= 25) {
//       setTotalDiscount(totalDiscount + 10); // Applying a discount of 10 units (e.g., 10%)
//       setLoyaltyPoints(loyaltyPoints - 25); // Deducting the used loyalty points
//       setRidesTaken(0); // Resetting rides taken after applying discount
//     }
//   };

//   return (
//     <div>
//       <h1>Loyalty Discount Program</h1>
//       <p>Loyalty Points: {loyaltyPoints}</p>
//       <p>Rides Taken: {ridesTaken}</p>
//       <p>Total Discount: {totalDiscount}%</p>

//       <button onClick={takeRide}>Take a Ride</button>
//     </div>
//   );
// }

// export default Payment;
// import React, { useState } from 'react';

// function Payment() {
//   const [carType, setCarType] = useState('basic');
//   const [basePrice, setBasePrice] = useState(0);
//   const [taxDetails, setTaxDetails] = useState(null);

//   const calculateTax = () => {
//     let taxRate;

//     switch (carType) {
//       case 'basic':
//         taxRate = 0.1; // 10% tax for basic cars
//         break;
//       case 'mid-range':
//         taxRate = 0.2; // 20% tax for mid-range cars
//         break;
//       case 'high-end':
//       case 'luxury':
//         taxRate = 0.4; // 40% tax for high-end and luxury cars
//         break;
//       default:
//         taxRate = 0; // No tax for unknown car types
//     }

//     const taxAmount = basePrice * taxRate;
//     const totalPrice = basePrice + taxAmount;

//     setTaxDetails({
//       taxRate: (taxRate * 100).toFixed(2), // Convert tax rate to percentage for display
//       taxAmount: taxAmount.toFixed(2),
//       totalPrice: totalPrice.toFixed(2),
//     });
//   };

//   return (
//     <div>
//       <h1>Car Tax Calculator</h1>
      
//       <label>
//         Car Type:
//         <select value={carType} onChange={(e) => setCarType(e.target.value)}>
//           <option value="basic">Basic</option>
//           <option value="mid-range">Mid-Range</option>
//           <option value="high-end">High-End</option>
//           <option value="luxury">Luxury</option>
//         </select>
//       </label>

//       <br />

//       <label>
//         Base Price: $
//         <input
//           type="number"
//           value={basePrice}
//           onChange={(e) => setBasePrice(parseFloat(e.target.value))}
//         />
//       </label>

//       <br />

//       <button onClick={calculateTax}>Calculate Tax</button>

//       {taxDetails && (
//         <div>
//           <h2>Tax Details:</h2>
//           <p>Tax Rate: {taxDetails.taxRate}%</p>
//           <p>Tax Amount: ${taxDetails.taxAmount}</p>
//           <p>Total Price: ${taxDetails.totalPrice}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Payment;

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
