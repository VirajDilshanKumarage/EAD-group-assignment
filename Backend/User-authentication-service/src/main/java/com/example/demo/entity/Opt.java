package com.example.demo.entity;



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
