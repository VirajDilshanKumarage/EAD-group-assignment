import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const PasswordResetForm = () => {


  const [password, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setOpt] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Set email only once when the component mounts
    const emailOpt = location.state?.email || '';
    setEmail(emailOpt);
  }, [location.state]);

  const [timer, setTimer] = useState(() => {
    // Clear the stored timer value when the component mounts
    localStorage.removeItem('passwordResetTimer');
    return 120;
  });
  const [optExpired, setOptExpired] = useState(false);
  const navigate = useNavigate();

  const handleNewPasswordChange = (e: { target: { value: any } }) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    validatePassword(newPasswordValue);
  };

  const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
    setConfirmPassword(e.target.value);
  };

  const handleOptChange = (e: { target: { value: string } }) => {
    setOpt(e.target.value);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    setIsValidPassword(passwordRegex.test(password));
  };

  const goToGetOptPage = async () => {
    navigate('/get-opt');
  };

  const handleSubmit = async () => {
    if (password === '' || confirmPassword === '' || verificationCode === '') {
      alert('All fields are required');
    } else if (password !== confirmPassword) {
      alert('Password and Confirm Password must match');
    } else if (!isValidPassword) {
      alert(
        'Password must have at least 8 characters, at least one uppercase letter, lowercase letter, number, and special character.'
      );
    } else {
      try {
        // Perform API call to backend endpoint
        const response = await fetch('http://localhost:8080/api/customers/changeThePasswordWithVerifyCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password,confirmPassword,verificationCode,email }),
        });

        const resetSuccessful = await response.json();

        if (resetSuccessful) {
          alert('Password reset successful');
          navigate('/');
        } else {
          alert('Password reset failed. Please try again.');
        }
      } catch (error) {
        alert('An error occurred during password reset:');
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = Math.max(prevTimer - 1, 0);
        localStorage.setItem('passwordResetTimer', newTimer.toString());

        if (newTimer === 0) {
          clearInterval(interval);
          setOptExpired(true);
        }

        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="back-ground1">
      <div className="page">
        <h2>Password Reset</h2>
        <form>
          <label>New Password:</label>
          <input type="password" value={password} onChange={handleNewPasswordChange} />
          <br />

          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          <br />

          <label>Opt:</label>
          <input type="text" value={verificationCode} onChange={handleOptChange} />
          <br />

          {!isValidPassword && (
            <p style={{ color: 'red', margin: '0', fontSize: '14px' }}>
              Password must have at least 8 characters, at least one uppercase letter, at least one lowercase letter, at least one special character and numbers.
            </p>
          )}

          <br />
          <button type="button" onClick={handleSubmit}>
            Reset Password
          </button>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="pointer" onClick={goToGetOptPage}>
              Didn't get opt?
            </p>

            <div>
              <p style={{ textAlign: 'right', margin: 0 }}>
                Time remaining: {Math.floor(timer / 60)}:{timer % 60}
              </p>

              {optExpired && (
                <p style={{ color: 'red', textAlign: 'right', margin: 0 }}>Opt is expired</p>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
