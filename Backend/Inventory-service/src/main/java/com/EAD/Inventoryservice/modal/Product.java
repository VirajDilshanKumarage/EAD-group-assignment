package com.EAD.Inventoryservice.modal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private Long productId;
    private String productName;
    private double price;
    private Long productCount;
    private String productDescription;
    private Date manufactureDate;
    private Date expireDate;

}
