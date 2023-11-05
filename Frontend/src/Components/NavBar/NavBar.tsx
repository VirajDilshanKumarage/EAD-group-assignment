import React from 'react';
import { FaUser, FaSignOutAlt, FaCartPlus } from 'react-icons/fa';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {

  let customerId="customer123";
  return (
    <div className="navbar">
      <div className="logo">
        <span className="grocery-name">Royal Mall</span>
      </div>
      <div className="profile-icons">
      <div className="icon" data-tooltip="Cart">
          <Link to={`/customer-dashboard/add-to-cart/${customerId}`} className="icon custom-link" data-tooltip="Cart" >
            <FaCartPlus />           
          </Link>
          </div>
        <div className="icon" data-tooltip="User">
          <FaUser />
        </div>
        <div className="icon" data-tooltip="Sign Out">
          <FaSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default NavBar;