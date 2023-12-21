import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import banner from '../assets/images/homephoto.jpg';

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
          Discover joy and fulfillment in the journey. Embrace unique experiences and cherish each moment. Find solace in shared connections and the beauty of simplicity.
          </p>
          {/* Link to the Register Page */}
          <Link to="/sign-up">
            <button className="btn btn-primary opacity-50">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
