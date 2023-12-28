


// import React from 'react'
// import { format, parseISO } from 'date-fns'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import {deleteCarById} from '../features/car/carSlice'
// import { useDispatch, useSelector } from 'react-redux'
// const ReservationCard = ({ reservation }) => {
//   const dispatch = useDispatch()
//   const carsList = useSelector((state) => state.carsList)
//   const { cars, success } = carsList
//   const handleCancel = async () => {
//     try {
//       // Make an API call to cancel the reservation
//      const response = await axios.put(`/api/reservation/${reservation._id}/cancel`);
      
   
//       if (response.data.success) {
//         // Handle the successful cancellation
//         alert('Reservation cancelled successfully!');
//         // You can also update the local state or fetch updated data here
//       } else {
//         // Handle any errors or display relevant messages
//         alert('Failed to cancel reservation. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error cancelling reservation:', error);
//       alert('An error occurred while cancelling the reservation.');
//     }}
//     // const clickHandler = (id) => {
//     //   if (window.confirm('Are you sure you want to delete?')) {
//     //     dispatch(deleteCarById(id))
//     //   }
//     // }
//   function formatDate(date) {
//     return format(parseISO(date), 'dd-MM-yyyy')
//   }
//   return (
//     <div className="card card-compact max-w-sm w-full bg-base-100 shadow-xl image-full z-0">
//       <figure>
//         <img src={reservation.reservationItem.image} alt="carimg" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{reservation.reservationItem.brand}</h2>
//         <p>
//           The car is reserved from {formatDate(reservation.fromDate)} to{' '}
//           {formatDate(reservation.toDate)} totalCost {reservation.totalCost} €
//         </p>
//         <div>
//           {reservation.isApproved ? (
//             <button className="btn btn-xs btn-success btn-outline">
//               confirmed
//             </button>
//           ) : (
//             <button className="btn btn-xs btn-warning btn-outline">
//               not confirmed
//             </button>
//           )}
//           {reservation.isPaid && (
//             <button className="btn btn-xs btn-success btn-outline">paid</button>
//           )}
//         </div>
//         <div className="card-actions justify-end">
//           {/* {reservation.isApproved && !reservation.isPaid && (
//             <Link
//               className="btn  btn-secondary btn-sm md:btn-md"
//               to={`/reservation/payment/${reservation._id}`}
//             >
//               Pay
//             </Link>
//           )} */}
//           {reservation.isApproved && !reservation.isPaid && (
//             <Link
//               className="btn  btn-secondary btn-sm md:btn-md"
//               to={'/payment'}
//             >
//               Pay
//             </Link>
//           )}
//         </div>
//         {/* <button
//                     className="btn btn-outline btn-xs btn-error"
//                     onClick={() => clickHandler(cars._id)}
//                   >
//                     Delete
//                   </button> */}
//       {/* {reservation.isApproved && !reservation.isPaid && ( */}
//             <Link
//               className="btn  btn-secondary btn-sm md:btn-md"
//               onClick={handleCancel}
//               //to={'/'}
//             >
//               cancel
//             </Link>
//         {/* //  )} */}
//       </div>
//     </div>
//   )
// }

// export default ReservationCard


import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {deleteCarById} from '../features/car/carSlice'
import { useDispatch, useSelector } from 'react-redux'
const ReservationCard = ({ reservation }) => {
  const dispatch = useDispatch()
  const carsList = useSelector((state) => state.carsList)
  const { cars, success } = carsList
  const [isActive, setIsActive] = useState(true);
 
 

  
    const clickHandler = (id) => {
      setIsActive(!isActive);
      if (window.confirm('Are you sure you want to delete?')) {
        dispatch(deleteCarById(id))
      }
    }
  function formatDate(date) {
    return format(parseISO(date), 'dd-MM-yyyy')
  }
  return (
    <div className="card card-compact max-w-sm w-full bg-base-100 shadow-xl image-full z-0">
      <figure>
        <img src={reservation.reservationItem.image} alt="carimg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{reservation.reservationItem.brand}</h2>
        <p>
          The car is reserved from {formatDate(reservation.fromDate)} to{' '}
          {formatDate(reservation.toDate)} totalCost {reservation.totalCost} ₹
        </p>
        <div>
          {reservation.isApproved ? (
            <button className="btn btn-xs btn-success btn-outline">
              confirmed
            </button>
          ) : (
            <button className="btn btn-xs btn-warning btn-outline">
              not confirmed
            </button>
          )}
          {reservation.isPaid && (
            <button className="btn btn-xs btn-success btn-outline">paid</button>
          )}
        </div>
        <div className="card-actions justify-end">
          {reservation.isApproved && !reservation.isPaid && (
            <Link
              className="btn  btn-secondary btn-sm md:btn-md"
              to={`/reservation/payment/${reservation._id}`}
            >
              Pay
            </Link>
          )}
          {/* {reservation.isApproved && !reservation.isPaid && (
            <Link
              className="btn  btn-secondary btn-sm md:btn-md"
              to={'/payment'}
            >
              Pay
            </Link>
          )} */}
        </div>
        
        <button onClick={clickHandler} className="btn btn-outline btn-xs btn-error">
        {isActive ? 'Cancel Booking' : 'Cancelled'}
      </button>
      <p>
      status:  {isActive ? 'Booking confirmed.' : 'Booking Cancelled.'}
      </p>
      </div>
    </div>
  )
}

export default ReservationCard
