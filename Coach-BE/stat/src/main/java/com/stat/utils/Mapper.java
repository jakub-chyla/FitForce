package com.stat.utils;


import com.stat.stats.training.dto.TrainingDto;
import com.stat.stats.training.model.Training;
import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import lombok.experimental.UtilityClass;

@UtilityClass
public class Mapper {

    public WeightDto mapWeight(Weight weight) {
        WeightDto weightDto = new WeightDto();
        weightDto.setId(weight.getId());
        weightDto.setCreated(weight.getCreated().toString());
        weightDto.setWeightValue(weight.getWeightValue());
        return weightDto;
    }

    public TrainingDto mapTraining(Training training) {
        TrainingDto trainingDto = new TrainingDto();
        trainingDto.setId(training.getId());
        trainingDto.setMemberId(training.getMemberId());
        trainingDto.setAppointment(training.getAppointment());
        return trainingDto;
    }
}
