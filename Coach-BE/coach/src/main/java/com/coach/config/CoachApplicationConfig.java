package com.coach.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class CoachApplicationConfig {


    @Bean
    public RestTemplate regularRestTemplate() {
        return new RestTemplate();
    }
}
