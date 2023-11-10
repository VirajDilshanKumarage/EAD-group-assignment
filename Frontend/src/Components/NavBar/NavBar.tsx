import React, { useEffect, useState } from 'react';
import { FaUser, FaSignOutAlt, FaCartPlus } from 'react-icons/fa';
import './NavBar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../Dashboards/UpdateProfileModal';

const NavBar: React.FC = () => {
 

  const [customerLogedId, setUserId] = useState(0);
  const location = useLocation();
  const [cus_name, setName] = useState('');
 
  const [cus_role, setRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/');
  };

  const goToCartPage = () => {
    navigate('/customer-dashboard');
  };
  


  useEffect(() => {
    const loginId = location.state?.userId || '';
    setUserId(loginId);

    // Fetch customer data when the component mounts
    const fetchCustomerData = async () => {
      try {
        const userDataResponse = await fetch(`http://localhost:8080/api/v1/users/getUserById/${loginId}`);
      
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          
          setName(userData.name);
          setRole(userData.role);
           
          console.log('User customer Data-name kkj:'+ cus_name);
         
          
        } else {
          // Handle error when retrieving user data
          console.error('Failed to retrieve user data:', userDataResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [location.state]);

  return (
    <div className="navbar">
      <div className="logo">
        <span className="grocery-name">Royal Mall</span>
        <h2>{cus_name}</h2>
        <Modal isOpen={isModalOpen} onClose={closeModal} userLoginId={customerLogedId} />
      </div>
      <div className="profile-icons">
        <div onClick={goToCartPage} className="custom-link" data-tooltip="Cart" >
          <div className="icon" data-tooltip="Cart">
            <FaCartPlus />
          </div>
        </div>

        <div className="icon" data-tooltip="User" onClick={openModal}>
          <FaUser />
        </div>
        <div className="icon" data-tooltip="Sign Out" onClick={goToLoginPage}>
           
          <FaSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default NavBar;