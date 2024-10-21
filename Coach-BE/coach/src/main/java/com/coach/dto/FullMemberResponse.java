package com.coach.dto;

import com.coach.model.Training;
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
    private List<TrainingDto> trainings;
}