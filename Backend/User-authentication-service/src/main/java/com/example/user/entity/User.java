package com.example.user.entity;

/* *
* this is the user entity that make the users table in database
* all the details of the user who involving  with the system are saved in this table
* here in the setRole. the value of the role argument is null mean it is a customer registration thr role definitely must be "customer"
* but if role is not null mean the admin try to add an employee to the system with details in that case admin definitely has to set role of the employee then role is not null the corresponding argument value must be set as the role
*/


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private LocalDate registerDate;
    private String nicNumber;
    private String role;








    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {


        this.password = password;

    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {

        if(role!=null){
            this.role=role;
        }else {
            this.role = "customer";
        }
    }

    public LocalDate getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDate registerDate) {
        this.registerDate = registerDate;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }
}

