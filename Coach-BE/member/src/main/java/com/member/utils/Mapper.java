package com.member.utils;

import com.member.dto.TrainingDto;
import com.member.dto.WeightDto;
import com.member.model.Training;
import com.member.stats.Weight;
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
