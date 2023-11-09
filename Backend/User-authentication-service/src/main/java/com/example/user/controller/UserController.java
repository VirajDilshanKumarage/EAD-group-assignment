package com.example.user.controller;


import com.example.user.dto.EmailDTO;
import com.example.user.dto.LoginDTO;
import com.example.user.dto.ResetPasswordDTO;
import com.example.user.dto.SaveDTO;
import com.example.user.entity.User;
import com.example.user.entity.Opt;
import com.example.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Objects;
import java.util.Optional;


/*
* This is the user controller it is having  REST API s
* GetMapping for get all user:- http://localhost:8080/api/v1/users/getAllUsers
* GetMapping for get user by email:- http://localhost:8080/api/v1/users/getUserByEmail/{email}
* GetMapping for get user by id:- http://localhost:8080/api/v1/users/getUserById/{id}
* PostMapping for login:- http://localhost:8080/api/v1/users/login
* PostMapping for register:- http://localhost:8080/api/v1/users/register
* PostMapping for request the verification code to reset the password:- http://localhost:8080/api/v1/users/requestVerifyCodeForForgotPassword
* PostMapping for reset the password with the verification code:- http://localhost:8080/api/v1/users/changeThePasswordWithVerifyCode
* PutMapping for update the user details by id:- http://localhost:8080/api/v1/users/update/{id}
* DeleteMapping for delete a user by id:- http://localhost:8080/api/v1/users/delete/{id}
* DeleteMapping for delete all the user (for developer purpose):- http://localhost:8080/api/v1/users/delete
* */


@CrossOrigin(origins = "http://localhost:3000")//this is included to enable cross-origin resource sharing (CORS) with frontend. here we use frontend as react that's why the port is 3000
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;
    private final Opt opt = new Opt();
    private final User customerWhoGotVerifyEmail = new User();




    @GetMapping("/getAllUsers")
    public List<User> getAllCustomers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUserByEmail/{email}")
    public Optional<User> getCustomerByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/getUserById/{id}")
    public User getCustomerById(@PathVariable Long id) {
        return userService.getUserById(id).get();
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

            // Validate email and password
        String login_as = userService.authenticateUser(email, password);
        if (login_as == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Invalid email or password.");
        } else {
            // Return the role or any information needed on the frontend
            return ResponseEntity.ok(login_as);
        }
    }



    @PostMapping("/register")
    public int addCustomer(@RequestBody SaveDTO saveDTO) {

        Optional<User> existingCustomerOptional = userService.getUserByEmail(saveDTO.getEmail());
        if(existingCustomerOptional.isPresent()){
            User customer = existingCustomerOptional.get();
            // here its return 1 when "Account already exists for entered email. Please log in. or try with another email"
            return 1;
        }
        if(userService.saveUser(saveDTO)!=null){
            // here its return 2 when "Registration successful"
            return 2;
        }else {
            // here its return 3 when "password confirmation is wrong or An error occurred during registration"
            return 3;
        }
    }


    @PostMapping("/requestVerifyCodeForForgotPassword")
    public boolean requestVerifyCodeForForgotPassword(@RequestBody EmailDTO emailDTO) {
        Optional<User> existingCustomerOptional = userService.getUserByEmail(emailDTO.getEmail());

        if (existingCustomerOptional.isPresent()) {
            userService.updateOptTable(emailDTO.getEmail());
            return true;
        }
        return false;
    }



    @PostMapping("/changeThePasswordWithVerifyCode")
    public boolean resetThePassword(@RequestBody ResetPasswordDTO resetPasswordDTO){
           return userService.resetThePassword(resetPasswordDTO);

    }

    @PutMapping("/update/{id}")
    public boolean updateCustomer(@PathVariable Long id, @RequestBody User updatedCustomer) {
        // Implement update logic here
        Optional<User> existingCustomerOptional = userService.getUserById(id);

        if (existingCustomerOptional.isPresent()) {
            if(userService.getUserByEmail(updatedCustomer.getEmail()).isPresent()) {
                User checkCustomer = userService.getUserByEmail(updatedCustomer.getEmail()).get();
                if (Objects.equals(checkCustomer.getId(), id)) {
                         userService.updateUser(existingCustomerOptional.get(), updatedCustomer);
                        return true;
                } else {return false;}
            }else {
                 userService.updateUser(existingCustomerOptional.get(),updatedCustomer);
                 return true;
            }
        } else {
            // Handle case where customer with given id is not found
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }


    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable Long id) {

        Optional<User> existingCustomerOptional = userService.getUserById(id);

        if (existingCustomerOptional.isPresent()) {
             userService.deleteUser(id);
            return "Delete successfully";
        } else {return "customer not found";}
    }

    @DeleteMapping("/delete")
    public String deleteAll(){
        userService.deleteAll();
        return "All users are deleted";
    }


}

