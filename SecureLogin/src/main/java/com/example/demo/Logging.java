package com.example.demo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

//@Embeddable
@Entity
@Table(name="logging")
public class Logging {

    @Id
    @GeneratedValue
    private int id;

    @Column
    private String username;

    @Column
    private Date login_date;

    public Logging(String username, Date login_date) {
        this.username = username;
        this.login_date = login_date;
    }

    public Logging() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getLogin_date() {
        return login_date;
    }

    public void setLogin_date(Date login_date) {
        this.login_date = login_date;
    }

}
