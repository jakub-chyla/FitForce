package com.coach.statsClient;

import com.coach.stats.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StatClient {

    private final RestTemplate regularRestTemplate;

    public List<Weight> findAllStatsByMember(Long memberId) {
        String url = "http://localhost:8090/api/v1/stats/member/" + memberId;

        ResponseEntity<List<Weight>> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        return responseEntity.getBody();
    }

    public void deleteAllStatsByMember(Long memberId) {
        String url = "http://localhost:8090/stats/member/" + memberId;

        ResponseEntity<List<Weight>> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<>() {}
        );

    }


}
