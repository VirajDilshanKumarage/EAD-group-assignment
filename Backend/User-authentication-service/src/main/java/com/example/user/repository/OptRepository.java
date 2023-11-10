package com.example.user.repository;

import com.example.user.entity.Opt;
import org.springframework.data.jpa.repository.JpaRepository;

/* *
this is the Repository of Opt entity its extends from JpaRepository
*/

public interface OptRepository extends JpaRepository<Opt,Long> {
    Opt findByEmail(String email);


}
