// LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import Modal from '../Dashboards/UpdateProfileModal';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  var userId=0;
  

  const goToRegisterPage = async () => {
    navigate('/register');
  };

  const goToGetOptPage = async () => {
    navigate('/get-opt');
  };

  const validateEmail = (email: string): boolean => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validate email and password
    if (!email) {
      setEmailError('Please enter your email');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      return;
    } else {
      setPasswordError('');
    }


    try {
      const userDataResponse = await fetch(`http://localhost:8080/api/users/getUserByEmail/${email}`);
      
      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        console.log('User Data:', userData);

        // Extract userId from user data
        userId=userData.id;
        console.log('User ID:', userData.id);
        
       
        
      } else {
        // Handle error when retrieving user data
        console.error('Failed to retrieve user data:', userDataResponse.statusText);
      }
    } catch (error) {
      // Handle general error when retrieving user data
      console.error('Error retrieving user data:');
    }

    // Perform API call to login endpoint
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const loginAs = await response.text();

      // Redirect based on the role
      if (loginAs === 'admin') {
        // Redirect to admin dashboard
      
        console.log("id="+userId);
        navigate('/admin-dashboard', { state:  {userId} });
      } else if (loginAs === 'inventory_keeper') {
        // Redirect to inventory dashboard
        navigate('/inventory-dashboard');
      } else if (loginAs === 'delivery_person') {
        // Redirect to delivery dashboard
        navigate('/delivery-dashboard');
      } else if (loginAs === 'customer') {
        // Redirect to customer dashboard
        navigate('/customer-dashboard');
      } else {
        alert('Unknown role received from the server');
      }

      // Call the onLogin callback
      onLogin();

      // Retrieve user data
     
    } else {
      // Handle login failure
      alert('Login failed. Invalid email or password.');
    }
  };

  return (
    <div className='back-ground1'>
      <div className="page">
        <h1>Royal Mall</h1>
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className="error">{emailError}</p>
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="error">{passwordError}</p>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <br/>
          <p className='pointer' onClick={goToGetOptPage}>Forgot password?</p>
        </form>
        <h3 onClick={goToRegisterPage} className='pointer'>Don't have an account?</h3>
      </div>
    </div>
  );
};

export default LoginForm;
