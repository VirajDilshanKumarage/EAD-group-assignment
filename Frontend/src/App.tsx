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
import Cart from './Dashboards/Cart/Cart';
import Checkout from './Dashboards/Checkout/Checkout';
import ProductsPage from './Dashboards/ProducList/ProductsListPage';



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
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-dashboard" />} // Use the correct route
        />
        <Route
          path="/customer-dashboard"
          element={isLoggedIn ? <CustomerDashboard /> : <Navigate to="/customer-dashboard" />} // Use the correct route
        />

        <Route path="/customer-dashboard/add-to-cart/:customerId" element={<Cart />} />

        <Route path="/customer-dashboard/checkout/:customerId" element={<Checkout/>} />

        <Route path="/customer-dashboard/products" element={<ProductsPage/>} />



        <Route
          path="/inventory-dashboard"
          element={isLoggedIn ? <InventoryDashboard /> : <Navigate to="/inventory-dashboard" />} // Use the correct route
        />

        <Route
          path="/delivery-dashboard"
          element={isLoggedIn ? <DeliveryDashboard /> : <Navigate to="/delivery-dashboard" />} // Use the correct route
        />

        <Route path="" element={<LoginForm onLogin={handleLogin} />} />

        <Route path="/register" element={<RegisterForm/>} />

        <Route path="/get-opt" element={<GetOPTForm/>} />

        <Route path="/reset-password" element={<PasswordResetForm/>} />

      </Routes>
    </Router>
  );
};

export default App;
