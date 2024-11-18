package com.stat.stats.controller;

import com.stat.stats.diet.dto.DietDto;
import com.stat.stats.diet.model.Diet;
import com.stat.stats.diet.service.DietService;
import com.stat.stats.dto.FullMemberResponse;
import com.stat.stats.training.model.Training;
import com.stat.stats.training.service.TrainingService;
import com.stat.stats.weight.service.WeightService;
import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatsController {

    private final DietService dietService;
    private final WeightService weightService;
    private final TrainingService trainingService;

//    @GetMapping("/mess/{member-id}")
//    public ResponseEntity<String> getString(@PathVariable("member-id") Long memberId) {
//        String response = "hello from stats" + memberId;
//        return ResponseEntity.ok(response);
//    }


    @GetMapping
    public ResponseEntity<List<Weight>> findAllStats() {
        return ResponseEntity.ok(weightService.findAllStats());
    }

    //to remove
    @GetMapping("/{member-id}")
    public ResponseEntity<FullMemberResponse> findAllMembers(@PathVariable("member-id") Long memberId) {
        FullMemberResponse response = new FullMemberResponse();
        response.setMemberId(memberId);

        List<WeightDto> weights = weightService.findRecentWeightsByMember(memberId);
        List<Training> trainings = trainingService.findAllTrainingsByMember(memberId);

        response.setWeights(weights);
        response.setTrainings(trainings);
        return ResponseEntity.ok(response);
    }

    @GetMapping("weights/{member-id}")
    public ResponseEntity<List<WeightDto>> findWeightsByMemberId(@PathVariable("member-id") Long memberId) {;
        return ResponseEntity.ok(weightService.findRecentWeightsByMember(memberId));
    }

    @GetMapping("trainings/{member-id}")
    public ResponseEntity<List<Training>> findTrainingsByMemberId(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(trainingService.findAllTrainingsByMember(memberId));
    }

    @GetMapping("diets/{member-id}")
    public ResponseEntity<DietDto> findDietsByMemberId(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(dietService.findAllByMemberId(memberId));
    }

    @PostMapping("/save-weight")
    public ResponseEntity<List<WeightDto>> saveWeight(@RequestBody WeightDto weightDto) {
        Weight weight = weightService.saveStat(weightDto);
        return ResponseEntity.ok(weightService.findRecentWeightsByMember(weight.getMemberId()));
    }

    @PostMapping("/save-training")
    public Training saveTraining(@RequestBody Training training) {
        return trainingService.saveTraining(training);
    }

    @PostMapping("/save-diet")
    public DietDto saveDiet(@RequestBody Diet diet) {
        return dietService.saveDiet(diet);
    }

    @DeleteMapping("/member/{member-id}")
    public void deleteAllStatsByMember(@PathVariable("member-id") Long memberId) {
        weightService.deleteById(memberId);
    }

    @DeleteMapping("weight/{weight-id}")
    public ResponseEntity<List<WeightDto>> deleteWeight(@PathVariable("weight-id") Weight weight) {
        weightService.deleteById(weight.getId());
        return ResponseEntity.ok(weightService.findRecentWeightsByMember(weight.getMemberId()));
    }

    @DeleteMapping("training/{training-id}")
    public Training deleteTraining(@PathVariable("training-id") Training training) {
        return trainingService.delete(training);
    }

    @DeleteMapping("diet/{diet-id}")
    public ResponseEntity<DietDto> deleteDiet(@PathVariable("diet-id") Diet diet) {
        dietService.deleteById(diet.getId());
        return ResponseEntity.ok(dietService.findAllByMemberId(diet.getMemberId()));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ping stats");
    }

}
