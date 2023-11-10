import React from 'react';
import './CartItem.css';
//import sampleProduct from '../../Asset/sample_product.png';
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

    return (
        <div className="cart-item">
            <div className="productImage">
                {/* <img src={sampleProduct} alt="" /> */}
            </div>
            <div className="productInfo">
                <h3>Talawakelle Tea 1Kg - Pure Ceylon Black Tea - Tea Pouch{productName}</h3>
                <p>Price: Rs.{price}</p>
                <p>Total Price: Rs.{totalItemPrice}</p>
                <p>Quantity:{quantity}</p>
            </div>
            {/* Quntity change */}
            {/* <div className="quantityChange">
      <BiSolidPlusCircle className="icon-qty"/>
      <p>{quantity}</p>
      <BiSolidMinusCircle className="icon-qty"/>
      </div> */}
            <div className="deleteItem" onClick={() => handleDeleteItem()}>
                <RiDeleteBin6Line />
            </div>
        </div>
    );
};

export default CartItem;