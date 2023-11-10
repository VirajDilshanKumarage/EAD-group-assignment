package com.example.user.service;

import com.example.user.dto.ResetPasswordDTO;
import com.example.user.dto.SaveDTO;
import com.example.user.entity.User;

import java.util.List;
import java.util.Optional;

/*
* this is the User Service Interface this describes the methods that are implemented in User Service class
* */

public interface UserServiceInterface {

    public List<User> getAllUsers();
    public Optional<User> getUserById(Long id);
    public Optional<User> getUserByEmail(String email);
    public void deleteUser(Long id);
    public void deleteAll();
    public User saveUser(SaveDTO saveDTO);
    public String authenticateUser(String email, String password);
    public void updateUser(User existingCustomer, User updatedCustomer);
    public void sendResetPasswordVerityEmail(String email,String verifyCode);
    public void updateOptTable(String email);
    public boolean resetThePassword(ResetPasswordDTO resetPasswordDTO);
    public String verifyCode();
    public void deleteOptAuto(String email);

}
