import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './Checkout.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import("react-hook-form").Resolver<FormData, any> | undefined;


interface CartItem {
  productName: string;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

interface Customer {
  name: string;
  address: string;
  email: string;
}

interface FormData {
  name: string;
  address: string;
}

const Checkout: React.FC = () => {
  const { customerId } = useParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerDetails, setCustomerDetails] = useState<Customer>();
  const urlForCustomerData = `http://localhost:8000/customer`;

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: { name: any; address: any; }) => {
    console.log('Form submitted with data:', data);
    const orderDetails = {
      name: data.name,
      customerId: customerDetails?.name,
      items: cartItems,
      'status:': 'ordered',
      deliveryAddress: data.address,
    };
    try {
      // Make an Axios POST request with the form data
      axios
        .post('http://localhost:8000/01/checkout', orderDetails)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Your Order has been placed',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const setMyName = () => {
    setValue('name', customerDetails ? customerDetails.name : '');
  };

  const setMyAddress = () => {
    setValue('address', customerDetails ? customerDetails.address : '');
  };
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/get-cart-items/${customerId}`
        );
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

  const getCustomerDetails = async () => {
    try {
      const response = await axios.get(urlForCustomerData);
      setCustomerDetails(response.data.customer);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  //get customer details
  useEffect(() => {
    getCustomerDetails();
  }, [customerId]);

  return (
    <div className="checkout-page">
      <NavBar />
      <div className="details">
        <div className="payment-details">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Order Details</h2>
            <div>
              <div className="payment-details-forms">
                <label className="labelStyle" style={{ marginRight: '75px' }}>
                  Deliver to
                </label>

                <input className="orderInput" {...register('name')} />
                {errors.name && (
                  <small className="errorMessage">{errors.name.message}</small>
                )}
                <div>
                  <label onClick={setMyName} className="labelUseMyStyle">
                    Use my Name
                  </label>
                </div>
              </div>
              <div className="payment-details-forms">
                <label className="labelStyle" style={{ marginRight: '10px' }}>
                  Shipping Address
                </label>

                <input className="orderInput" {...register('address')} />
                {errors.address && (
                  <small className="errorMessage">
                    {errors.address.message}
                  </small>
                )}
                <div>
                  <label onClick={setMyAddress} className="labelUseMyStyle">
                    Use my Address
                  </label>
                </div>
              </div>
              <div className="orderNow">
                <button type="submit" className="orderNow-button">
                  Order Now
                </button>
              </div>
            </div>
            <div></div>
          </form>
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
            <p className="error-found-porducts">No products in the cart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;


