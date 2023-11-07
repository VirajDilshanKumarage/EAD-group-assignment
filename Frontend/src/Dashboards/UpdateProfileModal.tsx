// Modal.tsx

import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
   userLoginId: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, userLoginId}) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  
  const handleSubmit = async () => {
    // Assuming you have the customer ID available, replace 'customerId' with the actual ID
    // Replace with your customer ID
    const userId = userLoginId;
    console.log("modal id="+userId);

    const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    

    const data = await response.json();
    // Handle the data returned from the server
    console.log(data);
  

     if(data){
      alert("profile is updated successfully")
      onClose();
      window.location.reload();
      
     }else{
      alert("email is already used by another user ! please use another email");
      
    }

      
      
      
  };


  

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Profile</h2>
            <form>
              <label>
                Name:
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              
              <label>
                Phone Number:
                </label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              
              <label>
                Email:
                </label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
              
              <div className="button-container">
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
                <button type="button" className="close-button" onClick={onClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
