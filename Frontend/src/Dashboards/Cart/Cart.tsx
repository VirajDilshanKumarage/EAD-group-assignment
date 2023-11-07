import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from '../../Components/CartItem/CartItem';
import './Cart.css';
import { BsCart4 } from "react-icons/bs";
import NavBar from '../../Components/NavBar/NavBar';
import { Link, useParams } from 'react-router-dom';


interface CartItemData {
    productName: string;
    customerId: string;
    quantity: number;
    price: number;
    totalItemPrice: number;
    productId: string;
}

const Cart: React.FC = () => {

    const { customerId } = useParams();
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);


    

    const getCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/cart/get-cart-items/${customerId}`);
            setCartItems(response.data.cartItems);
            console.log(response.data.cartItems);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        // Calculate the total price and total items whenever cartItems change
        let price = 0;
        let items = 0;

        for (const item of cartItems) {
            price += item.totalItemPrice;
            items += item.quantity;
        }

        setTotalPrice(price);
        setTotalItems(items);
    }, [cartItems]);

    return (
        <div className="cart-container">
            <NavBar />
            <h1>Shopping Cart<i><BsCart4 /></i></h1>
            <div className="cart-content">
                <div className="cart-items">
                    <h2>Added Items</h2>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <CartItem
                                key={index}
                                productName={item.productName}
                                quantity={item.quantity}
                                price={item.price}
                                totalItemPrice={item.totalItemPrice}
                                customerId={customerId || ''}
                                productId={item.productId}
                            />
                        ))
                    ) : (
                        <p>No products have been added to the cart.</p>
                    )}
                </div>
                <div className="sidebar">
                    <h2>Cart Summary</h2>
                    <div className="total-info">
                        <table>
                            <tr>
                                <td>Total Items</td>
                                <td>{totalItems}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free Shipping</td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td>Rs.{totalPrice.toFixed(2)}</td>
                            </tr>
                        </table>
                        <button className="purchase-button">
                            <Link to={`/customer-dashboard/checkout/${customerId}`} className="custom-link">
                                Checkout
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;