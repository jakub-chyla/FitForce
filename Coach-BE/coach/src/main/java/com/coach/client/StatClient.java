package com.coach.client;

import com.coach.stats.Weight;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "member-service", url = "${application.config.members-url}")
public interface StatClient {

    @GetMapping("/member/{member-id}")
    List<Weight> findAllStatsByMember(@PathVariable("member-id") Integer memberId);

    @DeleteMapping("/member/{member-id}")
    void deleteAllStatsByMember(@PathVariable("member-id") Integer memberId);
}
