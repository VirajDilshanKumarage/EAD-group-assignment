import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetOPTForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isResetRequested, setIsResetRequested] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };


  const goToRegisterPage = async () => {
    navigate('/register');
  };

  const goToLoginPage = () => {
    navigate('/');
  };



  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    setIsValidEmail(emailRegex.test(inputEmail));
    
  };

  const getEmail = async () => {
    if (!isValidEmail) {
      alert('Please enter a valid email address');
    } else {
      try {
        // Perform API call to request password reset

        if (email !== '') {
          navigate('/reset-password', { state: { email } });
        } else {
          alert('Please enter a valid email address');
        }
        const response = await fetch('http://localhost:8080/api/v1/users/requestVerifyCodeForForgotPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });


        const result = await response.json();


        if(!result){
           alert('you are not a user. please register');
           goToRegisterPage();
        }
        
         

      } catch (error) {
        alert('An error occurred during the password reset request.');
      }
    }
  };

  return (
    <div className='back-ground1'>
      <div className='page'>
        <h2>Password Reset</h2>
        {!isResetRequested ? (
          <form>
            <label>Email:</label>
            <input type="text" value={email} onChange={handleEmailChange} />
            {!isValidEmail && (
              <p style={{ color: 'red', margin: '0', fontSize: '14px' }}>
                Please enter a valid email address
              </p>
            )}
            <br />
            <button type="button" onClick={getEmail}>
              Get OPT
            </button>
          </form>
        ) : (
          <p>Password reset instructions have been sent to your email.</p>
        )}
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 className="pointer" onClick={goToLoginPage}>
              Login
            </h3>

            
            
              <h3 style={{ textAlign: 'right', marginTop: '20px' }} className="pointer" onClick={goToRegisterPage}>
                Register
              </h3>
            </div>
      </div>
    </div>
  );
};

export default GetOPTForm;
