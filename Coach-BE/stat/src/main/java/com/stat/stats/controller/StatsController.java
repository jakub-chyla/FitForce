package com.stat.stats.controller;

import com.stat.stats.diet.dto.DietDto;
import com.stat.stats.diet.model.Diet;
import com.stat.stats.diet.service.DietService;
import com.stat.stats.training.model.Training;
import com.stat.stats.training.service.TrainingService;
import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import com.stat.stats.weight.service.WeightService;
import com.stat.utils.ApiUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiUrl.API + ApiUrl.V1)
@RequiredArgsConstructor
public class StatsController {

    private final DietService dietService;
    private final WeightService weightService;
    private final TrainingService trainingService;

    @GetMapping(ApiUrl.Stat.WEIGHTS + "/{member-id}")
    public ResponseEntity<List<WeightDto>> findWeightsByMemberId(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(weightService.findRecentWeightsByMember(memberId));
    }

    @GetMapping(ApiUrl.Stat.TRAININGS + "/{member-id}")
    public ResponseEntity<List<Training>> findTrainingsByMemberId(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(trainingService.findAllTrainingsByMember(memberId));
    }

    @GetMapping(ApiUrl.Stat.DIETS + "/{member-id}")
    public ResponseEntity<DietDto> findDietsByMemberId(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(dietService.findAllByMemberId(memberId));
    }

    @PostMapping(ApiUrl.Stat.WEIGHTS)
    public ResponseEntity<List<WeightDto>> saveWeight(@RequestBody WeightDto weightDto) {
        Weight weight = weightService.saveStat(weightDto);
        return ResponseEntity.ok(weightService.findRecentWeightsByMember(weight.getMemberId()));
    }

    @PostMapping(ApiUrl.Stat.TRAININGS)
    public Training saveTraining(@RequestBody Training training) {
        return trainingService.saveTraining(training);
    }

    @PostMapping(ApiUrl.Stat.DIETS)
    public DietDto saveDiet(@RequestBody Diet diet) {
        return dietService.saveDiet(diet);
    }

    @DeleteMapping(ApiUrl.Stat.MEMBER + "/{member-id}")
    public void deleteAllStatsByMember(@PathVariable("member-id") Long memberId) {
        weightService.deleteById(memberId);
    }

    @DeleteMapping(ApiUrl.Stat.WEIGHTS + "/{weight-id}")
    public ResponseEntity<List<WeightDto>> deleteWeight(@PathVariable("weight-id") Weight weight) {
        weightService.deleteById(weight.getId());
        return ResponseEntity.ok(weightService.findRecentWeightsByMember(weight.getMemberId()));
    }

    @DeleteMapping(ApiUrl.Stat.TRAININGS + "/{training-id}")
    public Training deleteTraining(@PathVariable("training-id") Training training) {
        return trainingService.delete(training);
    }

    @DeleteMapping(ApiUrl.Stat.DIETS + "/{diet-id}")
    public ResponseEntity<DietDto> deleteDiet(@PathVariable("diet-id") Diet diet) {
        dietService.deleteById(diet.getId());
        return ResponseEntity.ok(dietService.findAllByMemberId(diet.getMemberId()));
    }

    @GetMapping(ApiUrl.Stat.PING)
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ping stats");
    }

}
