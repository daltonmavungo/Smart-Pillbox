package com.smartpillbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartPillboxApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartPillboxApplication.class, args);
    }
}
