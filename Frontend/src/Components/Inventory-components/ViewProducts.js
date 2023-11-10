import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Table from 'react-bootstrap/Table';
import styles from './ViewProduct.module.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker


const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    productId: '',
    productName: '',
    price: '',
    productCount: '',
    productDescription: '',
    manufactureDate: '',
    expireDate: '',
  });  

  const fetchData = () => {
    axios.get('http://localhost:8082/product/getallproduct')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // the empty dependency array ensures that this effect runs only once, similar to componentDidMount


  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditedProduct({
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      productCount: product.productCount,
      productDescription: product.productDescription,
      manufactureDate: product.manufactureDate,
      expireDate: product.expireDate,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    // Perform the API call to update the product in the database
    axios.put(`http://localhost:8082/product/updateProduct/${editedProduct.productId}`, editedProduct)
      .then(response => {
        // Handle the response, e.g., show a success message
        console.log('Product updated successfully:', response.data);
        // Close the modal after saving changes
        setShowModal(false);
        fetchData();
      })
      .catch(error => {
        console.error('Error updating product:', error);
        // Handle the error, e.g., show an error message
      });
  };

  const handleRemoveClick = (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this product?');
  
    if (isConfirmed) {
      axios.delete(`http://localhost:8082/product/deleteById/${productId}`)
        .then(response => {
          console.log('Product deleted successfully:', response.data);
          alert("Product removed successfully:");
          fetchData();
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  };
  

  return (
    <div  className={styles.container}>
      <NavBar />
      <div className={styles.header}>
      <h3>All products</h3>
      </div>
      <div className={styles.tableAroundContainer}>
        <Table striped bordered hover variant="dark" style={{ width: '1200px' }}>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>MDF</th>
              <th>EXP</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.productCount}</td>
                <td>{product.productDescription.slice(0, 20)}</td>
                <td>{new Date(product.manufactureDate).toLocaleDateString()}</td>
                <td>{new Date(product.expireDate).toLocaleDateString()}</td>
                <td>
                  <button className={styles.editButton}  onClick={() => handleEditClick(product)}>View & Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleRemoveClick(product.productId)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

                {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{backgroundColor:'white' , width:'450px'}} >
          <Form.Group className="mb-2" >
          <Form.Label>Product Id</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="1111" 
            name="productId" 
            value={editedProduct.productId}
            onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Product name</Form.Label>
            <Form.Control 
            type="text" 
            name="productName"
            placeholder="Munchee tikiri mari" 
            value={editedProduct.productName}
            onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Unit price</Form.Label>
            <Form.Control type="text" placeholder="84.50" 
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>No. of units</Form.Label>
            <Form.Control type="text" placeholder="55" 
            name="productCount"
            value={editedProduct.productCount}
            onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description"
            name="productDescription"
            value={editedProduct.productDescription}
            onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Manufacture date</Form.Label>
            <Form.Control type="text" placeholder="Manufacture date"
            name="manufactureDate"
            value={new Date(editedProduct.manufactureDate).toLocaleDateString()}
            onChange={handleInputChange}
            />
           
          </Form.Group>
          <Form.Group className="mb-2" controlId="Form.ControlInput1">
            <Form.Label>Expire date</Form.Label>
            <Form.Control type="text" placeholder="Expire date"
            name="expireDate"
            value={new Date(editedProduct.expireDate).toLocaleDateString()}
            onChange={handleInputChange}
            />
          </Form.Group>
            {/* Add other form controls for other fields */}
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            <Button variant="success"  onClick={handleSaveChanges}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    

    </div>
  );
};

export default ViewProduct;
