// CustomerDetails.tsx

import React, { useEffect, useState } from 'react';
import './Page.css';

interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  nicNumber :string;
  registerDate : string;
  role: string;
}

const CustomerDetails: React.FC = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/getAllUsers');
        const data = await response.json();
        // Filter out customers whose role is not 'customer'
        const filteredCustomers = data.filter((customer: Customer) => customer.role === 'customer');
        setCustomerData(filteredCustomers);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='customer-details-page'>
        <h2>Customer Details</h2>

      <div className='back-ground2'>
      <div className='customer-details-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Registed Date</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.nicNumber}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.email}</td>
              <td>{customer.registerDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default CustomerDetails;
