// EmployeeDetails.tsx

import React, { useEffect, useRef, useState } from 'react';
import './Page.css';
import Modal from './UpdateEmployeeProfileModal';
import AddEmployeeModal from './AddEmployeeModal';
import UpdateEmployeeProfileModal from './UpdateEmployeeProfileModal';

interface Employee {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  nicNumber: string;
  registerDate: string;
  role: string;
}

const EmployeeDetails: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const myElementRef = useRef(null);

  const targetElementRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the target element
  const scrollToTargetElement = () => {
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  // State for Update Modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee>({
    id: 0,
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    nicNumber: '',
    registerDate: '',
    role: '',
  });

  // State for Add Modal
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {


      try {
        const response = await fetch('http://localhost:8080/api/v1/users/getAllUsers');
        const data = await response.json();
        // Filter out customers whose role is not 'customer'
        const filteredEmployees = data.filter((employee: Employee) => employee.role !== 'customer');
        setEmployeeData(filteredEmployees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (employeeId: number) => {
    const selectedEmployee = employeeData.find((employee) => employee.id === employeeId);

    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
      setUpdatedEmployee(selectedEmployee);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = async (employeeId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/delete/${employeeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the employeeData state after successful deletion
        setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== employeeId));
      } else {
        console.error('Error deleting employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openAddEmployeeModal = () => {

   
    setIsAddEmployeeModalOpen(true);
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth' });
      targetElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    
  };

  const closeAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const handleAddEmployee = async (employeeData: any) => {


    if(employeeData.name===''||employeeData.phoneNumber===''||employeeData.passwords===''||employeeData.confirmPassword===''||employeeData.nicNumber===''||employeeData.role===''){
      alert("All fields are required!");
    }
    else{
    try {
      const response = await fetch('http://localhost:8080/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      

      const registrationSuccessful = await response.json();

      if (registrationSuccessful === 1) {
        alert('Account already exists for enterd email.  try with another email');
        
      } else if (registrationSuccessful === 2) {
        alert('Registration successful');
        window.location.reload();
        
      }

      

      if (response.ok) {
        // Employee added successfully, you can update the state or perform any other action
        fetchData(); 
        // Fetch updated employee data after adding a new employee
      } else {
        console.error('Error adding employee:', response.statusText);
      }

      
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }
  };

  return (
    <div className='customer-details-page'>

      
      <h2>Employee's Details</h2>

      <div className='back-ground2'>
        <div className='customer-details-container'>
          <button onClick={openAddEmployeeModal} >Add Employee</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Registered Date</th>
                <th>Role</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.nicNumber}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.email}</td>
                  <td>{employee.registerDate}</td>
                  <td>{employee.role}</td>
                  <td>
                    <button onClick={() => handleUpdate(employee.id)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div  ref={targetElementRef}>
      {isAddEmployeeModalOpen && (
        <AddEmployeeModal onClose={closeAddEmployeeModal} onAddEmployee={handleAddEmployee} />
      )}
     

      {isUpdateModalOpen && (
        <UpdateEmployeeProfileModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          userLoginId={selectedEmployee?.id || 0}
        />
      )}
    </div>
    </div>
  );
};

export default EmployeeDetails;
function fetchData() {
  throw new Error('Function not implemented.');
}

