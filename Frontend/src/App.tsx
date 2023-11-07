// App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './Dashboards/AdminDashboard';
import LoginForm from './Forms/Login'; // Correct import statement
import CustomerDashboard from './Dashboards/CustomerDashboard';
import InventoryDashboard from './Dashboards/InventoryDashboard';
import DeliveryDashboard from './Dashboards/DeliveryDashboard';
import RegisterForm from './Forms/RegisterForm';
import GetOPTForm from './Forms/GetOPT';
import PasswordResetForm from './Forms/ResetPassword';
import CustomerDetails from './Page/CustomerDetails';
import EmployeeDetails from './Page/EmployeeDetails';
import Cart from './Dashboards/Cart/Cart';
import Checkout from './Dashboards/Checkout/Checkout';



const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the user was logged in before (from localStorage)
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // Save the login status to localStorage
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = () => {
    // Perform your login logic, and if successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

 

  return (
    <Router>
      <Routes>
        <Route
          path="/admin-dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} // Use the correct route
        />
        <Route
          path="/customer-dashboard"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/" />}
            // Use the correct route
        />

        <Route
          path="/inventory-dashboard"
          element={isLoggedIn ? <InventoryDashboard /> : <Navigate to="/" />} // Use the correct route
        />

        <Route
          path="/delivery-dashboard"
          element={isLoggedIn ? <DeliveryDashboard /> : <Navigate to="/" />} // Use the correct route
        />

        <Route path="/customer-dashboard/add-to-cart" element={<Cart />} />

        <Route path="/customer-dashboard/checkout" element={<Checkout/>} />



        <Route path="" element={<LoginForm onLogin={handleLogin} />} />

        

        <Route path="/register" element={<RegisterForm/>} />

        <Route path="/get-opt" element={<GetOPTForm/>} />

        <Route path="/reset-password" element={<PasswordResetForm/>} />

        <Route path="/customer-Details" element={<CustomerDetails/>} />

        <Route path="/employee-Details" element={<EmployeeDetails/>} />

      </Routes>
    </Router>
  );
};

export default App;
