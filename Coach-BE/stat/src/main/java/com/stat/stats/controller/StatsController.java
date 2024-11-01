package com.stat.stats.controller;

import com.stat.stats.dto.FullMemberResponse;
import com.stat.stats.training.model.Training;
import com.stat.stats.training.service.TrainingService;
import com.stat.stats.weight.service.WeightService;
import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import com.stat.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatsController {

    private final WeightService weightService;
    private final TrainingService trainingService;

//    @GetMapping("/mess/{member-id}")
//    public ResponseEntity<String> getString(@PathVariable("member-id") Long memberId) {
//        String response = "hello from stats" + memberId;
//        return ResponseEntity.ok(response);
//    }

    //DOTO return value
    @PostMapping("/save-weight")
    public WeightDto saveWeight(@RequestBody WeightDto weightDto) {
        Weight weight = new Weight();
        weight.setCreated(LocalDate.parse(weightDto.getCreated(), DateTimeFormatter.ISO_LOCAL_DATE));
        weight.setWeightValue(Double.valueOf(weightDto.getWeightValue()));
        weight.setMemberId(1L);
        weightService.saveStat(weight);
        return weightDto;
    }

    @PostMapping("/save-training")
    public Training saveTraining(@RequestBody Training training) {
        return trainingService.saveTraining(training);
    }

    @GetMapping
    public ResponseEntity<List<Weight>> findAllStats() {
        return ResponseEntity.ok(weightService.findAllStats());
    }

    //to remove
    @GetMapping("/{member-id}")
    public ResponseEntity<FullMemberResponse> findAllMembers(@PathVariable("member-id") Long memberId) {
        FullMemberResponse response = new FullMemberResponse();
        response.setMemberId(memberId);

        List<Weight> weights = weightService.findAllStatsByMember(memberId);
        List<Training> trainings = trainingService.findAllTrainingsByMember(memberId);

        response.setWeights(weights.stream().map(Mapper::mapWeightToDto).collect(Collectors.toList()));
        response.setTrainings(trainings);
        return ResponseEntity.ok(response);
    }

    @GetMapping("weights/{member-id}")
    public ResponseEntity<List<WeightDto>> findWeightByMemberId(@PathVariable("member-id") Long memberId) {
        List<Weight> weights = weightService.findAllStatsByMember(memberId);
        return ResponseEntity.ok(weights.stream().map(Mapper::mapWeightToDto).collect(Collectors.toList()));
    }

    @DeleteMapping("/member/{member-id}")
    public void deleteAllStatsByMember(@PathVariable("member-id") Long memberId) {
        weightService.deleteById(memberId);
    }

    @DeleteMapping("training/{training-id}")
    public Long deleteTraining(@PathVariable("training-id") Long trainingId) {
        return trainingService.deleteById(trainingId);
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ping stats");
    }

}
