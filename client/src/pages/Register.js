import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { registerUser, reset } from '../features/user/userSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  })
  const { name, email, phoneNumber, password, confirmPassword } = formData

  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error } = userLogin

  const navigate = useNavigate()
  const [captchaValue, setCaptchaValue] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');

  // Function to generate a random alphanumeric captcha
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaValue(captcha);
  };

  useEffect(() => {
    generateCaptcha(); // Generate captcha when the component mounts
  }, []);


  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
    dispatch(reset())
  }, [navigate, userInfo, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  

  const validateForm = () => {
    let isValid = true;
    let currentErrors = {};
    if (password.length < 6) {
      currentErrors.password = "Password must be at least 6 characters long!";
      isValid = false;
    }
    if (password !== confirmPassword) {
      currentErrors.password = "Passwords do not match!";
      isValid = false;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      currentErrors.email = "Invalid email format!";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,12}$/; 
    if (!phoneRegex.test(phoneNumber)) {
      currentErrors.phoneNumber = "Invalid phone number!";
      isValid = false;
    }

    if (userCaptcha.toLowerCase() !== captchaValue.toLowerCase()) {
      currentErrors.captcha = "Invalid captcha!";
      isValid = false;
    }

    setErrors(currentErrors);

    return isValid;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser({ name, email, phoneNumber, password }));
    }
  }
  

  return (
    <div className="relative flex justify-center flex-col items-center pt-12 mx-2">
      {error && <Alert variant="text-error" message={error} />}
      <h1 className="text-center text-2xl">Register</h1>
      <form className="form-control w-full max-w-md" onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={email}
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        /> {errors.email && <p className="text-red-500">{errors.email}</p>}
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          maxLength={12}
          pattern="[0-9]+"
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          required
        /> {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          className="input input-bordered w-full mb-6"
          onChange={onChange}
          required
        />{errors.password && <p className="text-red-500">{errors.password}</p>}
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          className="input input-bordered w-full"
          onChange={onChange}
          required
        />{errors.password && <p className="text-red-500">{errors.password}</p>}
        <br/>
         
          <label htmlFor="captcha"> 
                  Please enter the following captcha:
                  <strong>{captchaValue}</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter the captcha"
                  name="captcha"
                  value={userCaptcha}
                  className="input input-bordered w-full mb-6"
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  required
                />{errors.captcha && <p className="text-red-500">{errors.captcha}</p>}
                <br />

        <Link to="/sign-in" className="link link-primary">
          Sign in
        </Link>
        <button className="btn mt-6">Sign up</button>
        
       
       
        
      </form>
    </div>
  )
}

export default Register

