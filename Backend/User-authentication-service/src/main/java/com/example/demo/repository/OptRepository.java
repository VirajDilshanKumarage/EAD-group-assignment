package com.example.demo.repository;

import com.example.demo.entity.Opt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptRepository extends JpaRepository<Opt,Long> {
    Opt findByEmail(String email);


}
