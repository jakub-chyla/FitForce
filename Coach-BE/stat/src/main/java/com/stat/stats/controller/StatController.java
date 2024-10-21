package com.stat.stats.controller;

import com.stat.stats.dto.StatDto;
import com.stat.stats.training.service.TrainingService;
import com.stat.stats.weight.service.WeightService;
import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatController {

    private final WeightService weightService;
    private final TrainingService trainingService;

//    @GetMapping("/mess/{member-id}")
//    public ResponseEntity<String> getString(@PathVariable("member-id") Long memberId) {
//        String response = "hello from stats" + memberId;
//        return ResponseEntity.ok(response);
//    }

    //DOTO return value
    @PostMapping
    public WeightDto save(@RequestBody WeightDto weightDto) {
        Weight weight = new Weight();
        weight.setCreated(LocalDate.parse(weightDto.getCreated(), DateTimeFormatter.ISO_LOCAL_DATE));
        weight.setWeightValue(Double.valueOf(weightDto.getWeightValue()));
        weight.setMemberId(1L);
        weightService.saveStat(weight);
        return weightDto;
    }

    @GetMapping
    public ResponseEntity<List<Weight>> findAllStats() {
        return ResponseEntity.ok(weightService.findAllStats());
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity<StatDto> findAllStats(@PathVariable("member-id") Long memberId) {
        StatDto statDto = new StatDto();
        statDto.setWeights(weightService.findAllStatsByMember(memberId));
        statDto.setTrainings(trainingService.findAllTrainingsByMember(memberId));
        return ResponseEntity.ok(statDto);
    }

    @DeleteMapping("/member/{member-id}")
    public void deleteAllStatsByMember(@PathVariable("member-id") Long memberId) {
        weightService.deleteById(memberId);
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ping stats");
    }

}
