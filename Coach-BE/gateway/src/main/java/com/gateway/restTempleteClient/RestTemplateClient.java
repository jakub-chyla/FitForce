package com.gateway.restTempleteClient;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class RestTemplateClient {
    @Value("${MEMBER}")
    private String memberPath;

    @Value("${DISCOVERY}")
    private String discoveryPath;

    @Value("${SECURITY}")
    private String securityPath;

    private final RestTemplate regularRestTemplate;

    public String pingMember() {
        String url = memberPath + "/api/v1/members/ping";

        ResponseEntity<String> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        return responseEntity.getBody();
    }

    public String pingDiscovery() {
        String url = discoveryPath + "/api/v1/discovery/ping";

        ResponseEntity<String> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        return responseEntity.getBody();
    }

    public String pingSecurity() {
        String url = securityPath + "/api/v1/security/ping";

        ResponseEntity<String> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        return responseEntity.getBody();
    }

}
