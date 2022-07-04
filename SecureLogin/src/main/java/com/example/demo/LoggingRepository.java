package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;


public interface LoggingRepository extends JpaRepository<Logging, String> {   //data access layer

}
