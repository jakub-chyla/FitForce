package com.coach.client;

import com.coach.stats.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class StatClient2 {

    @Autowired
    private RestTemplate template;

    @Autowired
    private RestTemplate regularRestTemplate;

//    public String getMessToken() {
//        Long number = 1L;
//        String response = regularRestTemplate.getForObject("http://localhost:8090/stats/member/" + number, String.class);
//        System.out.println(response);
//        return response;
//    }

    public List<Weight> findAllStatsByMember(Integer memberId) {
        String url = "http://localhost:8090/stats/member/" + memberId;


        ResponseEntity<List<Weight>> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Weight>>() {}
        );

        List<Weight> response = responseEntity.getBody();

        System.out.println(response);

        return response;
    }


}
