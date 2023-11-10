package com.EAD.Inventoryservice.controller;

import com.EAD.Inventoryservice.exception.NoProductFoundException;
import com.EAD.Inventoryservice.modal.Product;
import com.EAD.Inventoryservice.service.IProductService;
import com.EAD.Inventoryservice.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    IProductService iProductService;

    @PostMapping("/saveproduct")
    public ResponseEntity<String> createProduct(@RequestBody Product product){
        return new  ResponseEntity<String>(iProductService.saveProduct(product) ,HttpStatus.CREATED);
    }

    @GetMapping("/getallproduct")
    public ResponseEntity<List<Product>> getAllProduct(){
        return new ResponseEntity<List<Product>>(iProductService.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("/getproductbyid/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId){
        return new ResponseEntity<Product>(iProductService.getProductById(productId), HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{productId}")
    public ResponseEntity<String> deleteById(@PathVariable Long productId){
        return new ResponseEntity<String>(iProductService.deleteProductById(productId), HttpStatus.OK);
    }

    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,@RequestBody Product product) throws NoProductFoundException {
        return new  ResponseEntity<Product>(iProductService.updateProduct(productId,product) ,HttpStatus.OK);
    }

    @PutMapping("/updateProductCountByAdding/{productId}/{countToAdd}")
    public ResponseEntity<Product> updateProductCount(@PathVariable Long productId, @PathVariable Long countToAdd) throws NoProductFoundException {
        Product updatedProduct = iProductService.updateProductByCountAdd(productId, countToAdd);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @PutMapping("/updateProductCountByRemove/{productId}/{countToAdd}")
    public ResponseEntity<Product> updateProductCountByRemove(@PathVariable Long productId, @PathVariable Long countToAdd) throws NoProductFoundException {
        Product updatedProduct = iProductService.updateProductCountRemove(productId, countToAdd);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }


}
