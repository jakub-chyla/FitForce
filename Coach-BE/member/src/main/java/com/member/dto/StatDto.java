package com.member.dto;

import com.member.model.Training;
import com.member.stats.Weight;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StatDto {

    private List<Weight> weights;
    private List<Training> trainings;
}
