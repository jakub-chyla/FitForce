package com.stat.stats.dto;

import com.stat.stats.training.model.Training;
import com.stat.stats.weight.dto.WeightDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullMemberResponse {

    private Long memberId;

    private List<WeightDto> weights;
    private List<Training> trainings;
}