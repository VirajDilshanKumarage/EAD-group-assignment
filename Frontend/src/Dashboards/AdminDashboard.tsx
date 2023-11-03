// AdminDashboard.jsx
import React from 'react';
import Card from './Card'; // Create a Card component or use a library like Material-UI for ready-made components

const AdminDashboard = () => {
  return (
    
    <div className="admin-dashboard">
      
      <div className="main-content">
      <div className='back-ground1'>
        <h1 className='profile'>Welcome to Admin Dashboard</h1>
        <div className="card-container">
          <Card title="Customers" icon="👥">
            {/* Customer-related content */}
          </Card>
          <Card title="Employees" icon="👔">
            {/* Employee-related content */}
          </Card>
          <Card title="Inventory" icon="📦">
            {/* Inventory-related content */}
          </Card>
          <Card title="Deliveries" icon="🚚">
            {/* Delivery-related content */}
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
