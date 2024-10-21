package com.coach.utils;

import com.coach.dto.TrainingDto;
import com.coach.dto.WeightDto;
import com.coach.model.Training;
import com.coach.stats.Weight;
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
        trainingDto.setAppointment(training.getAppointment().toString());
        return trainingDto;
    }
}
