package com.coach;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatController {

    private final StatService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Stat Stat) {
        service.saveStat(Stat);
    }

    @GetMapping
    public ResponseEntity<List<Stat>> findAllStats() {
        return ResponseEntity.ok(service.findAllStats());
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity<List<Stat>> findAllStats(
            @PathVariable("member-id") Integer memberId
    ) {
        return ResponseEntity.ok(service.findAllStatsByMember(memberId));
    }
}
