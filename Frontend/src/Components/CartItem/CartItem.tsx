import React, { useState } from 'react';
import './CartItem.css';
import sampleProduct from '../../Asset/sample_product.png'
import { BiSolidPlusCircle } from "react-icons/bi";
import { BiSolidMinusCircle } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';



interface CartItemProps {
    productName: string;
    productId: String;
    customerId: string;
    quantity: number;
    price: number;
    totalItemPrice: number;
}

const CartItem: React.FC<CartItemProps> = ({ productName, quantity, price, totalItemPrice, customerId, productId }) => {

    const [itemQuantity, setItemQuantity] = useState(quantity);

    const handleDeleteItem = () => {
        axios
            .delete(`http://localhost:8000/cart/delete-cart-item/${customerId}/${productId}`)
            .then((response) => {
                console.log('Item deleted successfully:', response.data);
                window.location.reload();
                alert("Item deleted successfully")

            })
            .catch((error) => {
                console.error('Error deleting item:', error);
            });
    };

    //update quantity
    const increaseQuantity = () => {
        setItemQuantity(itemQuantity + 1);
        updateCartItem(itemQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
            updateCartItem(itemQuantity - 1);
        }
    };

    const updateCartItem = (newQuantity: number) => {
        axios
            .put(`http://localhost:8000/cart/update-cart-item/${customerId}/${productId}`, { quantity: newQuantity })
            .then((response) => {
                console.log('Quantity updated successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error updating quantity:', error);
            });
    };


    return (
        <div className="cart-item">
            <div className="productImage">
                <img src={sampleProduct} alt="" />
            </div>
            <div className="productInfo">
                <h3>Product: {productName}</h3>
                <p>Price: Rs.{price}</p>
                <p>Total Price: Rs.{totalItemPrice}</p>
                <p>Quantity:{quantity}</p>
            </div>
            {/* Quantity change */}
            <div className="quantityChange">
                <BiSolidPlusCircle className="icon-qty" onClick={increaseQuantity} />
                <p>{itemQuantity}</p>
                <BiSolidMinusCircle className="icon-qty" onClick={decreaseQuantity} />
            </div>
            <div className="deleteItem" onClick={handleDeleteItem}>
                <RiDeleteBin6Line />
            </div>
        </div>
    );
};

export default CartItem;