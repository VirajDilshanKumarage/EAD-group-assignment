package com.EAD.Inventoryservice.service;

import com.EAD.Inventoryservice.exception.NoProductFoundException;
import com.EAD.Inventoryservice.modal.Product;
import com.EAD.Inventoryservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService{
    @Autowired
    ProductRepository productRepository;
    @Override
    public String saveProduct(Product product) {
        if (productRepository.existsById(product.getProductId())){
            return "Product id exists.. Enter different ID";
        }else{
            productRepository.save(product);
            return "Product Id " + product.getProductId()+" is saved successfully";
        }

    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).get();
    }

    @Override
    public String deleteProductById(Long productId) {
        boolean isDeleted = false;
        if(productRepository.existsById(productId)){
            productRepository.deleteById(productId);
            isDeleted = true;
        }
        return "Product with id : " +productId+ " delete status : " + isDeleted;
    }

    @Override
    public Product updateProduct(Long productId, Product product) throws NoProductFoundException {
        Optional<Product> existing = productRepository.findById(productId);
        Product existingProduct = null;
        if (existing.isPresent()){
            existingProduct = existing.get();
            existingProduct.setProductName(product.getProductName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setProductCount(product.getProductCount());
            existingProduct.setProductDescription(product.getProductDescription());
            existingProduct.setManufactureDate(product.getManufactureDate());
            existingProduct.setExpireDate(product.getExpireDate());

            productRepository.save(existingProduct);

        }
        if(existingProduct == null){
            throw new NoProductFoundException("Product Not Found");
        }
        return existingProduct;
    }

    @Override
    public Product updateProductByCountAdd(Long productId, Long countToAdd) throws NoProductFoundException {
        Optional<Product> existing = productRepository.findById(productId);

        if (existing.isPresent()) {
            Product existingProduct = existing.get();
            Long currentCount = existingProduct.getProductCount();

            // Check if the countToAdd is not null or negative
            if (countToAdd != null && countToAdd > 0) {
                existingProduct.setProductCount(currentCount + countToAdd);
                productRepository.save(existingProduct);
                return existingProduct;
            } else {
                throw new IllegalArgumentException("Invalid countToAdd value.");
            }
        }

        throw new NoProductFoundException("Product Not Found");
    }

    @Override
    public Product updateProductCountRemove(Long productId, Long countToRemove) throws NoProductFoundException {
        Optional<Product> existing = productRepository.findById(productId);

        if (existing.isPresent()) {
            Product existingProduct = existing.get();
            Long currentCount = existingProduct.getProductCount();

            // Check if the countToAdd is not null or negative
            if (countToRemove != null && countToRemove > 0) {
                existingProduct.setProductCount(currentCount - countToRemove);
                productRepository.save(existingProduct);
                return existingProduct;
            } else {
                throw new IllegalArgumentException("Invalid countToRemove value.");
            }
        }

        throw new NoProductFoundException("Product Not Found");
    }

}
