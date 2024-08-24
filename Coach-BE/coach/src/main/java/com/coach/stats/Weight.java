package com.coach.stats;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Weight {

    private Integer id;

    private String weight;

    private Long memberId;

}