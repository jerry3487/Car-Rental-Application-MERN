import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { loginUser, reset } from '../features/user/userSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error } = userLogin

  const navigate = useNavigate()
  const [captchaValue, setCaptchaValue] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [errors, setErrors] = useState({});

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
    } else {
      if (!userInfo) {
        dispatch(reset())
      }
    }
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

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      currentErrors.email = "Invalid email format!";
      isValid = false;
    }

    if (password.length < 6) {
      currentErrors.password = "Password must be at least 6 characters long!";
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
      dispatch(loginUser({ email, password }));
    } else {
      alert("Please correct the errors in the form!");
    }
  }
  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   dispatch(loginUser({ email, password }))
  // }
  return (
    <div className="relative flex justify-center flex-col items-center pt-12 mx-2">
      {error && <Alert variant="alert-error" message={error} />}
      <h1 className="text-center text-2xl">Login</h1>
      <form className="form-control w-full max-w-md" onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          onChange={onChange}
          className="input input-bordered w-full mb-6"
          required
        /> {errors.email && <p className="text-red-500">{errors.email}</p>}
        
        
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={onChange}
          className="input input-bordered w-full"
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
              
        <Link to="/sign-up" className="link link-primary">
          Register
        </Link>
        <Link to="/forgot" className="link link-primary">
          Forgotpassword
        </Link>
        <button className="btn mt-6">Sign in</button>
      </form>
    </div>
  )
}

export default Login
