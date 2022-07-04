package com.example.demo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="users")
public class User {
    @Id
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String description;

    @Column(nullable = false)
    private String account_locked;

    @Column
    private Date lock_time;

    @Column
    private Date last_time_password_changed;

    @Column(nullable = false)
    private int failAttempts;

    public User(String username, String password, String description, String account_locked,Date last_time_password_changed) {
        this.username = username;
        this.password = password;
        this.description = description;
        this.account_locked = account_locked;
        this.lock_time = null;
        this.failAttempts = 0;
        this.last_time_password_changed = last_time_password_changed;
    }

    public User(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccount_locked() {
        return account_locked;
    }

    public void setAccount_locked(String account_locked) {
        this.account_locked = account_locked;
    }

    public Date getLockTime() {
        return lock_time;
    }

    public void setLockTime(Date lockTime) {
        this.lock_time = lockTime;
    }

    public int getFailAttempts() {
        return failAttempts;
    }

    public void setFailAttempts(int failAttempts) {
        this.failAttempts = failAttempts;
    }

    public Date getLast_time_password_changed() {
        return last_time_password_changed;
    }

    public void setLast_time_password_changed(Date last_time_password_changed) {
        this.last_time_password_changed = last_time_password_changed;
    }
}