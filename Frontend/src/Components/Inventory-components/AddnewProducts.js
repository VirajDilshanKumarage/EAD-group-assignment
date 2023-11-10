import React, { useState } from 'react';
import NavBar from "../NavBar/NavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./AddProduct.module.css";
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import Axios from 'axios'; // Import Axios

const AddNewProduct = () => {
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        price: '',
        productCount:'',
        productDescription: '',
        manufactureDate: new Date(),
        expireDate: new Date(),
      });

    const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Send the form data to the server using Axios
      const response = await Axios.post('http://localhost:8082/product/saveproduct', formData);

      // Handle the response (e.g., show a success message)
      console.log('Data sent successfully', response.data);
      if (response.data === "Product id exists.. Enter different ID"){
        alert("Product id exists.. Enter different ID");
      }else{
        alert("Data saved successfully");
        // Reset the form data to its initial state
        setFormData({
        productId: '',
        productName: '',
        price: '',
        productCount: '',
        productDescription: '',
        manufactureDate: new Date(),
        expireDate: new Date(),
      });
      }
        

      
      // Reset the form or perform any other necessary actions
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error sending data', error);
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={styles.header}>
          <h3 style={{color:'green'}}>Add new product</h3>
      </div>
      <div className={styles.formAroundContainer} >
        <Form style={{backgroundColor:'#4cd137' , width:'500px'}} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-2" >
            <Form.Label>Product Id</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="1111" 
            name="productId" 
            value={formData.productId}
            onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Product name</Form.Label>
            <Form.Control 
            type="text" 
            name="productName"
            placeholder="Munchee tikiri mari" 
            value={formData.productName}
            onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Unit price</Form.Label>
            <Form.Control type="text" placeholder="84.50" 
            name="price"
             value={formData.price}
             onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>No. of units</Form.Label>
            <Form.Control type="text" placeholder="55" 
            name="productCount"
             value={formData.productCount}
             onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description"
            name="productDescription"
             value={formData.productDescription}
             onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Manufacture date</Form.Label>
            <DatePicker
              selected={formData.manufactureDate}
              onChange={(date) =>
                setFormData({ ...formData, manufactureDate: date })
              }
              className={styles.datePicker}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Expire date</Form.Label>
            <DatePicker
              selected={formData.expireDate}
              onChange={(date) =>
                setFormData({ ...formData, expireDate: date })
              }
              className={styles.datePicker}
            />
          </Form.Group>
          <Button className={styles.submitButton} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddNewProduct;
