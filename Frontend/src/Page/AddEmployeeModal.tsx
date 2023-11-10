// AddEmployeeModal.tsx

import React, { useState } from 'react';

interface AddEmployeeModalProps {
  onClose: () => void;
  onAddEmployee: (employeeData: any) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ onClose, onAddEmployee }) => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    nicNumber: '',
    role: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEmployee = () => {
    onAddEmployee(employeeData);
    
  };

  return (
    <div className='add-employee-modal'>
      <h2>Add Employee</h2>
     
      <form className='modal'>
        <label>Name:</label>
        <input type='text' name='name' value={employeeData.name} onChange={handleInputChange} />

        <label>Phone Number:</label>
        <input type='text' name='phoneNumber' value={employeeData.phoneNumber} onChange={handleInputChange} />

        <label>Email:</label>
        <input type='text' name='email' value={employeeData.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type='password' name='password' value={employeeData.password} onChange={handleInputChange} />

        <label>Confirm Password:</label>
        <input type='password' name='confirmPassword' value={employeeData.confirmPassword} onChange={handleInputChange} />

        <label>NIC Number:</label>
        <input type='text' name='nicNumber' value={employeeData.nicNumber} onChange={handleInputChange} />

        <label>Role:</label>
        <select name='role' value={employeeData.role} onChange={handleInputChange}>
                 <option value=''>Change the role!</option>
                  <option value='admin'>Admin</option>
                  <option value='manager'>Manager</option>
                  <option value='inventory_keeper'>Inventory Keeper</option>
                  <option value='delivery_person'>Delivery Person</option>
                  <option value='employee'>Employee</option>
                  
                </select>
        <br/>

        <button type='button' onClick={handleAddEmployee}>
          Add Employee
        </button>
        <br/>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
      </form>
      </div>

  );
};

export default AddEmployeeModal;
