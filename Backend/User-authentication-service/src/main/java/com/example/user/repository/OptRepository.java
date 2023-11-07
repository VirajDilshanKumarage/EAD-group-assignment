package com.example.user.repository;

import com.example.user.entity.Opt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptRepository extends JpaRepository<Opt,Long> {
    Opt findByEmail(String email);


}
