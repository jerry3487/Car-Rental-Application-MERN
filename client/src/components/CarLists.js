import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../features/car/carSlice';
import CarItem from './CarItem';
import Spinner from './Spinner';
import Alert from './Alert';
import SearchBar from './Search';

const CarLists = () => {
  const dispatch = useDispatch();
  const carsList = useSelector((state) => state.carsList);
  const { cars, loading, error } = carsList;
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    dispatch(getCars({}));
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    const filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap gap-5 justify-center my-20 px-5">
        {error ? (
          <Alert variant="alert-error" message={error} />
        ) : (
          <>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarItem car={car} key={car._id} />
              ))
            ) : (
              cars.map((car) => (
                <CarItem car={car} key={car._id} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarLists;