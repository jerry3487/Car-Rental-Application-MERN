import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Slider from '../components/Slider'
import { FaCalendar, FaGasPump } from 'react-icons/fa'
import { GiSpeedometer } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from 'react-icons/md'
import Footer from '../components/Footer'
import Service from '../components/Service'
import { useDispatch, useSelector } from 'react-redux'
import { getCarbyId } from '../features/car/carDetailsSlice'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addMonths } from 'date-fns'
import {
  createUserReservation,
  resetReservation,
} from '../features/reservation/reservationSlice'

const CarDetails = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const navigate = useNavigate()
  const params = useParams()
  const carId = params.id

  const dispatch = useDispatch()
  const carDetails = useSelector((state) => state.carDetails)
  const { loading, error, car } = carDetails

  const reservationUser = useSelector((state) => state.reservationUser)
  const { laoding: reservationLoading, success } = reservationUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  const [distance, setDistance] = useState('');

  const [loyaltyBonus, setLoyaltyBonus] = useState(0);




  useEffect(() => {
    if (!car || car._id !== carId || success) {
      dispatch(resetReservation())
      dispatch(getCarbyId(carId))
    }
  }, [dispatch, navigate, car, carId, success, userInfo])

  function dateDifference(dateOne, dateTwo) {
    const miliseconds = dateTwo.getTime() - dateOne.getTime()

    let TotalDays = Math.ceil(miliseconds / (1000 * 3600 * 24))
    return TotalDays
  }

  const reserveHandler = () => {
    const pricePerKM = car.pricePerDay / 10;
    let tax = 0; 
    const discount = 0.05;
    const loyaltyPointsDiscount = 0.02;
    //const perDayRentalCost = car.pricePerDay * 0.9;
   

    const distanceInKm = parseInt(distance, 10);


    const diff = dateDifference(startDate, endDate)
    if (diff <= 0) {
      alert('min 1 day difference')
    } else {
      if(car.brand==="Audi" || car.brand==="BMW" || car.brand==="Mercedes" || car.brand==="Porsche"){
        tax=0.4;
      }else if(car.brand==='VolksWagen'|| car.brand==="Kia" || car.brand==="Bolero"){
        tax=0.2;
      }else{
        tax=0.1;
      }

      if(distanceInKm >= 1000)
      {
        const additionalDistance = distanceInKm - 1000;
        const additionalCost = additionalDistance * 0.1 * car.pricePerDay;
        totalCost -= additionalCost;
      }
      
      
      
     const cost=(diff * car.pricePerDay +(diff * car.pricePerDay )* tax);
      const totalCost = Math.ceil(cost+pricePerKM  -( (cost*discount)) - ((cost*loyaltyPointsDiscount)));
      dispatch(
        createUserReservation({
          fromDate: startDate,
          toDate: endDate,
          carId,
          totalCost,
        })
      )
    }
  }

  const calculateRentalCost = () => {
    // Price per KM on type of car (replace with your actual logic)
    const pricePerKM = car.pricePerDay / 100; // Example: 1% of the price per day

    // Discount (replace with your actual logic)
    const discount = 0.05; // Example: 5%

    // Loyalty points discount (replace with your actual logic)
    const loyaltyPointsDiscount = 0.02; // Example: 2%

    // Per day rental cost if car has been rented more than a day (replace with your actual logic)
    const perDayRentalCost = car.pricePerDay * 0.9; // Example: 90% of the price per day

    // Calculate total rental cost
    const totalCost = pricePerKM  - discount - loyaltyPointsDiscount + perDayRentalCost;

    return totalCost;
  };



  console.log(car.images)
  if (loading) {
    return <Spinner />
  }
  


  const calculateLoyaltyBonus = (distance) => {
    if (distance >= 50) {
      const bonus = Math.floor(distance / 50);
      setLoyaltyBonus(bonus);
    } else {
      setLoyaltyBonus(0);
    }
  };

  const handleDistanceChange = (e) => {
    const { value } = e.target;
    setDistance(value);
    calculateLoyaltyBonus(parseInt(value, 10));
  };




  return (
    <>
      {error ? (
        <Alert variant="alert-error" message={error} />
      ) : (
        <>
          <Slider images={car.images} />
          <div className="w-full flex  flex-col md:flex-row md:justify-around mt-20 px-10">
            <div className="md:h-96 flex flex-col">
              <p className="text-4xl mb-5">
                {car.brand}, {car.name}
              </p>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col shadow w-32 h-32 justify-center items-center">
                  <FaCalendar className="text-5xl" />
                  <p className="text-2xl font-light">{car.yearModel}</p>
                  <p>Year Model</p>
                </div>
                <div className="flex flex-col shadow w-32 h-32 justify-center items-center">
                  <FaGasPump className="text-5xl" />
                  <p className="text-2xl font-light">{car.fuelType}</p>
                  <p>Fuel type</p>
                </div>
                <div className="flex flex-col shadow w-32 h-32 justify-center items-center">
                  <MdAirlineSeatReclineExtra className="text-5xl" />
                  <p className="text-2xl font-light">{car.seatCapacity}</p>
                  <p>Seats</p>
                </div>
                <div className="flex flex-col shadow w-32 h-32 justify-center items-center">
                <GiSpeedometer className="text-5xl"/>
                 
                  <p className="text-2xl font-light">{car.odometer}</p>
                  <p>ODO Meter</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-4xl text-accent mb-5">{car.pricePerDay} ₹</p>
              <label htmlFor="fromdate">From Date</label>
              <DatePicker
                className="bg-neutral rounded-md px-2"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                minDate={new Date()}
                endDate={endDate}
              />
              <label htmlFor="todate">To Date</label>
              <DatePicker
                className="bg-neutral rounded-md px-2"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={addMonths(startDate, 1)}
                showDisabledMonthNavigation
              />
 
 <label htmlFor="distance">Distance (in km)</label>
      <input
        className="bg-neutral rounded-md px-2"
        type="number"
        value={distance}
        onChange={handleDistanceChange}
        id="distance"
        placeholder="Enter distance in km"
      />
      <p>Loyalty Bonus: {loyaltyBonus} point(s)</p>
              {userInfo ? (
                <button
                  className={`btn btn-accent mt-5 ${
                    reservationLoading ? 'loading' : ''
                  }`}
                  onClick={() => reserveHandler()}
                  disabled={car.isReserved}
                >
                  {car.isReserved ? 'Reserved' : 'Reserve'}
                </button>
              ) : (
                <Link to="/sign-in" className="btn btn-accent mt-5">
                  Sign in for reservations
                </Link>
              )}
               {error ? (
        <Alert variant="alert-error" message={error} />
      ) : (
        <>
          <div className="flex flex-col">
            Offer Price:<p className="text-4xl text-accent mb-5">{calculateRentalCost()} ₹</p>
          </div>
          
        </>
      )}
            </div>
          </div>
        </>
      )}
      <Service />
      <Footer />
    </>
  )
}

export default CarDetails
