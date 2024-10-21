package com.coach.dto;

import com.coach.model.Training;
import com.coach.stats.Weight;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StatDto {

    private List<Weight> weights;
    private List<Training> trainings;
}
