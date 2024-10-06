package com.discovery.scheduler;

import com.discovery.restTempleteClient.RestTemplateClient;
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
        var response = restTemplateClient.pingGateway();
        log.info(response +" ", LocalDateTime.now());
    }
}
