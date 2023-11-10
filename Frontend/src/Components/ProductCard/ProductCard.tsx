import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './ProductCard.css';
import axios from 'axios';
import sampleImage from '../../Asset/sample_product.png'

interface ProductCardProps {
  productId: string; // Adjusted to match the backend model
  productName: string; // Adjusted to match the backend model
  productDescription: string; // Adjusted to match the backend model
  price: number;
  productCount: number;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const customerId="customer123"

  const addToCartHandler = async () => {
    console.log("CustomerId: ",customerId,", ProductId: ",props.productId,", Quantity: ", quantity,", Price:", props.price);
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/cart/add-to-cart', {
        productId: props.productId,
        quantity: quantity,
        price: props.price,
        customerId:customerId
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('An error occurred while adding the item to the cart');
      alert('An error occurred while adding the item to the cart');
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card className="product-card" style={{ width: '18rem' }}>
      <Card.Img className="card-img-top" variant="top" src={sampleImage} />
      <Card.Body>
        <Card.Title className="card-title">{props.productName}</Card.Title>
        <Card.Text className="card-text">{props.productDescription}</Card.Text>
        <Card.Text className="card-text">Quantity: {props.productCount}</Card.Text>
        <div className="quantity-controls">
          <Button variant="outline-primary" className="quantity-btn" onClick={decreaseQuantity}>
            <FaMinus />
          </Button>
          <div className="quantity-display">{quantity}</div>
          <Button variant="outline-primary" className="quantity-btn" onClick={increaseQuantity}>
            <FaPlus />
          </Button>
        </div>
        <div className="button-center">
          <Button className="primary-btn" onClick={addToCartHandler} disabled={loading}>
            {loading ? 'Adding to Cart...' : 'Add to Cart'} <BsFillCartPlusFill className="icon-cart" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
