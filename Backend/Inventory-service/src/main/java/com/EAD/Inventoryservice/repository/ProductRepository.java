package com.EAD.Inventoryservice.repository;

import com.EAD.Inventoryservice.modal.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product , Long> {

}
