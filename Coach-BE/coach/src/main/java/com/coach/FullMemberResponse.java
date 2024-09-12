package com.coach;

import com.coach.dto.WeightDto;
import com.coach.stats.Weight;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullMemberResponse {

    private String name;
    List<WeightDto> weights;
}