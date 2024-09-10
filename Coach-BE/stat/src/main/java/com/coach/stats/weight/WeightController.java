package com.coach.stats.weight;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Weight Stat) {
        service.saveStat(Stat);
    }

    @GetMapping
    public ResponseEntity<List<Weight>> findAllStats() {
        return ResponseEntity.ok(service.findAllStats());
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity<List<Weight>> findAllStats(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(service.findAllStatsByMember(memberId));
    }

    @DeleteMapping("/member/{member-id}")
    public void deleteAllStatsByMember(@PathVariable("member-id") Integer memberId) {
        service.deleteById(memberId);
    }
}
