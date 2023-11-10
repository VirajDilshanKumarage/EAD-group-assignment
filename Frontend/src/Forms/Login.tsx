// LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

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

    // Perform API call to login endpoint
    const response = await fetch('http://localhost:8080/api/customers/login', {
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
        navigate('/admin-dashboard');
      } else if (loginAs === 'inventory person') {
        // Redirect to customer dashboard
        navigate('/inventory-dashboard');
      } else if (loginAs === 'delivery person') {
        // Redirect to customer dashboard
        navigate('/delivery-dashboard');
      } else if (loginAs === 'customer') {
        // Redirect to customer dashboard
        navigate('/customer-dashboard');
      } else {
        console.error('Unknown role received from the server');
      }

      // Call the onLogin callback
      onLogin();
    } else {
      // Handle login failure
      console.error('Login failed. Invalid email or password.');
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
