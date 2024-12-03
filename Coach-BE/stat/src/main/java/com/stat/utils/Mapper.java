package com.stat.utils;

import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import lombok.experimental.UtilityClass;

@UtilityClass
public class Mapper {

    public WeightDto mapWeightToDto(Weight weight) {
        WeightDto weightDto = new WeightDto();
        weightDto.setId(weight.getId());
        weightDto.setCreated(weight.getCreated().toString());
        weightDto.setWeightValue(weight.getWeightValue());
        return weightDto;
    }

//    public TrainingDto mapTrainingToDto(Training training) {
//        TrainingDto trainingDto = new TrainingDto();
//        trainingDto.setId(training.getId());
//        trainingDto.setMemberId(training.getMemberId());
//        trainingDto.setAppointment(training.getAppointment());
//        return trainingDto;
//    }
//
//    public Training mapTrainingDtoToTraining(TrainingDto trainingDto) {
//        Training training = new Training();
//        training.setId(trainingDto.getId());
//        training.setTime(trainingDto.getTime());
//        training.setMemberId(trainingDto.getMemberId());
//        training.setAppointment(trainingDto.getAppointment());
//        training.setNote(trainingDto.getNote());
//        return training;
//    }
}
