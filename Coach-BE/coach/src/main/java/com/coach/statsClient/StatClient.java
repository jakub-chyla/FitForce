package com.coach.statsClient;

import com.coach.dto.StatDto;
import com.coach.stats.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StatClient {

    @Value("${STATS}")
    private String statsPath;

    private final RestTemplate regularRestTemplate;


    public void deleteAllStatsByMember(Long memberId) {
        String url = statsPath + "/api/v1/stats/member/" + memberId;

        ResponseEntity<List<Weight>> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<>() {}
        );

    }


}
