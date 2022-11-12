package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@ComponentScan("com.example.repo")
@ComponentScan("com.example.controller")
@ComponentScan("com.example.models")
@Configuration
@EnableAutoConfiguration
@EntityScan("com.example.models")
@EnableJpaRepositories("com.example.repo") 

@SpringBootApplication
public class Server1Application {

	public static void main(String[] args) {
//		SpringApplication.run(Server1Application.class, args);
		ConfigurableApplicationContext context = SpringApplication.run(Server1Application.class, args);

	}

}



//(scanBasePackages={"com.example.controllers", "com.example.repos","com.example.models"})