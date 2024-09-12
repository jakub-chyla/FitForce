package com.coach;

import com.coach.dto.WeightDto;
import com.coach.stats.Weight;
import lombok.experimental.UtilityClass;

@UtilityClass
public class Mapper {

    public WeightDto map(Weight weight) {
        WeightDto weightDto = new WeightDto();
        weightDto.setId(weight.getId());
        weightDto.setCreated(weight.getCreated().toString());
        weightDto.setWeightValue(weight.getWeightValue());
        return weightDto;
    }
}
