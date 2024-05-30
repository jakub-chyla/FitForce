package com.coach.client;

import com.coach.Stat;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "member-service", url = "${application.config.members-url}")
public interface StatClient {

    @GetMapping("/member/{member-id}")
    List<Stat> findAllStatsByMember(@PathVariable("member-id") Integer memberId);
}