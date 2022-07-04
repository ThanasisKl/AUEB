package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class appController {

    @GetMapping("/home")
    public String viewIndex(){
        return "home";
    }
}
