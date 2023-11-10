package com.example.user.entity;

/* *
* this is the entity that save opts (verification codes) temporary in the database
* this is related with reset password when the customer request opt with their email there is a one time password is generated and save in the opts table
* after 2 minutes generated opt is automatically deleted. it reduces the memory consumption.
*/


import javax.persistence.*;

@Entity
@Table(name = "opts")
public class Opt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long OptId;
    private String verifyCode;
    private String email;


    public Long getOptId() {
        return OptId;
    }

    public void setOptId(Long optId) {
        OptId = optId;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
