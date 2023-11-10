package com.example.user.service;




/* *
* this is the UserService it is having all the methods to approach the requirement of the controller
*/

import com.example.user.dto.ResetPasswordDTO;
import com.example.user.dto.SaveDTO;
import com.example.user.entity.User;
import com.example.user.entity.Opt;
import com.example.user.repository.UserRepository;
import com.example.user.repository.OptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;




@Service
public class UserService implements UserServiceInterface{

    @Autowired
    private UserRepository useRepository;
    @Autowired
    private JavaMailSender javaMailSender ;
    @Autowired
    private OptRepository optRepository;
    private User user = new User();
    private final Opt opt = new Opt();
    private Random verificationCode;





    @Override
    public List<User> getAllUsers() {return UserService.this.useRepository.findAll();}
    @Override
    public Optional<User> getUserById(Long id) {return UserService.this.useRepository.findById(id);}
    @Override
    public Optional<User> getUserByEmail(String email) {return UserService.this.useRepository.findByEmail(email);}
    @Override
    public void deleteUser(Long id) {UserService.this.useRepository.deleteById(id);}
    @Override
    public void deleteAll(){UserService.this.useRepository.deleteAll();}




    @Override
    public User saveUser(SaveDTO saveDTO) {
        String password = saveDTO.getPassword();
        String confirmPass =saveDTO.getConfirmPassword();
            if(password.equals(confirmPass)) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String encryptedPassword = passwordEncoder.encode(confirmPass);
                    user.setId(saveDTO.getId());
                    user.setName(saveDTO.getName());
                    user.setPhoneNumber(saveDTO.getPhoneNumber());
                    user.setEmail(saveDTO.getEmail());
                    user.setPassword(encryptedPassword);
                    user.setNicNumber(saveDTO.getNicNumber());
                    user.setRegisterDate(LocalDate.now()); // here we get the local date as the user registration date instead it's getting as a user input while customer registration process or employee adding process.
                    user.setRole(saveDTO.getRole());
                return UserService.this.useRepository.save(user);
            }else {
                System.out.print("\npassword confirmation is wrong\n");
                return null;
            }
    }

    @Override
    public String authenticateUser(String email, String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Optional<User> result = UserService.this.useRepository.findByEmail(email);
                   if(result.isPresent()){
                       user = result.get();
                           if(passwordEncoder.matches(password,user.getPassword())){
                               return user.getRole();
                           }
                       return null;
                   }
                   return null;
    }



    @Override
    public void updateUser(User existingCustomer, User updatedCustomer) {
        existingCustomer.setName(updatedCustomer.getName());
        existingCustomer.setPhoneNumber(updatedCustomer.getPhoneNumber());
        existingCustomer.setEmail(updatedCustomer.getEmail());
            if(updatedCustomer.getRole()!=null){
                existingCustomer.setRole(updatedCustomer.getRole());
            }
            if(updatedCustomer.getNicNumber()!=null){
                existingCustomer.setNicNumber(updatedCustomer.getNicNumber());
            }
        UserService.this.useRepository.save(existingCustomer);
    }


    @Override
    public void sendResetPasswordVerityEmail(String email,String verifyCode){
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Reset Verification Code");
            message.setText("Dear Valuable Customer,\nThis is your verification code\n\nverification code - "+verifyCode+"\n\nThis is valid only for 2 minutes");
            javaMailSender.send(message);
            System.out.print("email sent");
            //then call the deleteOptAuto Method in UserService
            deleteOptAuto(email);
    }

    @Override
    public void updateOptTable(String email){
        Opt optList = optRepository.findByEmail(email);
        String verifyCode = verifyCode();
            if(optList==null) {
                opt.setEmail(email);
                opt.setVerifyCode(verifyCode);
                optRepository.save(opt);
                sendResetPasswordVerityEmail(email,opt.getVerifyCode());
            }else {
                optList.setVerifyCode(verifyCode);
                optRepository.save(optList);
                sendResetPasswordVerityEmail(email,optList.getVerifyCode());
            }
    }


    @Override
    public boolean resetThePassword(ResetPasswordDTO resetPasswordDTO) {
        Opt optionalOpt = optRepository.findByEmail(resetPasswordDTO.getEmail());
            if (optionalOpt.getVerifyCode().equals(resetPasswordDTO.getVerificationCode())) {
                if (resetPasswordDTO.getVerificationCode() != null) {
                        if (resetPasswordDTO.getPassword().equals(resetPasswordDTO.getConfirmPassword())) {
                            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                            Optional<User> customerOptional = UserService.this.useRepository.findByEmail(resetPasswordDTO.getEmail());
                                if (customerOptional.isPresent()) {
                                    user = customerOptional.get();
                                    user.setPassword(passwordEncoder.encode(resetPasswordDTO.getConfirmPassword()));
                                    UserService.this.useRepository.save(user);
                                    optRepository.deleteById(optRepository.findByEmail(resetPasswordDTO.getEmail()).getOptId());
                                    return true;
                                } else {return false;}
                        } else {return false;}
                } else {return false;}
            } else {return false;}
    }

    @Override
    public String verifyCode() {
        // Create an instance of the Random class
        verificationCode = new Random();
        // Generate a random integer with 6 digits
        int min = 100000; // Minimum value (inclusive)
        int max = 999999; // Maximum value (inclusive)

        return String.valueOf(verificationCode.nextInt(max - min + 1) + min);
    }

    @Override
    public void deleteOptAuto(String email) {
        try {
            // Sleep for 3 minutes (300,000 milliseconds)
            Thread.sleep( 115000);
            optRepository.deleteById(optRepository.findByEmail(email).getOptId());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}


