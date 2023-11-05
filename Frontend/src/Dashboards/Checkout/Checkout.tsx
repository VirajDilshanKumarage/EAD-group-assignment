import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './Checkout.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


interface CartItem {
  productName: string;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

const Checkout: React.FC = () => {
  const { customerId } = useParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);  

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cart/get-cart-items/${customerId}`);
        setCartItems(response.data.cartItems);

        // Calculate the total price
        let price = 0;
        for (const item of response.data.cartItems) {
          price += item.totalItemPrice;
        }
        setTotalPrice(price);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    getCartItems();
  }, [customerId]);

  return (
    <div className='checkout-page'>
      <NavBar />
      <div className="details">
        <div className="payment-details">
        <h2>Payment Details</h2>
        <div className='payment-details-forms'>
        *Add your customer and payment details here *
        </div>
        </div>
        <div className="items-details">
          <h2>Order Items</h2>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  Product Name: {item.productName}
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Price: Rs.{item.price.toFixed(2)}
                  <br />
                  Total Item Price: Rs.{item.totalItemPrice.toFixed(2)}
                </li>
              ))}
              <p>Total Price: Rs.{totalPrice.toFixed(2)}</p>
            </ul>
            
          ) : (
            <p className='error-found-porducts'>No products in the cart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
