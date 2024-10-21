package com.stat.stats.dto;

import com.stat.stats.training.model.Training;
import com.stat.stats.weight.model.Weight;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StatDto {

    private List<Weight> weights;
    private List<Training> trainings;
}
