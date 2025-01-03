package com.member.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MemberApplicationConfig {


    @Bean
    public RestTemplate regularRestTemplate() {
        return new RestTemplate();
    }
}
