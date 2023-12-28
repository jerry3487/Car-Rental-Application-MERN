


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from './Alert';
import {
  reservationToPaid,
  resetPaidReservation,
} from '../features/reservation/reservationToPaidSlice';
import {
  getReservation,
  resetDetailsReservation,
} from '../features/reservation/reservationDetailsSlice';
import Spinner from './Spinner';

const NormalPayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const reservationId = params.id;

  const reservationPaid = useSelector((state) => state.reservationPaid);
  const { success: successPaid } = reservationPaid;

  const reservationDetails = useSelector((state) => state.reservationDetails);
  const { reservation, loading: loadingDetails } = reservationDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/sign-in');
    }
    if (!reservation || reservation._id !== reservationId || successPaid) {
      dispatch(resetPaidReservation());
      dispatch(resetDetailsReservation());
      dispatch(getReservation(reservationId));
    } else {
      if (paymentSuccess) {
        // Dispatch reservation to paid
        dispatch(reservationToPaid(reservationId));
        setLoading(false);
      }
    }
  }, [dispatch, reservationId, paymentSuccess, reservation, navigate, userInfo, successPaid]);

  const handlePay = () => {
    if (!cardNumber || !expirationDate || !cvv) {
      // Validate card details
      alert('Please fill in all card details.');
      return;
    } if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    // Expiration date validation (assuming MM/YY format)
    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear().toString().substr(-2); // Getting last 2 digits of the current year
    if (!expirationDate || !/^\d{2}\/\d{2}$/.test(expirationDate) || year < currentYear || month > 12) {
      alert('Please enter a valid expiration date in MM/YY format.');
      return;
    }

    // CVV validation
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }

    setLoading(true);
    // Simulating payment process with a delay
    setTimeout(() => {
      setPaymentSuccess(true);
      setLoading(false);
    }, 2000);
  };

  //   setLoading(true);
  //   // Simulating payment process with a delay
  //   setTimeout(() => {
  //     setPaymentSuccess(true);
  //     setLoading(false);
  //   }, 2000);
  // };

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <>
      {loadingDetails ? (
        <Spinner />
      ) : reservation && !reservation.isPaid ? (
        <div className="max-w-md w-full mx-auto mt-20">
          <div>
            <label style={{ marginBottom: '10px', display: 'block' }}>
              Card Number:
              <input
                type="text"
                className="bg-neutral rounded-md px-2"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </label>
          </div>
          <div>
            <label style={{ marginBottom: '10px', display: 'block' }}>
              Expiration Date:
              <input
                type="text"
                value={expirationDate}
                className="bg-neutral rounded-md px-2"
                onChange={(e) => setExpirationDate(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </label>
          </div>
          <div>
            <label style={{ marginBottom: '10px', display: 'block' }}>
              CVV:
              <input
                type="text"
                value={cvv}
                className="bg-neutral rounded-md px-2"
                onChange={(e) => setCVV(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </label>
          </div>
          <button 
            className="btn w-full btn-success" 
            onClick={handlePay} 
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '10px', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              borderRadius: '4px', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            Pay
          </button>
        </div>
      ) : (
        <div className="max-w-md w-full mx-auto mt-20">
          <Alert variant="alert-success" message="Successful payment" />
        </div>
      )}
    </>
  );
};

export default NormalPayment;