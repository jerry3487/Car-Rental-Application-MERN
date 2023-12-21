import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import cars from './data/cars.js';
import User from './models/userModel.js';
import Car from './models/carModel.js';
import Reservation from './models/reservationModel.js';

dotenv.config(); // Automatically loads variables from .env into process.env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    process.exit(1); // Exit with failure
  }
};

// Call the connectDB function
connectDB();

// Import data function
const importData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();
    await Reservation.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleData = cars.map((car) => {
      return { ...car, user: adminUser };
    });

    await Car.insertMany(sampleData);

    console.log('Data imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Destroy data function
const destroyData = async () => {
  try {
    await Reservation.deleteMany();
    await Car.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Run the import or destroy based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
