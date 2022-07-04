package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class Demo2Application {

	public static void main(String[] args) {
		SpringApplication.run(Demo2Application.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository,LoggingRepository loggingRepository){
		return args -> {
			User user = new User();
			BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
			user.setUsername("admin");
			user.setPassword(bCryptPasswordEncoder.encode("admin"));
			user.setDescription("This is admin");
			user.setAccount_locked("not_locked");
			user.setLast_time_password_changed(new Date());

			User user2 = new User();
			user2.setUsername("3180079");
			user2.setPassword(bCryptPasswordEncoder.encode("3180079"));
			user2.setDescription("This is me");
			user2.setAccount_locked("not_locked");
			user2.setLast_time_password_changed(new Date());

			userRepository.save(user);
			userRepository.save(user2);

//			loggingRepository.save(new Logging(user.getUsername(),null));
//			loggingRepository.save(new Logging(user2.getUsername(),null));
		};
	}

}
