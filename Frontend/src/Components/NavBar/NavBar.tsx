import React from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './NavBar.css'; 

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <span className="grocery-name">Royal Mall</span>
      </div>
      <div className="profile-icons">
        <div className="icon">
          <FaUser />
        </div>
        <div className="icon">
          <FaSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default NavBar;