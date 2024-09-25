package com.coach.stats.weight.controller;

import com.coach.stats.weight.service.WeightService;
import com.coach.stats.weight.dto.WeightDto;
import com.coach.stats.weight.model.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService service;

//    @GetMapping("/mess/{member-id}")
//    public ResponseEntity<String> getString(@PathVariable("member-id") Long memberId) {
//        String response = "hello from stats" + memberId;
//        return ResponseEntity.ok(response);
//    }

    //DOTO return value
    @PostMapping
    public void save(@RequestBody WeightDto weightDto) {
        System.out.println(weightDto);
        Weight weight = new Weight();
        weight.setCreated(LocalDate.parse(weightDto.getCreated(), DateTimeFormatter.ISO_LOCAL_DATE));
        weight.setWeightValue(Double.valueOf(weightDto.getWeightValue()));
        weight.setMemberId(1L);
        service.saveStat(weight);
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
