package com.discovery.restTempleteClient;

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

    @Value("${GATEWAY}")
    private String gatewayPath;

    private final RestTemplate regularRestTemplate;

    public String pingGateway() {
        String url = gatewayPath + "/api/v1/gateway/ping";

        ResponseEntity<String> responseEntity = regularRestTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        return responseEntity.getBody();
    }

}