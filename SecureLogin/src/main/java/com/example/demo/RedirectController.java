package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class RedirectController {

    @Autowired UserRepository userRepository;
    private int change_password_time_duration = 60000;  //5 minutes

    @GetMapping("/")
    public ModelAndView redirectWithUsingRedirectPrefix(ModelMap model, HttpServletRequest request) {
        String username = request.getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);
        if (user.getLast_time_password_changed().getTime() + change_password_time_duration < System.currentTimeMillis()) {
            return new ModelAndView("redirect:/home?error");
        }
        return new ModelAndView("redirect:/home", model);
    }
}
