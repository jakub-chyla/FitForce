package com.coach.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class StatClient2 {

    @Autowired
    private RestTemplate template;

    @Autowired
    private RestTemplate regularRestTemplate;

    public String getMessToken() {
        Long number = 1L;
        String response = regularRestTemplate.getForObject("http://localhost:8090/stats/mess/" + number, String.class);
        System.out.println(response);
        return response;
    }
}
