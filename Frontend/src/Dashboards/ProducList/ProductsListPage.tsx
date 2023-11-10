import React, { useState, useEffect } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';
import { dummyProducts } from '../../data/products';
import './ProductsListPage.css'

interface Product {
  productId: string;
  productName: string;
  productCount: number;
  productDescription: string;
  price: number;
  manufactureDate: string;
  expireDate: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const useDummyData = true; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;

        if (useDummyData) {
          response = { data: dummyProducts };
        } else {
          response = await axios.get('http://localhost:8082/product/getallproduct');
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className='ProductsPage'>
      <NavBar />
      <span className='productsTitle'>Products</span>
      <div className='productCardsContainer'>
        {products.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

