package com.EAD.Inventoryservice.service;

import com.EAD.Inventoryservice.exception.NoProductFoundException;
import com.EAD.Inventoryservice.modal.Product;

import java.util.List;

public interface IProductService {
    String saveProduct(Product product);
    List<Product> getAllProduct();
    Product getProductById(Long productId);
    String deleteProductById(Long productId);
    Product updateProduct(Long productId , Product product) throws NoProductFoundException;
    Product updateProductByCountAdd(Long productId , Long countToAdd) throws NoProductFoundException;
    Product updateProductCountRemove(Long productId , Long countToRemove) throws NoProductFoundException;
}
