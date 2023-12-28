

import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Service from '../components/Service';
import about from '../assets/images/aboutphoto.jpg';

const About = () => {
  return (
    <>
      <div style={styles.container}>
        <Hero img={about} pageName="About Our Car Rental Service" />
      
        <p style={styles.paragraph}>
          Welcome to our car rental platform! We are dedicated to providing high-quality
          and reliable car rental services to meet your transportation needs. Whether you
          are planning a trip, need a temporary vehicle, or just want to experience the
          thrill of driving different cars, we've got you covered.
        </p>
        <br />
        <br />
        <p style={styles.paragraph}>
          Our fleet includes a wide range of vehicles from compact cars to luxurious
          SUVs. We prioritize safety, comfort, and customer satisfaction. With
          user-friendly booking options and competitive prices, we aim to make your car
          rental experience seamless and enjoyable.
        </p>
        <p style={styles.paragraph}>
          Thank you for choosing our car rental service. Feel free to explore our website,
          browse through our vehicle options, and make a reservation for your next journey.
        </p>

        <div style={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15220.32055666477!2d78.48950808715819!3d17.503687499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a4061ad16db%3A0x65bf3b946da6a925!2sDurga%20Travels!5e0!3m2!1sen!2sin!4v1703488117172!5m2!1sen!2sin"
            width="1300"
            height="500"
            style={{ ...styles.map, border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Service />
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  mapContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  map: {
    borderRadius: '8px',
  },
};

export default About;
