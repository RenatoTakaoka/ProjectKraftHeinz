package com.kraftheinz.kraftheinzbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class KraftHeinzBackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(KraftHeinzBackEndApplication.class, args);
    }

}
