import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  // Add more countries as needed
];

const RegisterForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [nicNumber, setNic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    validatePhoneNumber(newPhoneNumber);
  };

  const validatePhoneNumber = (inputPhoneNumber: string) => {
    setIsValidPhoneNumber(/^\d{10}$/.test(inputPhoneNumber));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToLoginPage = () => {
    navigate('/');
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleRegister = async () => {
    if (name === '' || email === '' || password === '' || confirmPassword === '' || phoneNumber === '' || nicNumber=='') {
      alert('All fields are required');
    } else if (!isValidEmail) {
      alert('Please enter a valid email address');
    } else {
      if (password === confirmPassword) {
        try {
          // Perform API call to registration endpoint
          const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, nicNumber ,phoneNumber, email, password, confirmPassword }),
          });

          const registrationSuccessful = await response.json();

          if (registrationSuccessful === 1) {
            alert('Account already exists for enterd email. Please log in. or try with another email');
            navigate('/');
          } else if (registrationSuccessful === 2) {
            alert('Registration successful');
            navigate('/');
          }
        } catch (error) {
          alert('An error occurred during registration:');
        }
      } else {
        alert('Password mismatch');
      }
    }
  };

  return (
    <div className='back-ground1'>
      <div className="page">
        <h1>Royal Mall</h1>
        {step === 1 && (
          <>
            <h2>Step 1: Enter Your Name</h2>
            <form>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <br />
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Step 2: Enter Your NIC</h2>
            <form>
              <label>NIC number:</label>
              <input type="text" value={nicNumber} onChange={(e) => setNic(e.target.value)} />
              <br />
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <h2>Step 3: Enter Your Phone Number</h2>
            <form>
            <label>Phone Number:</label>
            

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  
                />
               
              
              {!isValidPhoneNumber && (
                <p style={{ color: 'red', margin: '0', fontSize: '14px' }}>
                  Phone number should be 10 digits
                </p>
              )}
              <br />
              <button type="button" onClick={handleBack}>
                Back
              </button>
              <br />
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </form>
          </>
        )}
        {step === 4 && (
          <>
            <h2>Step 4: Enter Your Email</h2>
            <form>
              <label>Email:</label>
              <input type="text" value={email} onChange={handleEmailChange} />
              {!isValidEmail && (
                <p style={{ color: 'red', margin: '0', fontSize: '14px' }}>
                  Invalid email format
                </p>
              )}
              <br />
              <button type="button" onClick={handleBack}>
                Back
              </button>
              <br />
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </form>
          </>
        )}
        {step === 5 && (
          <>
            <h2>Step 5: Create Password</h2>
            <form>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <label>Confirm Password:</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <br />
              <button type="button" onClick={handleBack}>
                Back
              </button>
              <br />
              <button type="button" onClick={handleRegister}>
                Register
              </button>
            </form>
          </>
        )}

       <h3 className='pointer' onClick={goToLoginPage}>Already have an account ?</h3>
      </div>
      
    </div>
  );
};

export default RegisterForm;
