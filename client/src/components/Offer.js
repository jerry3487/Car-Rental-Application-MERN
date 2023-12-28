// import React from 'react'

// const Offer = () => {
//   return (
//     <div>
//         <table border="1">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Catageory</th>
//           <th>Offer</th>
//         </tr>
//       </thead>
//       <tbody>
        
//           <tr >
//             <td>1</td>
//             <td>Loyalty points</td>
//             <td>For Every 50kms 1 Loyalty Point</td>
//           </tr>
//           <tr >
//             <td>2</td>
//             <td>25 Loyalty points</td>
//             <td>2 consecutive rides + Extra Discount</td>
//           </tr>
//           <tr >
//             <td>3</td>
//             <td>Discount</td>
//             <td>10% discount on above 1000Kms</td>
//           </tr>
//           <tr >
//             <td>4</td>
//             <td>Taxes</td>
//             <td>Based on cars 10% to 40% Tax applied</td>
//           </tr>
        
//       </tbody>
//     </table>
      
//     </div>
//   )
// }

// export default Offer



import React from 'react';

const Offer = () => {
  return (
    <div>
      <table style={{ border: '1px solid white', width: '100%' ,margin:'60px 150px 10px 10px'}}>
        <thead>
          <tr>
            <th style={{ border: '1px solid white', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Offer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid white', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>Loyalty points</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>For Every 50kms 1 Loyalty Point</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid white', padding: '8px' }}>2</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>25 Loyalty points</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>2 consecutive rides + Extra Discount</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid white', padding: '8px' }}>3</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>Discount</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>10% discount on above 1000Kms</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid white', padding: '8px' }}>4</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>Taxes</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>Based on cars 10% to 40% Tax applied</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Offer;
