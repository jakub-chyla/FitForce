package com.gateway.scheduler;

import com.gateway.restTempleteClient.RestTemplateClient;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class PingScheduler {

    private final RestTemplateClient restTemplateClient;

    private static final Logger log = LoggerFactory.getLogger(PingScheduler.class);


    @Scheduled(fixedRate = 30000)
    public void reportCurrentTime() {
        var responseMember = restTemplateClient.pingMember();
        log.info(responseMember +" ", LocalDateTime.now());

        var responseDiscovery = restTemplateClient.pingDiscovery();
        log.info(responseDiscovery +" ", LocalDateTime.now());

        var responseSecurity = restTemplateClient.pingSecurity();
        log.info(responseSecurity +" ", LocalDateTime.now());

    }
}
